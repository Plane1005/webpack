import React, { useState } from 'react'
import { Button, Col, DatePicker, Form, Input, message, Row, Select, Space, Table, Tag } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { InOutEnum, LiveEnum, GenderEnum } from '@/utils/enums'
import { enum2Option } from '@/utils'
import styled from './style.module.scss'
import TableFilter from '@/component/TableHeader'
import { useForm } from 'antd/es/form/Form'
import { IDrawerInfo } from '@/types'
import AddDrawer from '@/component/AddDrawer'
import { addVisitor, deleteVisitor, getVisitorList, updateVisitor } from '@/service'
import { useRequest } from 'ahooks'
import 'dayjs/locale/zh-cn'
import locale from 'antd/es/date-picker/locale/zh_CN'
import dayjs from 'dayjs'

interface DataType {
  key: string
  name: string
  gender: number
  age: number
  address: string
  liveType: keyof typeof LiveEnum
}

const { RangePicker } = DatePicker

const format = (timeStr: string) => {
  var today = new Date() // 获取当前日期对象
  var timeArr = timeStr.split(':') // 将时间字符串按照冒号分割为数组
  return new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
    parseInt(timeArr[0]),
    parseInt(timeArr[1]),
    parseInt(timeArr[2])
  ) // 创建一个新的日期对象，指定年月日和指定的时间
}

const InOutAuth = () => {
  const [drawerForm] = useForm()
  const [data, setData] = useState([])
  const [drawerInfo, setDrawerInfo] = useState<IDrawerInfo>({ visible: false })

  const { loading, run } = useRequest<any, any>((params) => getVisitorList(params), {
    onSuccess(res) {
      setData(res)
    },
  })

  const onFilter = (values: any) => {
    run(values)
  }

  const onAddBtnClick = () => {
    setDrawerInfo({ visible: true })
  }

  const onAdd = async (values: any) => {
    if (await addVisitor(values)) {
      message.success('添加成功！')
      run()
    }
  }

  const onEdit = async (values: any) => {
    if (await updateVisitor(values)) {
      message.success('编辑成功！')
      run()
    }
  }

  const onCopy = async (values: any) => {
    if (await addVisitor(values)) {
      message.success('复制成功！')
      run()
    }
  }

  const formItems = [
    {
      name: 'name',
      label: '姓名',
      component: <Input placeholder="请输入姓名" allowClear />,
    },
    {
      name: 'status',
      label: '限行状态',
      component: (
        <Select options={enum2Option(InOutEnum)} placeholder="请选择限行状态" allowClear />
      ),
    },
    {
      name: 'address',
      label: '住址',
      component: <Input placeholder="请输入住址" allowClear />,
    },
    {
      name: 'mobile',
      label: '手机号',
      component: <Input placeholder="请输入手机号" allowClear />,
      notEditable: true,
    },
    {
      name: 'banTime',
      label: '限行时间段',
      hiddenFilter: true,
      notRequire: true,
      component: (
        <RangePicker
          picker="time"
          locale={locale}
          allowClear
          onChange={(values) => {
            console.log(values)
          }}
        />
      ),
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
      dataIndex: 'mobile',
      key: 'mobile',
    },
    {
      title: '限行状态',
      dataIndex: 'status',
      key: 'status',
      render: (value: keyof typeof InOutEnum) => InOutEnum[value],
    },
    {
      title: '限行时间段',
      dataIndex: 'banTime',
      key: 'banTime',
      render: (value) => (value ? value : '-'),
    },
    {
      title: '操作',
      key: 'action',
      render: (values) => (
        <Space size="middle">
          <a
            onClick={() => {
              setDrawerInfo({
                visible: true,
                isEdit: true,
                data: {
                  ...values,
                  banTime: [
                    dayjs(format(values.banTime.split('-')[0])),
                    dayjs(format(values.banTime.split('-')[1])),
                  ],
                },
              })
            }}
          >
            编辑
          </a>
          <a
            onClick={() => {
              setDrawerInfo({
                visible: true,
                isCopy: true,
                data: {
                  ...values,
                  name: values.name + '_Copy',
                  banTime: [
                    dayjs(format(values.banTime.split('-')[0])),
                    dayjs(format(values.banTime.split('-')[1])),
                  ],
                },
              })
            }}
          >
            复制
          </a>
          <a
            onClick={() => {
              deleteVisitor({ ...values }).then((res) => {
                if (res) {
                  message.success('删除成功')
                  run()
                }
              })
            }}
          >
            删除
          </a>
        </Space>
      ),
    },
  ]

  return (
    <div>
      <AddDrawer
        form={drawerForm}
        data={drawerInfo}
        setData={setDrawerInfo}
        formItems={formItems}
        onAdd={onAdd}
        onEdit={onEdit}
        onCopy={onCopy}
      />
      <TableFilter
        title="访客进出管理"
        loading={loading}
        onAddBtnClick={onAddBtnClick}
        onFilter={onFilter}
        formItems={formItems}
        columns={columns}
        dataSource={data}
      />
    </div>
  )
}

export default InOutAuth
