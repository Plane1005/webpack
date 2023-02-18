import React from 'react'
import { HomeOutlined, UserOutlined, NodeIndexOutlined, AuditOutlined, CalendarOutlined, ContactsOutlined } from '@ant-design/icons'
import { RoleEnum } from '@/utils/enums'

const menuData = [
  {
    key: '',
    label: '首页',
    icon: <HomeOutlined />,
  },
  {
    key: 'person',
    label: '常住人员管理',
    icon: <UserOutlined />,
  },
  {
    key: 'locus',
    label: '人员轨迹查询',
    icon: <NodeIndexOutlined />,
  },
  {
    key: 'access',
    label: '进出权限管理',
    icon: <AuditOutlined />,
  },
  {
    key: 'notice',
    label: '通知公告管理',
    icon: <CalendarOutlined />,
  },
  {
    key: 'account',
    label: '账号管理',
    icon: <ContactsOutlined />,
    roleCheck: (role: RoleEnum) => role === RoleEnum.ADMIN,
  },
]

export default menuData
