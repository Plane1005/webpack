import React, { useState } from 'react'
import GodMap from '@/component/GodMap'
import './style.less'
import { Form, Input, InputNumber, Select } from 'antd'
import { RootState, useAppDispatch } from '@/store'
import { useSelector } from 'react-redux'

const AddWork: React.FC = (props: any) => {
  const [form] = Form.useForm()
  const [editing, setEditing] = useState<boolean>(false)
  const userInfo = useSelector((state: RootState) => state.user.userInfo)
  const { Option } = Select
  const { TextArea } = Input
  const dispatch = useAppDispatch()

  const onFinish = (value: any) => {
    console.log(value)
  }

  return (
    <div className="g-addwork">
      <Form name="addwork" onFinish={onFinish} className="m-form">
        <Form.Item name="work" label="岗位">
          <Input maxLength={30} style={{ width: 250 }} />
        </Form.Item>
        <Form.Item name="money" label="薪资">
          <InputNumber style={{ width: 80 }} step={10} />
          <span style={{ margin: '0 10px'}} >~</span>
          <InputNumber style={{ width: 80 }} step={10} />
          <Select
            style={{ width: 100,marginLeft: 20 }}
            onChange={(value: string) => {
              form.setFieldsValue({
                moneytype: value,
              })
            }}
          >
            <Option value="day_money">日薪</Option>
            <Option value="month_money">月薪</Option>
          </Select>
        </Form.Item>
        <Form.Item name="totaltime" label="实习总时间">
          <InputNumber style={{ width: 80 }} min={1} max={12} defaultValue={3} formatter={(value) => `${value}月`} />
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
        <Form.Item name="worknum" label="招聘人数">
          <InputNumber maxLength={30} style={{ width: 80 }} />
        </Form.Item>
        <Form.Item name="address">
          <GodMap />
        </Form.Item>
      </Form>
    </div>
  )
}

export default AddWork
