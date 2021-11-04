import { createSlice } from '@reduxjs/toolkit'
import { message } from 'antd'
import { handleMessage } from '@/utils'
import { addWork } from './reducer/systemReducer'

interface State {
  roleList: any[]
  roleListCount: number
  tempChartTemp: number[],
  tempChartHour: string[],
}

const initialState: State = {
  roleList: [],
  roleListCount: 0,
  tempChartTemp: [],
  tempChartHour: []
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
  },
})
