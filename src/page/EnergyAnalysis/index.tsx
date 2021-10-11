import React, { useState, memo, useEffect, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '@/store'
import { Form, Space, Button, DatePicker, Select, InputNumber } from 'antd'
import moment from 'moment'
import './index.less'

type LayoutType = Parameters<typeof Form>[0]['layout']
const { Option } = Select
const { RangePicker } = DatePicker
const weekFormat = 'MM/DD'
const customWeekStartEndFormat = (value) => `${moment(value).format(weekFormat)}`

const energyAnalysis = (props: any) => {
  const [form] = Form.useForm()
  const [formLayout] = useState<LayoutType>('inline')
  const roleListCount = useSelector((state: RootState) => state.system.roleListCount)

  const formFinish = (values: any) => {
    console.log(values)
  }

  return (
    <div className="g_energy">
      <div className="m_title">新风空调系统能耗分析优化系统</div>
      <div className="m_form">
        <Form form={form} layout={formLayout} onFinish={formFinish} initialValues={{city:'杭州',temp:23.0,date:[moment('01-01', weekFormat), moment('12-31', weekFormat)]}}>
          <Space>
            <span>区域范围</span>
            <Form.Item name="city">
              <Select>
                <Option value="杭州">杭州</Option>
              </Select>
            </Form.Item>
            <span>干球温度</span>
            <Form.Item name="temp">
              <InputNumber
                className="u_inputNum"
                formatter={(value) => `${value}℃`}
                step="0.1"
              />
            </Form.Item>
            <span>日期范围</span>
            <Form.Item name="date">
              <RangePicker
                className="u_dataPick"
                format={customWeekStartEndFormat}
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                分析
              </Button>
            </Form.Item>
          </Space>
        </Form>
      </div>
    </div>
  )
}

export default memo(energyAnalysis)
