import React, { useState } from 'react'
import { LoginForm, ProFormText, ProFormCaptcha, ProFormCheckbox } from '@ant-design/pro-form'
import { UserOutlined, MobileOutlined, LockOutlined } from '@ant-design/icons'
import { message, Tabs, Space } from 'antd'
import logo from '@/assets/logo.png'
import { fetchUserInfo, userLogin } from '@/store/reducer/userReducer'
import './style.less'
import { useAppDispatch } from '@/store'
import { getScrect } from '@/utils/index'
import { useHistory } from 'react-router-dom'

type LoginType = 'phone' | 'account'

const Login: React.FC = (props: any) => {
  const [loginType, setLoginType] = useState<LoginType>('account')
  const dispatch = useAppDispatch()
  const history = useHistory()

  const handleSubmit = async (values: any) => {
    let password: string | boolean
    if (loginType === 'account') password = await getScrect(values.password)
    else password = values.captcha
    dispatch(
      userLogin({
        ...values,
        password,
        loginType
      })
    ).then((res: any) => {
      res = res?.payload?.data
      console.log(res);
      if (res?.success) {
        localStorage.setItem('isAdmin', res.isAdmin)
        localStorage.setItem('token', res.token)
        dispatch(fetchUserInfo()).then((res: any) => {
          localStorage.setItem('userInfo', res.payload.data ? JSON.stringify(res.payload.data) : '')
        })
        message.success('登录成功')
        history.push('/')
      }
    })
  }

  return (
    <div className="app-root g-login">
      <LoginForm
        logo={logo}
        title="师大内推"
        subTitle="杭师大学生内推平台"
        onFinish={async (values) => {
          await handleSubmit(values)
        }}
      >
        <Tabs activeKey={loginType} onChange={(activeKey) => setLoginType(activeKey as LoginType)}>
          <Tabs.TabPane key={'account'} tab={'账号密码登录'} />
          <Tabs.TabPane key={'phone'} tab={'手机号登录'} />
        </Tabs>
        {loginType === 'account' && (
          <>
            <ProFormText
              name="mobile"
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined className={'prefixIcon'} />,
              }}
              placeholder={'账号'}
              rules={[
                {
                  required: true,
                  message: '请输入账号!',
                },
              ]}
            />
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined className={'prefixIcon'} />,
              }}
              placeholder={'密码'}
              rules={[
                {
                  required: true,
                  message: '请输入密码！',
                },
              ]}
            />
          </>
        )}
        {loginType === 'phone' && (
          <>
            <ProFormText
              fieldProps={{
                size: 'large',
                prefix: <MobileOutlined className={'prefixIcon'} />,
              }}
              name="mobile"
              placeholder={'手机号'}
              rules={[
                {
                  required: true,
                  message: '请输入手机号！',
                },
                {
                  pattern: /^1\d{10}$/,
                  message: '手机号格式错误！',
                },
              ]}
            />
            <ProFormCaptcha
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined className={'prefixIcon'} />,
              }}
              captchaProps={{
                size: 'large',
              }}
              placeholder={'请输入验证码'}
              captchaTextRender={(timing, count) => {
                if (timing) {
                  return `${count} ${'获取验证码'}`
                }
                return '获取验证码'
              }}
              name="captcha"
              rules={[
                {
                  required: true,
                  message: '请输入验证码！',
                },
              ]}
              onGetCaptcha={async () => {
                message.success('获取验证码成功！验证码为：1234')
              }}
            />
          </>
        )}
        <div
          style={{
            marginBottom: 24,
          }}
        >
          <ProFormCheckbox noStyle name="autoLogin">
            自动登录
          </ProFormCheckbox>
          <a
            style={{
              float: 'right',
            }}
          >
            忘记密码
          </a>
        </div>
      </LoginForm>
    </div>
  )
}

export default Login
