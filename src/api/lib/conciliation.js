import axios from 'axios'
import { getAxiosInstance } from '../axios'

export const uploadBankConciliationSvc = async (formData) => {
  try {
    const response = await axios.post('https://openplata.instakash.net/api/v1/banco/procesos/archivo-cargar', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: (progressEvent) => console.log(progressEvent)
    })

    if (response.status >= 400) throw new Error(response.errors[0])
  } catch (error) {
    throw error
  }
}

export const downloadBankConciliationSvc = async (formattedDate) => {
  try {
    const response = await axios.get(
      `https://openplata.instakash.net/api/v1/banco/procesos/conciliacion-xlsx-descargar?CuentaId=0&Fecha=${formattedDate}`,
      {
        onDownloadProgress: ({ loaded, total }) => {
          console.log(loaded, total)
        }
      }
    )

    if (response.status >= 400) throw new Error(response.errors[0])

    return response.data.data
  } catch (error) {
    throw error
  }
}

export const conciliateBanksSvc = async (values) => {
  const response = await getAxiosInstance('auth', 'v1').post('/users/conciliacion', values, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
  if (response.status >= 400) throw new Error(response.errors[0])

  return response.data
}
