import React, { Suspense, useState } from 'react'
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
  LogoutOutlined,
} from '@ant-design/icons'
import { useSelector } from 'react-redux'
import { Dropdown, MenuProps, Space } from 'antd'
import { Breadcrumb, Layout, Menu, theme } from 'antd'
import { routerConfig } from '../config/router'
import { Outlet, Route, Routes, useNavigate } from 'react-router-dom'
import menuData from '../config/menu'
import styled from './style.module.scss'
import { RootState } from '@/store'

const { Header, Content, Sider } = Layout

const ILayout = () => {
  const [collapsed, setCollapsed] = useState(false)
  const navigate = useNavigate()
  const name = useSelector<RootState>((state) => state.global.name)
  const auth = useSelector<RootState>((state) => state.global.auth)
  

  const menuClick = (item: { keyPath: string[] }) => {
    navigate(item.keyPath.reverse().join('/'))
  }

  const userMenu: MenuProps['items'] = [
    {
      label: '退出登录',
      key: '1',
      icon: <LogoutOutlined />,
      onClick: () => {
        localStorage.removeItem('HZNU_TOKEN');
        localStorage.removeItem('persist:root');
        navigate('/login')
      },
    },
  ]

  return (
    <Layout className={styled.layout}>
      <Header className={styled.header}>
        <div className={styled.logo} />
        <Dropdown menu={{ items: userMenu }} trigger={['click']} placement="bottom">
          <Space>
            <>
              <UserOutlined />
              {name}
            </>
          </Space>
        </Dropdown>
      </Header>
      <Layout>
        <Sider
          width={200}
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={['']}
            style={{ height: '100%', boxShadow: '7px 0 5px -5px #ddd' }}
            items={menuData.filter((it) => it?.auth ? (auth as string[]).includes(it.auth) : true)}
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
