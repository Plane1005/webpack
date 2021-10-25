import { createSlice } from '@reduxjs/toolkit'
import { message } from 'antd'
import { handleMessage } from '@/utils'
import { updateInfo, fetchUserInfo } from './reducer/userReducer'

interface UserType{
  name: string,
  stuId: string,
  mobile: string,
  sex: string,
  company: string,
  avatar: string,
  birth: string,
  work: string,
  password: string
}

interface State {
  userInfo: UserType | undefined
}

const initialState: State = {
  userInfo: undefined
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUserInfo.fulfilled, (state, action: any) => {
      const res = action?.payload?.data
      if (res.code === 200) {
        state.userInfo = res.data
      } else {
        message.warning(res.message || '服务器异常')
      }
    }),
    builder.addCase(updateInfo.fulfilled, (state, action: any) => {
      const res = action?.payload?.data
      if (res.code === 200) {
        state.userInfo = res.data
      } else {
        message.warning(res.message || '服务器异常')
      }
    })
  },
})
