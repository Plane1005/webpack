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

// 指定 axios 请求类型
// axios.defaults.headers = {
//   'Content-Type': 'application/json;charset=utf-8',
// }

axios.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // config.url = PUBLIC_URL + config.url
    // config.headers = { accessToken: chkToken() }
    return config
  },
  (error: AxiosError) => Promise.reject(error)
)

// axios.interceptors.response.use(
//   (response: any) => {
//     console.log(response);
//     console.log("res");
//     // 请求成功
//     if (response.code === '200') {
//       return Promise.resolve(response.data)
//     }
//     // 请求成功，状态不为成功时
//     message.error(response.data.message)
//     return Promise.reject(response.data)
//   },
//   (error) => {
//     console.log(error);
    
//     return Promise.reject(error)
//   }
// )

// 统一发起请求的函数
export function request<T>(options: AxiosRequestConfig) {
  return axios.request<T>(options)
}
