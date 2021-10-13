import { message } from "antd"

// 处理消息提示
export const handleMessage = (res: any, tip: string, warn = '') => {
  if (res.success) {
    message.success(tip)
  } else {
    message.warning(warn || res.message)
  }
}

export const setDate = (oldDate: string) => {
  return '\'1999' + oldDate.slice(4) + '\''
}
