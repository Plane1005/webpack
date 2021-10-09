import axios, { AxiosRequestConfig, AxiosError, AxiosResponse } from 'axios'
import { PUBLIC_URL } from '../../config/proxy.js'
import { message } from 'antd'

export interface ResponseData<T> {
  code?: string
  data: T
  message?: string
  pageNum?: number
  pageSize?: number
  success?: string | boolean
  totalCount?: number
}

// 指定 axios 请求类型
axios.defaults.headers = {
  'Content-Type': 'application/json;charset=utf-8',
}

axios.interceptors.request.use((config: AxiosRequestConfig) => {
  config.url = PUBLIC_URL + config.url
},(error: AxiosError)=>Promise.reject(error))

// 统一发起请求的函数
export function request<T>(options: AxiosRequestConfig) {
  return axios.request<T>(options)
}
