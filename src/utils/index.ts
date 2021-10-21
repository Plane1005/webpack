import { message } from 'antd'
import JSEncrypt from 'jsencrypt';

const PUB_KEY = `-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCWqAwCqkPAuF0tI/zKk+htXbTl
m7BJaAfcnv+sULUlWdcfpjnJpCZsyFMyYZrrFult5i7ihKjQF8px3uEbj4Jv8iUD
vyTcfYFeUg56lnzx5KJnijjTMoHEuwvMnBdZLz03DiQdeAZroQKy9Kf+yzDF2BR2
RwcnYzQhZu0smQBR4QIDAQAB
-----END PUBLIC KEY-----`

// 公钥加密密码
export const getScrect = async (data: string) => {
  const encrypt = new JSEncrypt();
  encrypt.setPublicKey(PUB_KEY);
  const password = encrypt.encrypt(data);
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

// 获取存储的token
export const chkToken = (): string => {
  // 不用token的页面
  const unsecureList = ['/login'];
  let token = localStorage.getItem('token');
  if (token === null) {
    return "empty"
  }
  if (!unsecureList.includes(location.pathname)) {
    if (!token) {
      location.href = window.origin +'/login'
      return "error";
    }
  }
  return token;
}
