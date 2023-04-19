import { createSlice, isRejected } from '@reduxjs/toolkit'
import { fetchDingInfo, userLogin } from './reducer/userReducer'

const initialState = {
  token: '',
  name: '',
  account: '',
  auth: [],
}

export const globalSlice = createSlice({
  name: 'system',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // 写法有所改变
    builder.addCase(userLogin.fulfilled, (state, action: any) => {
      const res = action?.payload?.data
      state.name = res.name
      state.auth = JSON.parse(res.auth)
      state.token = res.token
      state.account = res.account
      localStorage.setItem('HZNU_TOKEN', res?.token)
    }),
    builder.addCase(fetchDingInfo.fulfilled, (state, action: any) => {
        const res = action?.payload?.data
        console.log('钉钉登录成功', res)
        state.name = res.name
        state.auth = JSON.parse(res.auth)
        state.token = res.token
        state.account = res.account
        localStorage.setItem('HZNU_TOKEN', res?.token)
      })
  },
})
