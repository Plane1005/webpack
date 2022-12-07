import React from 'react'
import { HomeOutlined, UserOutlined } from '@ant-design/icons'
import { RoleEnum } from '@/utils/enums'

const menuData = [
  {
    key: 'home',
    path: '/home',
    title: 'Home',
    icon: <HomeOutlined />,
  },
  {
    key: 'test',
    path: '/test',
    title: 'Test',
    icon: <UserOutlined />,
    children: [
      {
        key: 'test1',
        path: '/test1',
        title: 'test1',
        icon: <HomeOutlined />,
        roleCheck: (role: RoleEnum) => role === RoleEnum.ADMIN,
      },
    ],
  },
]

export default menuData
