import { createSlice } from '@reduxjs/toolkit'
import { message } from 'antd'
import { handleMessage } from '@/utils'
import { addWork, fetchWorkList, fetchWorkDetail } from './reducer/systemReducer'

interface State {
  workList: any[]
  workListCount: number
  workDetail: any
}

const initialState: State = {
  workList: [],
  workListCount: 0,
  workDetail: {}
}

export const systemSlice = createSlice({
  name: 'system',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addWork.fulfilled, (state, action: any) => {
      const res = action?.payload?.data
      if (res.code === 200) {
        message.success('添加成功')
      } else {
        message.warning(res.message || '服务器异常')
      }
    })
    builder.addCase(fetchWorkList.fulfilled, (state, action: any) => {
      const res = action?.payload?.data
      // console.log(res);
      if (res.code === 200) {
        message.success('获取成功')
        state.workList = res?.data?.data
        state.workListCount = res?.data?.dataCount
      } else {
        message.warning(res.message || '服务器异常')
      }
    })
    builder.addCase(fetchWorkDetail.fulfilled, (state, action: any) => {
      const res = action?.payload?.data
      if (res.code === 200) {
        message.success('获取成功')
        state.workDetail = res?.data?.data
      } else {
        message.warning(res.message || '服务器异常')
      }
    })
  },
})
