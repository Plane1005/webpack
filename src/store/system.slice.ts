import { createSlice } from '@reduxjs/toolkit'
import { message } from 'antd'
import { handleMessage } from "@/utils";
import { fetchRoleList } from './reducer/systemReducer';

interface State {
  roleList: any[]
  roleListCount: number
}

const initialState: State = {
  roleList: [],
  roleListCount: 0,
};

export const systemSlice = createSlice({
  name: 'system',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchRoleList.fulfilled, (state, action: any) => {
      const res = action.payload;
      if (res.code === '0') {
        state.roleList = res.data;
        state.roleListCount = res.totalCount;
      } else {
        message.warning(res.message || '服务器异常')
      }
    });
  },
});
