import { createAsyncThunk } from '@reduxjs/toolkit'
import { request, ResponseData } from '@/utils/request'

// 添加一份内推
export const addWork = createAsyncThunk(
  'system/addWork',
  async (params: any = {}) => {
    return request({
      url: `/api/work/addwork`,
      method: 'POST',
      params: params,
    }).then((res: ResponseData<any>) => {
      return res
    })
});

