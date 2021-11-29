import React, { useState, useEffect } from 'react'
import { request } from '@/utils/request' //你自己封装的调用接口的方法
import { message } from 'antd'
import { useHistory } from 'react-router-dom'
import { getUrlParams } from '@/utils/index';
import { useAppDispatch } from '@/store';
import { fetchDingInfo } from '@/store/reducer/userReducer';
import * as dd from 'dingtalk-jsapi';
import { AgentId, AppKey, AppSecret, REDIRECT_URI, CorpId } from '@/utils/index';

interface DingType {
  params: string
}

const DingLogin: React.FC<DingType> = (props: any) => {
  // const [REDIRECT_URI] = useState<string>("http://zxl0313.top/#/login/")
  const history = useHistory()
  const dispatch = useAppDispatch()

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
    const handleMessage = (event) => {
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
