import React, { useEffect, useState } from 'react'
import { AppKey, REDIRECT_URI } from '@/utils/index';

declare const window: any;

interface DingType {
  params: string
}

const DingLogin: React.FC<DingType> = () => {
  const [REDIRECT_URI] = useState<string>("http://localhost:8080/login")

  useEffect(() => {
    let URL = encodeURIComponent(
      `https://oapi.dingtalk.com/connect/oauth2/sns_authorize?appid=${AppKey}&response_type=code&scope=snsapi_login&state=STATE&redirect_uri=${REDIRECT_URI}`
    )
    // 实例化对象
    let obj = window.DDLogin({
      id: 'login_container',
      goto: URL,
      style: 'border:none;background-color:#FFFFFF;',
      width: '100%',
      height: '300',
    })
    // 监听消息处理方法
    const handleMessage = (event: { data: any; origin: any; }) => {
      // 获取loginTempCode
      const loginTempCode = event.data
      // 获取消息来源
      const origin = event.origin
      // 拼接 url
      const url = `https://oapi.dingtalk.com/connect/oauth2/sns_authorize?appid=${AppKey}&response_type=code&scope=snsapi_login&state=dinglogin&redirect_uri=${REDIRECT_URI}&loginTmpCode=${loginTempCode}`
      // 如果来源为https://login.dingtalk.com，则在当前窗口打开回调链接
      if (origin === 'https://login.dingtalk.com') {
        window.open(encodeURI(url))
      }
    }
    // 监听iframe的消息
    if (typeof window.addEventListener != 'undefined') {
      window.addEventListener('message', handleMessage, false)
    } else if (typeof window.attachEvent != 'undefined') {
      window.attachEvent('onmessage', handleMessage)
    }
  }, [])
  return <div id="login_container"></div>
}

export default DingLogin
