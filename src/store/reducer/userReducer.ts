import { createAsyncThunk } from '@reduxjs/toolkit'
import { request, ResponseData } from '@/utils/request'

// 登录接口
export const userLogin = createAsyncThunk('user/login', async (params: any = {}) => {
  return request({
    url: `/api/user/login`,
    method: 'POST',
    params: params,
  }).then((res: ResponseData<any>) => {
    return res
  })
})

// 获取用户信息
export const fetchUserInfo = createAsyncThunk('user/userinfo', async () => {
  return request({
    url: `/api/user/userinfo`,
    method: 'GET',
  }).then((res: ResponseData<any>) => {
    return res
  })
})

// 更新个人信息
export const updateInfo = createAsyncThunk('user/updateinfo', async (params: any = {}) => {
  return request({
    url: `/api/user/updateinfo`,
    method: 'POST',
    params: params,
  }).then((res: ResponseData<any>) => {
    return res
  })
})