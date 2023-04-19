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
    auth: 'Person',
    label: '常住人员管理',
    icon: <UserOutlined />,
  },
  {
    key: 'locus',
    auth: 'Locus',
    label: '人员轨迹查询',
    icon: <NodeIndexOutlined />,
  },
  {
    key: 'inout',
    auth: 'Inout',
    label: '访客进出管理',
    icon: <AuditOutlined />,
  },
  {
    key: 'notification',
    auth: 'Notification',
    label: '通知公告管理',
    icon: <CalendarOutlined />,
  },
  {
    key: 'account',
    auth: 'Account',
    label: '账号管理',
    icon: <ContactsOutlined />
  },
]

export default menuData
