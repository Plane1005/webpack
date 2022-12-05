import { createSlice, isRejected } from '@reduxjs/toolkit'

interface State {
  workList: any[]
  workListCount: number
  workDetail: any
}

const initialState: State = {
  workList: [],
  workListCount: 0,
  workDetail: {},
}

export const globalSlice = createSlice({
  name: 'system',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // 写法有所改变
    builder
      .addMatcher(isRejected, (state, action) => {
        console.log('reject', state, action)
      })
      .addDefaultCase((state, action) => {
        console.log('defalutcase', state, action)
      })
  },
})
