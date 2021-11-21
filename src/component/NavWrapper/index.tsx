import React, { useCallback, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import './style.less'
import logo from '@/assets/logo.png'
import { Avatar, Menu, Dropdown, Tooltip, message } from 'antd'
import type { MenuInfo } from 'rc-menu/lib/interface'
import {
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  PlusCircleOutlined,
  ProfileOutlined,
} from '@ant-design/icons'
import { RootState, useAppDispatch } from '@/store'
import { logOut } from '@/store/user.slice'
import { useSelector } from 'react-redux'

const NavWrapper: React.FC = (props: any) => {
  const { children } = props
  const history = useHistory()
  const dispatch = useAppDispatch()
  const [menu, setMenu] = useState(undefined)
  const userInfo = useSelector((state: RootState) => state.user.userInfo)

  const onMenuClick = useCallback((event: MenuInfo) => {
    const { key } = event
    switch (key) {
      case 'logout':
        dispatch(logOut()).then(() => {
          message.success('退出成功')
          localStorage.removeItem('isAdmin')
          localStorage.removeItem('token')
          localStorage.removeItem('userInfo')
          history.replace('/')
          document.title = '师大内推'
        })
        break
      case 'center':
        history.push('./usercenter')
        break
    }
  }, [])

  const menuHeaderDropdown = userInfo ? (
    <Menu className="m-usermenu" selectedKeys={[]} onClick={onMenuClick} style={{ width: 110 }}>
      <Menu.Item key="center">
        <UserOutlined />
        个人中心
      </Menu.Item>
      <Menu.Item key="settings">
        <SettingOutlined />
        个人设置
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
    history.push(e.key)
  }

  const backHome = () => {
    setMenu(undefined)
    history.push('')
  }

  return (
    <div className="g-nav">
      <div className="g-menu">
        <div className="m-logo" onClick={backHome}>
          <img src={logo} alt="" className="u-logo" />
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
                history.push('/login')
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
