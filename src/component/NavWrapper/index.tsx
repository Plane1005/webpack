import React, { useCallback, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
// import logo from '@/assets/logo.png'
import { Avatar, Menu, Dropdown, Tooltip, message } from 'antd'
import type { MenuInfo } from 'rc-menu/lib/interface'
import {
  UserOutlined,
  MessageOutlined,
  LogoutOutlined,
  PlusCircleOutlined,
  ProfileOutlined,
} from '@ant-design/icons'
import { RootState, useAppDispatch } from '@/store'
import { logOut } from '@/store/user.slice'
import { useSelector } from 'react-redux'

const NavWrapper = (props: any) => {
  const { children } = props
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [menu, setMenu] = useState(undefined)
  const userInfo = useSelector((state: RootState) => state.user.userInfo)

  const onMenuClick = useCallback((event: MenuInfo) => {
    const { key } = event
    switch (key) {
      case 'logout':
        break
      case 'mymessage':
        navigate('/mymessage', { replace: true })
        break
      case 'center':
        navigate('./usercenter')
        break
    }
  }, [])

  const menuHeaderDropdown = userInfo ? (
    <Menu className="m-usermenu" selectedKeys={[]} onClick={onMenuClick} style={{ width: 110 }}>
      <Menu.Item key="center">
        <UserOutlined />
        个人中心
      </Menu.Item>
      <Menu.Item key="mymessage">
        <MessageOutlined />
        我的消息
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout">
        <LogoutOutlined />
        退出登录
      </Menu.Item>
    </Menu>
  ) : (
    <></>
  )

  const handleClick = (e: any) => {
    setMenu(e.key)
    navigate(e.key)
  }

  const backHome = () => {
    setMenu(undefined)
    navigate('')
  }

  return (
    <div className="g-nav">
      <div className="g-menu">
        <div className="m-logo" onClick={backHome}>
          <span className="u-title">师大内推</span>
        </div>
        <div className="m-menu">
          <Menu mode="horizontal" onClick={handleClick} style={{ width: 300 }} selectedKeys={menu}>
            <Menu.Item key="worklist" icon={<ProfileOutlined />}>
              内推列表
            </Menu.Item>
            <Menu.Item key="addwork" icon={<PlusCircleOutlined />}>
              添加内推
            </Menu.Item>
          </Menu>
        </div>
        <div className="m-user">
          {userInfo ? (
            <div className="u-name">{userInfo.name}</div>
          ) : (
            <div
              className="u-name"
              onClick={() => {
                navigate('/login')
              }}
            >
              登录/注册
            </div>
          )}
          <Dropdown overlay={menuHeaderDropdown} placement="bottomRight">
            <div className="u-avatar">
              <Avatar size={35} icon={<UserOutlined />} src={userInfo?.avatar} shape="square" />
            </div>
          </Dropdown>
        </div>
      </div>
      <div className="g-main">{children}</div>
    </div>
  )
}

export default NavWrapper
