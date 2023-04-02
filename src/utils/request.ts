import { message } from 'antd'
import axios, { AxiosRequestConfig, AxiosError } from 'axios'

export interface ResponseData<T> {
  code?: string
  data?: T
  message?: string
  pageNum?: number
  pageSize?: number
  success?: string | boolean
  totalCount?: number
}

const PUBLIC_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:3000/' : ''

axios.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    config.url = PUBLIC_URL + config.url
    config.headers = { 'Content-Type': 'application/json;charset=utf-8' }
    return config
  },
  (error: AxiosError) => Promise.reject(error)
)

axios.interceptors.response.use(
  (response: any) => {
    // 请求成功
    if (response.data.code === 200) {
      return Promise.resolve(response.data)
    }
    // 请求成功，状态不为成功时
    message.error(response.data.message)
    return Promise.reject(response.data)
  },
  (error) => {
    console.log('res error', error)
    return Promise.reject(error)
  }
)

// 统一发起请求的函数
export function request<T>(options: AxiosRequestConfig) {
  return axios.request<T>(options)
}
