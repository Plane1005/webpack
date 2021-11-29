import React, { CSSProperties, useEffect, useState } from 'react'
import { LoginForm, ProFormText, ProFormCaptcha, ProFormCheckbox } from '@ant-design/pro-form'
import { UserOutlined, MobileOutlined, LockOutlined } from '@ant-design/icons'
import { message, Tabs, Space, Modal } from 'antd'
import logo from '@/assets/logo.png'
import { fetchDingInfo, fetchUserInfo, userLogin } from '@/store/reducer/userReducer'
import './style.less'
import { useAppDispatch } from '@/store'
import { getScrect, getUrlParams } from '@/utils/index'
import { useHistory } from 'react-router-dom'
import DingLogin from './DingLogin'
import DingdingOutlined from '@ant-design/icons/lib/icons/DingdingOutlined'
import { AgentId, AppKey, AppSecret, REDIRECT_URI } from '@/utils/index';

type LoginType = 'phone' | 'account'

const iconStyles: CSSProperties = {
  marginLeft: '16px',
  color: '#1890ff',
  fontSize: '24px',
  verticalAlign: 'middle',
  cursor: 'pointer',
}

const Login: React.FC = (props: any) => {
  const [loginType, setLoginType] = useState<LoginType>('account')
  const dispatch = useAppDispatch()
  const history = useHistory()
  const [modalShow, setModalShow] = useState<boolean>(false)
  

  const handleSubmit = async (values: any) => {
    let password: string | boolean
    if (loginType === 'account') password = await getScrect(values.password)
    else password = values.captcha
    dispatch(
      userLogin({
        ...values,
        password,
        loginType,
      })
    ).then((res: any) => {
      res = res?.payload?.data
      if (res?.success) {
        localStorage.setItem('isAdmin', res.isAdmin)
        localStorage.setItem('token', res.token)
        dispatch(fetchUserInfo()).then((res: any) => {
          localStorage.setItem('userInfo', res.payload.data ? JSON.stringify(res.payload.data) : '')
        })
        message.success('登录成功')
        history.push('/')
      } else {
        message.error('密码错误')
      }
    })
  }

  useEffect(() => {
    //params为地址栏路由后面的参数（我这里是从 父组件中传过来的）
    let params = props?.location?.search
    //手机钉钉扫码后 确认登录 成功后 网页地址栏会出现一个参数：state='dinglogin'
    params = getUrlParams(params)
    console.log(params);
    if (params?.state === 'dinglogin') {
      //同时出现参数code （因为我们需要拿到这个参数 传给后台来获取用户信息）判断后再进行下一步操作
      if (params?.code) {
        let parameter = { jsCode: params.code, externalType: 2, AppKey, AppSecret }
        //在这里调用接口 获取用户信息，拿到返回结果，判断是否需要调用自己的登录接口
        dispatch(fetchDingInfo(parameter))
      }
    }
  }, [])

  return (
    <div className="app-root g-login">
      <LoginForm
        logo={logo}
        title="师大内推"
        subTitle="杭师大学生内推平台"
        onFinish={async (values) => {
          await handleSubmit(values)
        }}
        actions={
          <Space>
            其他登录方式
            <DingdingOutlined onClick={()=>{setModalShow(true)}} style={iconStyles} />
          </Space>
        }
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
      <Modal visible={modalShow} footer={null} onCancel={()=>{setModalShow(false)}} >
        <DingLogin params={props?.location?.search} />
      </Modal>
    </div>
  )
}

export default Login
