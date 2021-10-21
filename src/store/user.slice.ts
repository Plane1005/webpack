import { createSlice } from '@reduxjs/toolkit'
import { message } from 'antd'
import { handleMessage } from '@/utils'
import { userLogin, fetchUserInfo } from './reducer/userReducer'

interface UserType{
  name: string
}

interface State {
  userInfo: UserType | null
}

const initialState: State = {
  userInfo: null
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
    })
  },
})
