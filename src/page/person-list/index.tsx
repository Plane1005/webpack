import React, { useState } from 'react'
import { Button, Col, DatePicker, Form, Input, Row, Select, Space, Table, Tag } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { LiveColorEnum, LiveEnum, GenderEnum } from '@/utils/enums'
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

const formItems = [
  {
    name: 'name',
    label: '姓名',
    component: <Input placeholder='请输入姓名'/>,
  },
  {
    name: 'gender',
    label: '性别',
    component: <Select options={enum2Option(GenderEnum)} placeholder='请选择性别'/>,
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
    name: 'time',
    label: '入住时间',
    component: <DatePicker placeholder='请选择入住时间'/>,
  },
  {
    name: 'liveType',
    label: '居住类别',
    component: <Select options={enum2Option(LiveEnum)} placeholder='请选择居住类别'/>,
  }
]

const columns: ColumnsType<DataType> = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '性别',
    dataIndex: 'gender',
    key: 'gender',
    render: (value: keyof typeof GenderEnum) => GenderEnum[value],
  },
  {
    title: '出生日期',
    dataIndex: 'birth',
    key: 'birth',
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
    title: '入住时间',
    dataIndex: 'time',
    key: 'time',
  },
  {
    title: '居住类别',
    key: 'liveType',
    dataIndex: 'liveType',
    render: (value: keyof typeof LiveEnum) => (
      <Tag color={LiveColorEnum[value]}>{LiveEnum[value]}</Tag>
    ),
  },
  {
    title: '操作',
    key: 'action',
    render: () => (
      <Space size="middle">
        <a>编辑</a>
        <a>复制</a>
        <a>查看轨迹</a>
        <a>迁出</a>
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

const PersonList = () => {
  const [drawerForm] = useForm()
  const [page, setPage] = useState(1);
  const [drawerInfo, setDrawerInfo] = useState<IDrawerInfo>({ visible: true });
  
  const onFilter = (values: any) => {
    
  }

  const onAddBtnClick = () => {
    setDrawerInfo({ visible: true })
  }

  return (
    <div>
      <AddDrawer form={drawerForm} data={drawerInfo} setData={setDrawerInfo} formItems={formItems} />
      <TableFilter onAddBtnClick={onAddBtnClick} onFilter={onFilter} formItems={formItems} columns={columns} dataSource={data} setPage={setPage}/>
    </div>
  )
}

export default PersonList
