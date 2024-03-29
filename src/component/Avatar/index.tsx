import React, { CSSProperties, useState } from 'react'
import { message, Upload } from 'antd'
import PictureOutlined from '@ant-design/icons/lib/icons/PictureOutlined'
import { throttle } from '@/utils'
import { useAppDispatch } from '@/store'
import { fetchUserInfo } from '@/store/reducer/userReducer'

interface AvatarType {
  imgUrl: string | undefined
  uploadUrl: string
  uploadType: string // 1为用户头像 2为公司头像
  setSaveImgUrl?: (value: any) => void
}

const maskStyle: CSSProperties = {
  color: '#fff',
  position: 'absolute',
  width: 132,
  height: 132,
  top: 4,
  left: 4,
  opacity: 0.4,
  transition: 'opacity .2s ease-in',
  cursor: 'pointer',
  backgroundColor: '#121212',
}

const removeMask: CSSProperties = {
  position: 'absolute',
  opacity: 0,
}

const mackContent: CSSProperties = {
  position: 'absolute',
  top: '45px',
  left: '45px',
  color: '#fff',
  zIndex: 10,
  textAlign: 'center',
  cursor: 'pointer',
}

const Avatar: React.FC<AvatarType> = (props) => {
  const { imgUrl, uploadUrl, uploadType, setSaveImgUrl } = props
  const [maskVisble, setMaskVisble] = useState(false)
  const dispatch = useAppDispatch()

  const handleFileUpload = (value: any) => {
    const { file } = value
    if (file?.response?.code === 200) {
      message.success('更新成功')
      dispatch(fetchUserInfo())
      if (setSaveImgUrl) setSaveImgUrl(file?.response?.data?.url)
    }
  }

  return (
    <Upload
      action={uploadUrl}
      showUploadList={false}
      accept=".jpg,.jpeg,.png"
      headers={{ uploadType: uploadType }}
      onChange={handleFileUpload}
    >
      <div
        className="g-avatar"
        style={{ position: 'relative', display: 'inline-block', zIndex:99 }}
        onMouseEnter={throttle(() => {
          setMaskVisble(true)
        },1000)}
        onMouseLeave={throttle(() => {
          setMaskVisble(false)
        },1000)}
      >
        <div>
          <div style={maskVisble ? maskStyle : removeMask}></div>
          <div style={maskVisble ? mackContent : removeMask}>
            <PictureOutlined />
            <div>{uploadType === '1' ? '修改头像' : '修改Logo  '}</div>
          </div>
        </div>

        <img
          width={140}
          height={140}
          src={imgUrl}
          style={{ borderRadius: '8px', border: '4px solid #fff' }}
        />
      </div>
    </Upload>
  )
}

export default Avatar
