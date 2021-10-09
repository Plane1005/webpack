import { createAsyncThunk } from '@reduxjs/toolkit'
import { request, ResponseData } from '@/utils/request'

export const fetchRoleList = createAsyncThunk(
  'system/fetchRoleList',
  async (params: any = {}) => {
    return request({
      url: `/api/v1`,
      method: 'GET',
      params: params,
    }).then((res: ResponseData<any>) => {
      return res
    })
});
