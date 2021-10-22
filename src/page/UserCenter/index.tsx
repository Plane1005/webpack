import { RootState } from '@/store'
import CheckOutlined from '@ant-design/icons/lib/icons/CheckOutlined'
import EditOutlined from '@ant-design/icons/lib/icons/EditOutlined'
import { Button, Form, Input } from 'antd'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import PDFViewer from './PDFViewer'
import Avatar from './Avatar'
import './style.less'
// import NavWrapper from 'component/NavWrapper'

const UserCenter: React.FC = (props: any) => {
  const [form] = Form.useForm()
  const [editable, setEditable] = useState<boolean>(true)
  const userInfo = useSelector((state: RootState) => state.user.userInfo)

  const onFinish = (values: any) => {
    console.log(values)
  }

  return (
    <div className="g-usercenter">
      <div className="m-main">
        <div className="m-left">
          <Avatar
            imgUrl="http://116.62.220.126/test/avatar.jpg"
            uploadUrl="null"
          />
          <Button
            type="primary"
            icon={<EditOutlined />}
            shape="round"
            size="large"
            style={{ marginTop: 30 }}
          >
            编辑资料
          </Button>
          <Button
            type="primary"
            icon={<CheckOutlined />}
            shape="round"
            size="large"
            style={{ marginTop: 30 }}
            disabled={true}
          >
            提交
          </Button>
        </div>
        <Form form={form} name="userInfo" onFinish={onFinish}>
          <div className="m-right">
            <Form.Item name="mobile">
              <div className="m-item">
                <span>手机号</span>
                {editable ? userInfo?.mobile : <Input />}
              </div>
            </Form.Item>
            <Form.Item name="name">
              <div className="m-item">
                <span>姓名</span>
                {editable ? userInfo?.name : <Input />}
              </div>
            </Form.Item>
            <Form.Item name="sex">
              <div className="m-item">
                <span>性别</span>
                {editable ? userInfo?.sex : <Input />}
              </div>
            </Form.Item>
            <Form.Item name="stuId">
              <div className="m-item">
                <span>学号</span>
                {editable ? userInfo?.stuId : <Input />}
              </div>
            </Form.Item>
            <Form.Item name="birth">
              <div className="m-item">
                <span>出生年份</span>
                {editable ? userInfo?.birth : <Input />}
              </div>
            </Form.Item>
            <Form.Item name="work">
              <div className="m-item">
                <span>求职岗位</span>
                {editable ? userInfo?.work : <Input />}
              </div>
            </Form.Item>
            <Form.Item name="company">
              <div className="m-item">
                <span>公司</span>
                {editable ? userInfo?.company : <Input />}
              </div>
            </Form.Item>
          </div>
        </Form>
        <div>
          {/* <PDFViewer alreadySrc='http://116.62.220.126/test/jianli.pdf' /> */}
        </div>
      </div>
    </div>
  )
}

export default UserCenter
