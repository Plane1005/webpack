import { createSlice } from '@reduxjs/toolkit'
import { message } from 'antd'
import { handleMessage } from "@/utils";

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
    builder.addCase(AddRole.fulfilled, (state, action: any) => {
      handleMessage(action.payload, '添加成功')
    });
    builder.addCase(EditRole.fulfilled, (state, action: any) => {
      handleMessage(action.payload, '修改成功')
    });
    builder.addCase(DeleteRole.fulfilled, (state, action: any) => {
      handleMessage(action.payload, '删除成功')
    });
  },
});
