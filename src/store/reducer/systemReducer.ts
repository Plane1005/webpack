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

  // 获取内推列表
export const fetchWorkList = createAsyncThunk(
  'system/fetchWorkList',
  async (params: any = {}) => {
    return request({
      url: `/api/work/worklist`,
      method: 'GET',
      params: params,
    }).then((res: ResponseData<any>) => {
      return res
    })
  });

    // 拉取内推详情
export const fetchWorkDetail = createAsyncThunk(
  'system/fetchWorkDetail',
  async (params: any = {}) => {
    return request({
      url: `/api/work/workdetail`,
      method: 'GET',
      params: params,
    }).then((res: ResponseData<any>) => {
      return res
    })
});

