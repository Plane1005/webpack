import React, { useState } from 'react'
import { DatePicker, Input, message, Select, Space } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { ModuleEnum } from '@/utils/enums'
import { enum2Option } from '@/utils'
import TableFilter from '@/component/TableHeader'
import { useForm } from 'antd/es/form/Form'
import { IDrawerInfo } from '@/types'
import AddDrawer from '@/component/AddDrawer'
import { useRequest } from 'ahooks'
import { addAccount, deleteAccount, getAccountList, updateAccount } from '@/service'

interface DataType {
  key: string
  name: string
  gender: number
  age: number
  address: string
}

const { RangePicker } = DatePicker

const formItems = [
  {
    name: 'name',
    label: '名称',
    component: <Input placeholder="请输入名称" allowClear />,
  },
  {
    name: 'account',
    label: '账号',
    component: <Input placeholder="请输入账号" allowClear />,
    notEditable: true
  },
  {
    name: 'password',
    label: '密码',
    hiddenFilter: true,
    component: <Input.Password placeholder="请输入密码" allowClear />,
  },
  {
    name: 'auth',
    label: '模块权限',
    span: 12,
    filterCom: (
      <Select
        options={enum2Option(ModuleEnum)}
        placeholder="请选择模块权限"
        allowClear
      />
    ),
    component: (
      <Select
        options={enum2Option(ModuleEnum)}
        mode="multiple"
        placeholder="请选择模块权限"
        allowClear
      />
    ),
  },
]

const InOutAuth = () => {
  const [drawerForm] = useForm()
  const [data, setData] = useState([])
  const [drawerInfo, setDrawerInfo] = useState<IDrawerInfo>({ visible: false })

  const { loading, run } = useRequest<any, any>((params) => getAccountList(params), {
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
    if (await addAccount(values)) {
      message.success('添加成功！')
      run()
    }
  }

  const onEdit = async (values: any) => {
    if (await updateAccount(values)) {
      message.success('编辑成功！')
      run()
    }
  }

  const onCopy = async (values: any) => {
    if (await addAccount(values)) {
      message.success('复制成功！')
      run()
    }
  }

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
      render: (value) => value ? JSON.parse(value).map((it: keyof typeof ModuleEnum) => ModuleEnum[it]).join('，') : '-'
    },
    {
      title: '操作',
      key: 'action',
      render: (values) => (
        <Space size="middle">
            <a onClick={() => {
                setDrawerInfo({ visible: true, isEdit: true, data: { ...values, auth: JSON.parse(values.auth) } })
              }}>编辑</a>
              <a onClick={() => {
                setDrawerInfo({ visible: true, isCopy: true, data: { ...values, name: values.name + '_Copy', auth: JSON.parse(values.auth) } })
              }}>复制</a>
              <a onClick={() => {
                deleteAccount({ ...values}).then((res) => {
                  if (res) {
                    message.success('删除成功');
                    run()
                  }
                })
              }}>删除</a>
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
        title="账号管理"
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
