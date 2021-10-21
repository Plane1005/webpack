import React, { useCallback, useState } from 'react'
import { useHistory } from "react-router-dom";
import './style.less'
import logo from '@/assets/logo.png'
import listIcon from '@/assets/icon/nav_list.svg'
import addIcon from '@/assets/icon/nav_add.svg'
import { Avatar, Menu, Dropdown, Tooltip } from 'antd'
import type { MenuInfo } from 'rc-menu/lib/interface'
import { UserOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons'
import { RootState } from '@/store';
import { useSelector } from 'react-redux';

const NavWrapper: React.FC = (props: any) => {
  const { children } = props
  const history = useHistory()
  const [initialState, setInitialState] = useState({})
  const userInfo = useSelector((state: RootState) => state.user.userInfo)

  console.log("userinfo",userInfo);
  

  const loginOut = async () => {
    // await outLogin();
    // const { query = {}, pathname } = history.location;
    // const { redirect } = query;
    // // Note: There may be security issues, please note
    // if (window.location.pathname !== '/user/login' && !redirect) {
    //   history.replace({
    //     pathname: '/user/login',
    //     search: stringify({
    //       redirect: pathname,
    //     }),
    //   });
    // }
  }

  const onMenuClick = useCallback(
    (event: MenuInfo) => {
      const { key } = event
      if (key === 'logout') {
        setInitialState((s) => ({ ...s, currentUser: undefined }))
        loginOut()
        return
      }
      // window.history.push(`/account/${key}`);
    },
    [setInitialState]
  )

  const menuHeaderDropdown = userInfo ? (
    <Menu className="m-usermenu" selectedKeys={[]} onClick={onMenuClick} style={{ width: 110 }}>
      <Menu.Item key="center" onClick={()=>{history.push('./usercenter')}} >
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

  return (
    <div className="g-nav">
      <div className="g-menu">
        <div className="m-logo">
          <img src={logo} alt="" className="u-logo" />
          <span className="u-title">师大内推</span>
        </div>
        <div className="m-menu">
          <div className="u-menu">
            <img src={listIcon} />
            内推列表
          </div>
          <div className="u-menu">
            添加内推
            <img src={addIcon} />
          </div>
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
              <Avatar size={35} icon={<UserOutlined />} src='./a.jpg' />
            </div>
          </Dropdown>
        </div>
      </div>
      <div className="g-main">{children}</div>
    </div>
  )
}

export default NavWrapper
