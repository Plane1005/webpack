import { createSlice } from '@reduxjs/toolkit'
import { message } from 'antd'
import { handleMessage } from '@/utils'
import { userLogin } from './reducer/userReducer'

interface State {
  userInfo: any
}

const initialState: State = {
  userInfo: {}
}

export const systemSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(userLogin.fulfilled, (state, action: any) => {
      const res = action?.payload?.data
      if (res.code === 200) {
        state.userInfo = res.data
      } else {
        message.warning(res.message || '服务器异常')
      }
    })
  },
})
