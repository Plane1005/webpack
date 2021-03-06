import { RootState, useAppDispatch } from '@/store'
import CheckOutlined from '@ant-design/icons/lib/icons/CheckOutlined'
import EditOutlined from '@ant-design/icons/lib/icons/EditOutlined'
import FileOutlined from '@ant-design/icons/lib/icons/FileOutlined'
import { Button, Form, Input, message, Select, Upload } from 'antd'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { updateInfo, fetchPDF } from '@/store/reducer/userReducer'
import PDFViewer from './PDFViewer'
import Avatar from '@/component/Avatar'
import './style.less'
import { PUBLIC_URL } from '../../../config/proxy'
import { chkToken } from '@/utils'
// import NavWrapper from 'component/NavWrapper'

const UserCenter: React.FC = (props: any) => {
  const [form] = Form.useForm()
  const [editing, setEditing] = useState<boolean>(false)
  const [PDFContent, setPDFContent] = useState<boolean | string>(false)
  const userInfo = useSelector((state: RootState) => state.user.userInfo)
  const { Option } = Select
  const { TextArea } = Input
  const dispatch = useAppDispatch()

  const onFinish = (values: any) => {
    dispatch(updateInfo(form.getFieldsValue(true))).then((res: any) => {
      const { success } = res?.payload?.data
      if (success) setEditing(false)
    })
  }

  const handleFileUpload = (value: any) => {
    const { file } = value
    if (file?.response?.code === 200) {
      message.success('更新成功')
      dispatch(fetchPDF())
    }
  }

  console.log('userinfo',userInfo);

  return (
    <div className="g-usercenter">
      <div className="m-main">
        <div className="m-left">
          <div className="m-user">
            <Avatar imgUrl={userInfo?.avatar} uploadUrl={PUBLIC_URL + 'api/user/upload'} uploadType="1"/>
            <div className="m-btn">
              <Button
                type="primary"
                icon={<EditOutlined />}
                shape="round"
                size="large"
                onClick={() => {
                  setEditing(!editing)
                }}
              >
                {editing ? '取消' : '编辑资料'}
              </Button>
              <Button
                type="primary"
                icon={<CheckOutlined />}
                shape="round"
                size="large"
                style={{ marginTop: 20 }}
                disabled={!editing}
                onClick={() => {
                  form.submit()
                }}
                htmlType="submit"
              >
                提交
              </Button>
              <Upload action={PUBLIC_URL + 'api/user/upload'} showUploadList={false} accept='.pdf' headers={{accessToken: chkToken(),uploadType: "2"}} onChange={handleFileUpload}>
              <Button
                type="primary"
                icon={<FileOutlined />}
                shape="round"
                size="large"
                style={{ marginTop: 20 }}
              >
                更新简历
              </Button>
              </Upload>
            </div>
          </div>
          <Form form={form} name="userInfo" onFinish={onFinish} initialValues={userInfo}>
            <div className="m-form">
              <Form.Item name="mobile">
                <div className="m-item">
                  <span className="u-label">手机号</span>
                  {/* {editing ? <Input /> : userInfo?.mobile } */}
                  {userInfo?.mobile}
                </div>
              </Form.Item>
              <Form.Item name="password">
                <div className="m-item">
                  <span className="u-label">密码</span>
                  {editing ? (
                    <Input.Password defaultValue={userInfo?.password} width={300} />
                  ) : (
                    '******'
                  )}
                </div>
              </Form.Item>
              <Form.Item name="name">
                <div className="m-item">
                  <span className="u-label">姓名</span>
                  {editing ? <Input defaultValue={userInfo?.name} /> : userInfo?.name}
                </div>
              </Form.Item>
              <Form.Item name="sex">
                <div className="m-item">
                  <span className="u-label">性别</span>
                  {editing ? (
                    <Select
                      onChange={(value: string) => {
                        form.setFieldsValue({
                          sex: value,
                        })
                      }}
                      defaultValue={userInfo?.sex}
                    >
                      <Option value="男">男</Option>
                      <Option value="女">女</Option>
                      <Option value="未知">未知</Option>
                    </Select>
                  ) : (
                    userInfo?.sex
                  )}
                </div>
              </Form.Item>
              <Form.Item name="stuId">
                <div className="m-item">
                  <span className="u-label">学号</span>
                  {editing ? <Input defaultValue={userInfo?.stuId} /> : userInfo?.stuId}
                </div>
              </Form.Item>
              <Form.Item name="birth">
                <div className="m-item">
                  <span className="u-label">出生年份</span>
                  {editing ? <Input defaultValue={userInfo?.birth} /> : userInfo?.birth}
                </div>
              </Form.Item>
              <Form.Item name="work">
                <div className="m-item">
                  <span className="u-label">求职岗位</span>
                  {editing ? <Input defaultValue={userInfo?.work} /> : userInfo?.work}
                </div>
              </Form.Item>
              <Form.Item name="company">
                <div className="m-item">
                  <div className="u-company">公司</div>
                  {editing ? (
                    <TextArea showCount rows={4} maxLength={70} defaultValue={userInfo?.company} />
                  ) : (
                    userInfo?.company
                  )}
                </div>
              </Form.Item>
            </div>
          </Form>
        </div>
        <PDFViewer />
      </div>
    </div>
  )
}

export default UserCenter
