import React from 'react'
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
  LogoutOutlined,
} from '@ant-design/icons'
import { Dropdown, MenuProps, Space } from 'antd'
import { Breadcrumb, Layout, Menu, theme } from 'antd'
import { routerConfig } from '../config/router'
import { Route, Routes } from 'react-router-dom'
import NotFound from './NotFound'
import styled from './style.module.scss'
import Login from '@/page/Login'

const { Header, Content, Sider } = Layout

const userMenu: MenuProps['items'] = [
  {
    label: 'Log out',
    key: '1',
    icon: <LogoutOutlined />,
  },
]

const items2: MenuProps['items'] = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
  (icon, index) => {
    const key = String(index + 1)

    return {
      key: `sub${key}`,
      icon: React.createElement(icon),
      label: `subnav ${key}`,

      children: new Array(4).fill(null).map((_, j) => {
        const subKey = index * 4 + j + 1
        return {
          key: subKey,
          label: `option${subKey}`,
        }
      }),
    }
  }
)

const ILayout: React.FC = () => {
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
      <Layout className={styled.body}>
        <Sider width={200}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
            items={items2}
          />
        </Sider>
        <Layout>
          <Content
            style={{
              padding: '24px 36px',
              margin: 0,
              minHeight: 280,
            }}
          >
            <Routes>
              {routerConfig.map((it) => (
                <Route path={it.path} key={it.path} element={<it.component />} />
              ))}
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  )
}

export default ILayout
