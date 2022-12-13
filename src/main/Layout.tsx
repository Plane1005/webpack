import React, { Suspense } from 'react'
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
  LogoutOutlined,
} from '@ant-design/icons'
import { Dropdown, MenuProps, Space } from 'antd'
import { Breadcrumb, Layout, Menu, theme } from 'antd'
import { routerConfig } from '../config/router'
import { Outlet, Route, Routes, useNavigate } from 'react-router-dom'
import menuData from '../config/menu'
import styled from './style.module.scss'

const { Header, Content, Sider } = Layout

const userMenu: MenuProps['items'] = [
  {
    label: 'Log out',
    key: '1',
    icon: <LogoutOutlined />,
  },
]

const ILayout = () => {
  console.log('Layout Render')

  const navigate = useNavigate()

  const menuClick = (item: { keyPath: string[] }) => {
    console.log(item)
    navigate(item.keyPath.reverse().join('/'))
  }

  return (
    <Layout className={styled.layout}>
      <Header className={styled.header}>
        <div className={styled.logo} />
        <Dropdown menu={{ items: userMenu }} trigger={['click']} placement="bottom">
          <Space>
            <UserOutlined />
            Jet
          </Space>
        </Dropdown>
      </Header>
      <Layout>
        <Sider width={200}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['']}
            style={{ height: '100%' }}
            items={menuData}
            onClick={menuClick}
          />
        </Sider>
        <Layout>
          <Content className={styled.content}>
            <Suspense fallback={<h1>loading......</h1>}>
              <Outlet />
            </Suspense>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  )
}

export default ILayout
