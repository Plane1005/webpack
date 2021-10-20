import { createAsyncThunk } from '@reduxjs/toolkit'
import { request, ResponseData } from '@/utils/request'

// 登录接口
export const userLogin = createAsyncThunk(
  'user/login',
  async (params: any = {}) => {
    return request({
      url: `/api/user/login`,
      method: 'GET',
      params: params,
    }).then((res: ResponseData<any>) => {
      return res
    })
});

