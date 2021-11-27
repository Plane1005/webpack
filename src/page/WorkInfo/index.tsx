import React, { useState } from 'react'
import GodMap from '@/component/GodMap'
import './style.less'
import { Button, Form, Input, InputNumber, message, Select, TimePicker } from 'antd'
import { RootState, useAppDispatch } from '@/store'
import { useSelector } from 'react-redux'
import moment from 'moment'
import Avatar from '@/component/Avatar'
import { PUBLIC_URL } from '../../../config/proxy'
import CheckOutlined from '@ant-design/icons/lib/icons/CheckOutlined'
import { addWork } from '@/store/reducer/systemReducer'
import { useHistory } from 'react-router'

const WorkInfo: React.FC = (props: any) => {
  const [form] = Form.useForm()
  const [saveImgUrl, setSaveImgUrl] = useState<string | null>(null)
  const [address, setAddress] = useState<object>({})
  const [beginTime, setBeginTime] = useState<any>('09:00')
  const [endTime, setEndTime] = useState('18:00')
  const [startSalary, setStartSalary] = useState(100)
  const [endSalary, setEndSalary] = useState(300)
  const userInfo = useSelector((state: RootState) => state.user.userInfo)
  const { Option } = Select
  const { TextArea } = Input
  const dispatch = useAppDispatch()
  const history = useHistory()
  const format = 'HH:mm'

  const onFinish = (values: any) => {
    if (userInfo?.mobile) {
      dispatch(
        addWork({
          mobile: userInfo.mobile,
          beginTime,
          endTime,
          startSalary,
          endSalary,
          address,
          ...values,
        })
      ).then((res: any) => {
        const { success } = res?.payload?.data
        if (success) history.replace('')
      })
    } else {
      message.error('请先登录！')
    }
  }

  return (
    <div className="g-addwork">
      <Form
        form={form}
        name="addwork"
        onFinish={onFinish}
        className="m-form"
        initialValues={{
          totalTime: 3,
        }}
      >
        <div className="m-company">
          <Form.Item name="company" label="公司名称">
            <Input maxLength={30} style={{ width: 250 }} />
          </Form.Item>
          <div>公司Logo：</div>
          <Avatar
            imgUrl={saveImgUrl || "http://116.62.220.126/test/avatar.jpg"}
            uploadUrl={PUBLIC_URL + 'api/user/upload'}
            uploadType="2"
            setSaveImgUrl={setSaveImgUrl}
          />
        </div>
        <Form.Item name="work" label="岗位">
          <Input maxLength={30} style={{ width: 250 }} />
        </Form.Item>
        <Form.Item label="薪资">
          <InputNumber
            style={{ width: 80 }}
            step={10}
            value={startSalary}
            onChange={(e) => {
              setStartSalary(e)
            }}
          />
          <span style={{ margin: '0 10px' }}>~</span>
          <InputNumber
            style={{ width: 80 }}
            step={10}
            value={endSalary}
            onChange={(e) => {
              setEndSalary(e)
            }}
          />
          <Select
            style={{ width: 100, marginLeft: 20 }}
            onChange={(value: string) => {
              form.setFieldsValue({
                moneytype: value,
              })
            }}
            defaultValue="day_money"
          >
            <Option value="day_money">日薪</Option>
            <Option value="month_money">月薪</Option>
          </Select>
        </Form.Item>
        <div className="m-totalTime">
          <Form.Item label="工作时间">
            <TimePicker
              name="workTime"
              defaultValue={moment('09:00', format)}
              format={format}
              onChange={(e: any) => {
                setBeginTime(moment(e._d).format(format))
              }}
            />
            <span style={{ margin: '0 10px' }}>~</span>
            <TimePicker
              defaultValue={moment('18:00', format)}
              format={format}
              onChange={(e: any) => {
                setEndTime(moment(e._d).format(format))
              }}
            />
          </Form.Item>
          <div className="u-workDay">
            <Form.Item name="totalTime">
              <InputNumber
                style={{ width: 80 }}
                min={1}
                max={12}
                formatter={(value) => `${value}月`}
              />
            </Form.Item>
          </div>
        </div>
        <Form.Item name="workDay" label="实习总时间">
          <Select style={{ width: 100 }}>
            <Option value="1天/周">1天/周</Option>
            <Option value="2天/周">2天/周</Option>
            <Option value="3天/周">3天/周</Option>
            <Option value="4天/周">4天/周</Option>
            <Option value="5天/周">5天/周</Option>
            <Option value="在校/应届">在校/应届</Option>
          </Select>
        </Form.Item>

        <Form.Item name="education" label="学历">
          <Select
            style={{ width: 100 }}
            onChange={(value: string) => {
              form.setFieldsValue({
                education: value,
              })
            }}
          >
            <Option value="本科">本科</Option>
            <Option value="硕士">硕士</Option>
            <Option value="博士">博士</Option>
          </Select>
        </Form.Item>
        <Form.Item name="workNum" label="招聘人数">
          <InputNumber maxLength={30} style={{ width: 80 }} />
        </Form.Item>
        <Form.Item name="workDetail" label="岗位描述">
          <TextArea showCount allowClear maxLength={200} />
        </Form.Item>
        <Form.Item name="workRequire" label="岗位要求">
          <TextArea showCount allowClear maxLength={200} />
        </Form.Item>
        <Form.Item>
          <GodMap setAddress={setAddress} />
        </Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          size="large"
          icon={<CheckOutlined />}
          style={{ marginLeft: 'auto' }}
        >
          提交内推
        </Button>
      </Form>
    </div>
  )
}

export default WorkInfo
