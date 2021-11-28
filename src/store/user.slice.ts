import { createSlice } from '@reduxjs/toolkit'
import { message } from 'antd'
import { AppDispatch } from './index'
import { updateInfo, fetchUserInfo, fetchPDF } from './reducer/userReducer'

interface UserType {
  name: string
  stuId: string
  mobile: string
  sex: string
  company: string
  avatar: string
  birth: string
  work: string
  password: string
}

interface State {
  userInfo: UserType | undefined
  pdfStream: any
}

const initialState: State = {
  userInfo: undefined,
  pdfStream: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    removeUserInfo(state, action) {
      state.userInfo = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserInfo.fulfilled, (state, action: any) => {
      const res = action?.payload?.data
      if (res.code === 200) {
        state.userInfo = res?.data
      } else {
        message.warning(res.message || '服务器异常')
      }
    }),
      builder.addCase(updateInfo.fulfilled, (state, action: any) => {
        const res = action?.payload?.data
        if (res.code === 200) {
          message.success('更新成功')
        } else {
          message.warning(res.message || '服务器异常')
        }
      }),
      builder.addCase(fetchPDF.fulfilled,(state, action: any) => {
        const res = action?.payload?.data
        if (res) {
          state.pdfStream = res
          message.success('PDF获取成功')
        } else {
          message.warning(res.message || '服务器异常')
        }
      })
  },
})

const { removeUserInfo } = userSlice.actions

export const logOut = () => async (dispatch: AppDispatch) => dispatch(removeUserInfo(undefined))
