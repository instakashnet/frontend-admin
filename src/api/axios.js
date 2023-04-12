import axios from 'axios'
import { setAxiosInterceptor } from './interceptors'

const BASE_URL = import.meta.env.REACT_APP_STAGE === 'dev' ? 'https://api.instakash.net' : 'https://api.dev.instakash.net'

const instancesURL = {
  exchange: {
    v1: `${BASE_URL}/exchange-service/api/v1/admin`,
    v2: `${BASE_URL}/exchange-service/api/v2/admin`
  },
  auth: {
    v1: `${BASE_URL}/auth-service/api/v1/admin`
  },
  accounts: {
    v1: `${BASE_URL}/accounts-service/api/v1/admin`
  },
  base: {
    v1: BASE_URL
  }
}

export const getAxiosInstance = (instanceName, version) => {
  const instance = axios.create({
    baseURL: instancesURL[instanceName][version],
    withCredentials: true,
    timeout: 30000
  })

  setAxiosInterceptor(instance)

  return instance
}
