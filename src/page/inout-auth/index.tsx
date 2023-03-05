import React, { useState } from 'react'
import { Button, Col, DatePicker, Form, Input, Row, Select, Space, Table, Tag } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { InOutEnum, LiveEnum, GenderEnum } from '@/utils/enums'
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
    label: '姓名',
    component: <Input placeholder='请输入姓名'/>,
  },
  {
    name: 'status',
    label: '限行状态',
    component: <Select options={enum2Option(InOutEnum)} placeholder='请选择限行状态'/>,
  },
  {
    name: 'address',
    label: '住址',
    component: <Input placeholder='请输入住址'/>,
  },
  {
    name: 'phone',
    label: '手机号',
    component: <Input placeholder='请输入手机号'/>,
  },
  {
    name: 'banTime',
    label: '限行时间段',
    component: <RangePicker showTime />,
  },
]

const columns: ColumnsType<DataType> = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '住址',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: '手机号',
    dataIndex: 'phone',
    key: 'phone',
  },
  {
    title: '限行状态',
    dataIndex: 'status',
    key: 'status',
  },
  {
    title: '限行时间段',
    dataIndex: 'banTime',
    key: 'banTime',
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
      <TableFilter title='限行权限管理' onAddBtnClick={onAddBtnClick} onFilter={onFilter} formItems={formItems} columns={columns} dataSource={data} setPage={setPage}/>
    </div>
  )
}

export default InOutAuth
