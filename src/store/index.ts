import { configureStore, ThunkAction, Action, combineReducers, Reducer } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux' 

// 项目中使用到的reducer
export const rootReducer = combineReducers({
  system: systemSlice.reducer
})

export const store = configureStore({
  reducer: rootReducer,
})

export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
