import { message } from 'antd'
import JSEncrypt from 'jsencrypt'
import cookie from 'react-cookies'

// 获取存储的token
export const chkToken = (): string => {
  // 不用token的页面
  const unsecureList = ['/','/login','/worklist']
  let token = cookie.load('jetToken')
  if (!unsecureList.includes(location.pathname)) {
    if (!token) {
      location.href = window.origin + '/login'
      return 'error'
    }
  }
  return token
}

// 用户登录，保存cookie
export const saveToken = (token: string) => {
  let cookieTime = new Date(new Date().getTime() + 24 * 3600 * 1000);
  cookie.save('jetToken', token, { expires: cookieTime })
}

// 用户登出，删除cookie
export const userLogOut = () => {
  cookie.remove('jetToken')
  location.href = '/'
  document.title = '师大内推'
}


const PUB_KEY = `-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCWqAwCqkPAuF0tI/zKk+htXbTl
m7BJaAfcnv+sULUlWdcfpjnJpCZsyFMyYZrrFult5i7ihKjQF8px3uEbj4Jv8iUD
vyTcfYFeUg56lnzx5KJnijjTMoHEuwvMnBdZLz03DiQdeAZroQKy9Kf+yzDF2BR2
RwcnYzQhZu0smQBR4QIDAQAB
-----END PUBLIC KEY-----`

export const AgentId: string = "1384166309"
export const AppKey: string = "dingaw2togxomecovuxy"
export const AppSecret: string = "925KT3fMyPb_Nv2rh08eedeHu5eYR4LwW6QDsNrE3jc-VyAPSRxqWK2R0wXhAfrt"
export const CorpId: string = "dingd22a6c4bf53f3567a39a90f97fcb1e09"
export const REDIRECT_URI: string = "http://localhost:8080/login"

// 公钥加密密码
export const getScrect = async (data: string) => {
  const encrypt = new JSEncrypt()
  encrypt.setPublicKey(PUB_KEY)
  const password = encrypt.encrypt(data)
  return password
}

// 处理消息提示
export const handleMessage = (res: any, tip: string, warn = '') => {
  if (res.success) {
    message.success(tip)
  } else {
    message.warning(warn || res.message)
  }
}

// 将日期处理为1999年
export const setDate = (oldDate: string) => {
  return "'1999" + oldDate.slice(4) + "'"
}

// 判断对象是否为空
export const objNotEmpty = (obj: object) => {
  if (Object.keys(obj).length === 0) {
    return false // 如果为空,返回false
  }
  return true // 如果不为空，则会执行到这一步，返回true
}

// 转base64
export const switchBase64 = async (value: Blob) => {
  return new Promise((res, rej) => {
    try {
      // console.log('base',value);
      if (value.size < 100) return null
      let ans: string = ''
      let reader = new FileReader()
      reader.readAsDataURL(value) // 转换为base64，可以直接放入a标签href
      reader.addEventListener('load', function () {
        let base64 = reader.result as string
        ans = 'data:application/pdf;base64,' + base64.split(',')[1]
        res(ans)
      })
    } catch (error) {
      rej(error)
    }
  })
}

export const getUrlParams = (objName: string): object | null => {
  if(objName.indexOf("?")<0) return null; 
  let allParamsArr = objName.split("?")[1].split("&")
  let returnObj = {};
  if (allParamsArr.length == 0) return null;
  for(let i =0; i<allParamsArr.length; i++) {
      returnObj[`${allParamsArr[i].split("=")[0]}`] = allParamsArr[i].split("=")[1]
  }
  return returnObj
}


// 防抖
// 函数触发后立即执行，过delay秒后才能再次执行
// 如果delay时再次触发，则重新计时
export function debounce(fn, delay) {
	let timer: any = null
	return function () {
		if (timer) {
			clearTimeout(timer)
		}
		let callNow = !timer
		timer = setTimeout(() => {
			timer = null
		}, delay)
		if (callNow) {
			fn()
		}
	}
}

//节流
//函数触发后立即执行，过delay秒后可再执行
//如果delay时再次触发，无动作
//连续发生的事件在delay秒内只执行一次函数
export function throttle(fn, delay) {
	let timer: any = null
  return function () {
    if (!timer) {
      fn()
			timer = setTimeout(() => {
				timer = null
			}, delay)
    }
	}
}
