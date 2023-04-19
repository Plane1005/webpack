import { createAsyncThunk } from '@reduxjs/toolkit'
import { request, ResponseData } from '@/utils/request'

// 登录接口
export const userLogin = createAsyncThunk('user/login', async (params: any = {}) => {
  return request({
    url: `user/login`,
    method: 'POST',
    data: params,
  }).then((res: ResponseData<any>) => {
    return res
  })
})

// 获取钉钉用户信息
export const fetchDingInfo = createAsyncThunk('user/dinginfo', async (params: any = {}) => {
  return request({
    url: `user/dinginfo`,
    method: 'POST',
    data: params,
  }).then((res: ResponseData<any>) => {
    return res
  })
})
