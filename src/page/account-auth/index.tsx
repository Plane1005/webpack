import React, { useState } from 'react'
import { Button, Col, DatePicker, Form, Input, Row, Select, Space, Table, Tag } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { InOutEnum, LiveEnum, GenderEnum, ModuleEnum } from '@/utils/enums'
import { enum2Option } from '@/utils'
import styled from './style.module.scss'
import TableFilter from '@/component/TableHeader'
import { useForm } from 'antd/es/form/Form'
import { IDrawerInfo } from '@/types'
import AddDrawer from '@/component/AddDrawer'

interface DataType {
  key: string
  name: string
  gender: number
  age: number
  address: string
  liveType: keyof typeof LiveEnum
}

const { RangePicker } = DatePicker;

const formItems = [
  {
    name: 'name',
    label: '名称',
    component: <Input placeholder='请输入名称'/>,
  },
  {
    name: 'account',
    label: '账号',
    component: <Input placeholder='请输入账号'/>,
  },
  {
    name: 'auth',
    label: '模块权限',
    span: 12,
    component: <Select options={enum2Option(ModuleEnum)} mode='multiple' placeholder='请选择限行状态'/>,
  },
]

const columns: ColumnsType<DataType> = [
  {
    title: '名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '账号',
    dataIndex: 'account',
    key: 'account',
  },
  {
    title: '模块权限',
    dataIndex: 'auth',
    key: 'auth',
  },
  {
    title: '操作',
    key: 'action',
    render: () => (
      <Space size="middle">
        <a>编辑</a>
        <a>复制</a>
        <a>删除</a>
      </Space>
    ),
  },
]

const data: DataType[] = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    gender: 1,
    address: 'New York No. 1 Lake Park',
    liveType: 'Asymptomatic',
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    gender: 0,
    address: 'London No. 1 Lake Park',
    liveType: 'Close',
  },
  {
    key: '3',
    name: 'Joe Black',
    gender: 1,
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    liveType: 'Confirmed',
  },
]

const InOutAuth = () => {
  const [drawerForm] = useForm()
  const [page, setPage] = useState(1);
  const [drawerInfo, setDrawerInfo] = useState<IDrawerInfo>({ visible: false });
  
  const onFilter = (values: any) => {
    
  }

  const onAddBtnClick = () => {
    setDrawerInfo({ visible: true })
  }

  return (
    <div>
      <AddDrawer form={drawerForm} data={drawerInfo} setData={setDrawerInfo} formItems={formItems} />
      <TableFilter title='账号管理' onAddBtnClick={onAddBtnClick} onFilter={onFilter} formItems={formItems} columns={columns} dataSource={data} setPage={setPage}/>
    </div>
  )
}

export default InOutAuth
