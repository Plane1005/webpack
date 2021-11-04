import React, { CSSProperties, useState } from 'react'
import { message, Upload } from 'antd'
import PictureOutlined from '@ant-design/icons/lib/icons/PictureOutlined'
import { chkToken } from '@/utils'
import { useAppDispatch } from '@/store'
import { fetchUserInfo } from '@/store/reducer/userReducer'

interface AvatarType {
  imgUrl: string | undefined
  uploadUrl: string
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
  const { imgUrl, uploadUrl } = props
  const [maskVisble, setMaskVisble] = useState(false)
  const dispatch = useAppDispatch()

  const handleFileUpload = (value: any) => {
    const { file } = value
    if (file?.response?.code === 200) {
      message.success('更新成功')
      dispatch(fetchUserInfo())
    }
  }

  return (
    <div
      className="g-avatar"
      style={{ position: 'relative' }}
      onMouseOver={() => setMaskVisble(true)}
      onMouseOut={() => setMaskVisble(false)}
    >
      <Upload action={uploadUrl} showUploadList={false} accept='.jpg,.jpeg,.png' headers={{accessToken: chkToken()}} onChange={handleFileUpload}>
        <div>
          <div style={maskVisble ? maskStyle : removeMask}></div>
          <div style={maskVisble ? mackContent : removeMask}>
            <PictureOutlined />
            <div>修改头像</div>
          </div>
        </div>
      </Upload>
      <img
        width={140}
        height={140}
        src={imgUrl}
        style={{ borderRadius: '8px', border: '4px solid #fff' }}
      />
    </div>
  )
}

export default Avatar
