import React, { useState } from 'react'
import { Button, Col, DatePicker, Form, Input, message, Row, Select, Space, Table, Tag } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { LiveColorEnum, LiveEnum, GenderEnum } from '@/utils/enums'
import { enum2Option, formatDate } from '@/utils'
import styled from './style.module.scss'
import TableFilter from '@/component/TableHeader'
import { useForm } from 'antd/es/form/Form'
import { IDrawerInfo } from '@/types'
import AddDrawer from '@/component/AddDrawer'
import { useRequest } from 'ahooks'
import { addPerson, getPersonList, updatePerson } from '@/service'
import dayjs from 'dayjs'

interface DataType {
  key: string
  name: string
  gender: number
  age: number
  address: string
  liveType: keyof typeof LiveEnum
}

const PersonList = () => {
  const [drawerForm] = useForm()
  const [data, setData] = useState([]);
  const [drawerInfo, setDrawerInfo] = useState<IDrawerInfo>({ visible: false });

  const { loading, run } = useRequest<any, any>((params) => getPersonList(params), {
    onSuccess(res) {
      setData(res)
    }
  });

  const formItems = [
    {
      name: 'name',
      label: '姓名',
      component: <Input placeholder='请输入姓名'/>,
    },
    {
      name: 'gender',
      label: '性别',
      hiddenFilter: true,
      component: <Select options={enum2Option(GenderEnum)} placeholder='请选择性别'/>,
    },
    {
      name: 'birth',
      label: '出生日期',
      hiddenFilter: true,
      component: <DatePicker format="YYYY-MM-DD" placeholder='请选择出生日期'/>,
    },
    {
      name: 'address',
      label: '住址',
      component: <Input placeholder='请输入住址'/>,
    },
    {
      name: 'mobile',
      label: '手机号',
      component: <Input disabled={drawerInfo.isEdit} placeholder='请输入手机号'/>,
      notEditable: true
    },
    {
      name: 'time',
      label: '入住时间',
      component: <DatePicker format="YYYY-MM-DD" placeholder='请选择入住时间'/>,
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
      render: (value: string) => formatDate(value),
    },
    {
      title: '住址',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '手机号',
      dataIndex: 'mobile',
      key: 'mobile'
    },
    {
      title: '入住时间',
      dataIndex: 'time',
      key: 'time',
      render: (value: string) => formatDate(value),
    },
    {
      title: '居住类别',
      key: 'liveType',
      dataIndex: 'liveType',
      render: (value: keyof typeof LiveEnum) => (
        <Tag color={LiveColorEnum[value]}>{LiveEnum[value] || '迁出'}</Tag>
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: (values) => (
        <Space size="middle">
          <a onClick={() => {
            setDrawerInfo({ visible: true, isEdit: true, data: { ...values, time: dayjs(values.time), birth: dayjs(values.birth) } })
          }}>编辑</a>
          <a onClick={() => {
            setDrawerInfo({ visible: true, isCopy: true, data: { ...values, time: dayjs(values.time), birth: dayjs(values.birth), name: values.name + '_Copy' } })
          }}>复制</a>
          <a>查看轨迹</a>
          <a onClick={() => {
            updatePerson({ ...values, liveType: 'Leave' }).then((res) => {
              if (res) {
                message.success('迁出成功');
                run()
              }
            })
          }}>迁出</a>
        </Space>
      ),
    },
  ]
  
  const onFilter = (values: any) => {
    run(values)
  }

  const onAddBtnClick = () => {
    setDrawerInfo({ visible: true })
  }

  const onAdd = async (values: any) => {
    if (await addPerson(values)) {
      message.success('添加成功！'); 
      run();
    }
  }

  const onEdit = async (values: any) => {
    if (await updatePerson(values)) {
      message.success('编辑成功！'); 
      run();
    }
  }

  const onCopy = async (values: any) => {
    if (await addPerson(values)) {
      message.success('复制成功！'); 
      run();
    }
  }
 
  return (
    <div>
      <AddDrawer form={drawerForm} data={drawerInfo} setData={setDrawerInfo} formItems={formItems} onAdd={onAdd} onEdit={onEdit} onCopy={onCopy} />
      <TableFilter loading={loading} title='常住人员管理' onAddBtnClick={onAddBtnClick} onFilter={onFilter} formItems={formItems} columns={columns} dataSource={data} />
    </div>
  )
}

export default PersonList
