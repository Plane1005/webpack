import { createAsyncThunk } from '@reduxjs/toolkit'
import { switchBase64 } from '@/utils/index'
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

// 钉钉扫码登录接口
export const dingLogin = createAsyncThunk('user/ding', async (params: any = {}) => {
  return request({
    url: `/api/user/ding`,
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

// 获取钉钉用户信息
export const fetchDingInfo = createAsyncThunk('user/dinginfo', async (params: any = {}) => {
  return request({
    url: `/api/user/dinginfo`,
    method: 'POST',
    params: params
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

// 更新个人简历
export const fetchPDF = createAsyncThunk('user/fetchPDF', async () => {
  return request({
    url: `/api/user/pdf`,
    method: 'GET',
    responseType: 'blob',
  }).then(async (res: ResponseData<any>) => {
      res.data = await switchBase64(res.data)
      return res
  })
})
