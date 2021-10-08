import { createAsyncThunk } from '@reduxjs/toolkit'
import { request, ResponseData } from '@/utils/request'

//获取角色列表--分页
export const fetchRoleList = createAsyncThunk(
  'system/fetchRoleList',
  async (params: any = {}) => {
    return request({
      url: `/api/v1/base/role/page`,
      method: 'GET',
      params: params,
    }).then((res: ResponseData<any>) => {
      return res
    })
});

//账户管理 - 账户删除
export const DeleteRole = createAsyncThunk(
  'system/DeleteRole',
  async (params: any = {}) => {
    return request({
      url: `/api/v1/base/role/remove`,
      method: 'DELETE',
      params: params,
    }).then((res: ResponseData<any>) => {
      return res
    })
  });

//账户管理 - 添加企业账户
export const AddRole = createAsyncThunk(
  'system/AddRole',
  async (params: any = {}) => {
    return request({
      url: `/api/v1/base/role/add`,
      method: 'POST',
      params: params,
    }).then((res: ResponseData<any>) => {
      return res
    })
  });
//账户管理 - 编辑企业账户
export const EditRole = createAsyncThunk(
  'system/EditRole',
  async (params: any = {}) => {
    return request({
      url: `/api/v1/base/role/update`,
      method: 'POST',
      params: params,
    }).then((res: ResponseData<any>) => {
      return res
    })
  });
