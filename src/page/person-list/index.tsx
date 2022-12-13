import React from 'react'
import { Space, Table, Tag } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { EpidemicColorEnum, EpidemicEnum, GenderEnum } from '@/utils/enums'

interface DataType {
  key: string
  name: string
  gender: number
  age: number
  address: string
  epidemicType: keyof typeof EpidemicEnum
}

const columns: ColumnsType<DataType> = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '性别',
    dataIndex: 'gender',
    key: 'gender',
    render: (value: 0 | 1) => GenderEnum[value],
  },
  {
    title: '住址',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: '染疫类别',
    key: 'epidemicType',
    dataIndex: 'epidemicType',
    render: (value: keyof typeof EpidemicEnum) => (
      <Tag color={EpidemicColorEnum[value]}>{EpidemicEnum[value]}</Tag>
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
    epidemicType: 'Asymptomatic',
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    gender: 0,
    address: 'London No. 1 Lake Park',
    epidemicType: 'Close',
  },
  {
    key: '3',
    name: 'Joe Black',
    gender: 1,
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    epidemicType: 'Confirmed',
  },
]

const PersonList = () => {
  return (
    <div>
      <Table columns={columns} dataSource={data} />
    </div>
  )
}

export default PersonList
