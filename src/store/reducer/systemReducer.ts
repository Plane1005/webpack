import { createAsyncThunk } from '@reduxjs/toolkit'
import { request, ResponseData } from '@/utils/request'

// 获取首页的温度列表
export const fetchRoleList = createAsyncThunk(
  'system/fetchRoleList',
  async (params: any = {}) => {
    return request({
      url: `/api/air`,
      method: 'GET',
      params: params,
    }).then((res: ResponseData<any>) => {
      return res
    })
});

// 获取温度统计图表数据
export const fetchTempChart = createAsyncThunk(
  'system/fetchTempChart',
  async (params: any = {}) => {
    return request({
      url: `/api/air/tempchart`,
      method: 'GET',
      params: params,
    }).then((res: ResponseData<any>) => {
      return res
    })
    
});
