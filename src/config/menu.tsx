import React from 'react'
import { HomeOutlined, UserOutlined } from '@ant-design/icons'
import { RoleEnum } from '@/utils/enums'

const menuData = [
  {
    key: '',
    label: '首页',
    icon: <HomeOutlined />,
  },
  {
    key: 'person',
    label: '染疫人员管理',
    icon: <UserOutlined />,
    children: [
      {
        key: 'list',
        label: '登记人员列表',
        icon: <HomeOutlined />,
        roleCheck: (role: RoleEnum) => role === RoleEnum.ADMIN,
      },
    ],
  },
  {
    key: '123123',
    label: '404',
    icon: <HomeOutlined />,
  },
]

export default menuData
