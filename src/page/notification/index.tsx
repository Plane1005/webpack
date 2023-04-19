import React, { useState } from 'react'
import { Button, Col, DatePicker, Form, Input, Row, Select, Space, Table, Tag, Tooltip } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { InOutEnum, LiveEnum, GenderEnum } from '@/utils/enums'
import { enum2Option } from '@/utils'
import styled from './style.module.scss'
import TableFilter from '@/component/TableHeader'
import { useForm } from 'antd/es/form/Form'
import { IDrawerInfo } from '@/types'
import AddDrawer from '@/component/AddDrawer'
import { useNavigate } from 'react-router-dom'
import { useRequest } from 'ahooks'
import { getNoticeList } from '@/service'

interface DataType {
  key: string
  name: string
  gender: number
  age: number
  address: string
  liveType: keyof typeof LiveEnum
}

const Notification = () => {
  const navigate = useNavigate()
  const [data, setData] = useState([]);

  const { loading, run } = useRequest<any, any>(getNoticeList, {
    onSuccess(res) {
      setData(res)
    }
  });

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
      render: (value) => value.slice(0,50) + '...'
    },
    {
      title: '操作',
      key: 'action',
      render: (values) => (
        <Space size="middle">
          <a onClick={() => {
            navigate(`/mark?id=${values?.id || ''}`, { replace: true })
          }}>编辑</a>
        </Space>
      ),
    },
  ]

  return (
    <div>
      <TableFilter needExtraBtn={false} title='通知公告管理' columns={columns} dataSource={data} onAddBtnClick={() => {
        navigate('/mark', { replace: true })
      }}/>
    </div>
  )
}

export default Notification
