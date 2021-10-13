import { createSlice } from '@reduxjs/toolkit'
import { message } from 'antd'
import { handleMessage } from '@/utils'
import { fetchRoleList, fetchTempChart } from './reducer/systemReducer'

interface State {
  roleList: any[]
  roleListCount: number
  tempChart: any[]
}

const initialState: State = {
  roleList: [],
  roleListCount: 0,
  tempChart: [],
}

export const systemSlice = createSlice({
  name: 'system',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchRoleList.fulfilled, (state, action: any) => {
      const res = action?.payload?.data
      if (res.code === 200) {
        state.roleList = res.data
        state.roleListCount = res.totalCount
      } else {
        message.warning(res.message || '服务器异常')
      }
    })
    builder.addCase(fetchTempChart.fulfilled, (state, action: any) => {
      const res = action?.payload?.data
      if (res.code === 200) {
        state.roleList = res.data
        state.roleListCount = res.totalCount
      } else {
        message.warning(res.message || '服务器异常')
      }
    })
  },
})
