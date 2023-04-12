import { useState, useRef, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setAlert } from '../store/actions'

const WS_URL = import.meta.env.REACT_APP_STAGE === 'dev' ? 'wss://ws.instakash.net' : 'wss://ws.dev.instakash.net'

export function useWebsocket(token) {
  const [isSocketLoading, setIsSocketLoading] = useState(true)
  const [socketData, setSocketData] = useState(null)
  const websocket = useRef(null)
  const dispatch = useDispatch()

  useEffect(() => {
    websocket.current = new WebSocket(`${WS_URL}/ws?token=${token}&service=orders`)

    websocket.current.onopen = () => {
      setIsSocketLoading(true)
      console.log('WebSocket connection established.')
    }

    websocket.current.onclose = () => {
      console.log('connection closed.')
      setIsSocketLoading(false)
    }

    websocket.current.onerror = (event) => {
      dispatch(setAlert('error', 'Ha ocurrido un error inesperado obteniendo la lista de ordenes. Intenta de nuevo o contacta a soporte.'))
      console.log('connection error received: ', event)
      setIsSocketLoading(false)
    }

    websocket.current.onmessage = async ({ data }) => {
      const parsedData = JSON.parse(data)
      setSocketData(parsedData.data)

      setIsSocketLoading(false)
    }

    return () => websocket.current?.close()
  }, [token])

  return { websocket, data: socketData, isLoading: isSocketLoading }
}
