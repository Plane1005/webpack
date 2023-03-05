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

const columns: ColumnsType<DataType> = [
  {
    title: '标题',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: '正文',
    dataIndex: 'content',
    key: 'content',
  },
  {
    title: '操作',
    key: 'action',
    render: () => (
      <Space size="middle">
        <a>查看</a>
        <a>复制</a>
        <a>禁用</a>
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

const Notification = () => {
  const [page, setPage] = useState(1);
  
  const onFilter = (values: any) => {
    
  }

  return (
    <div>
      <TableFilter needExtraBtn={false} title='通知公告管理' columns={columns} dataSource={data} setPage={setPage}/>
    </div>
  )
}

export default Notification
