import React, { useState, memo, useEffect, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '@/store'
import { Form, Space, Button, DatePicker, Select, InputNumber } from 'antd'
import moment from 'moment';
import './index.less'

type LayoutType = Parameters<typeof Form>[0]['layout']
const { Option } = Select
const { RangePicker } = DatePicker
const weekFormat = 'MM/DD';
const customWeekStartEndFormat = value =>
  `${moment(value).startOf('week').format(weekFormat)} ~ ${moment(value)
    .endOf('week')
    .format(weekFormat)}`;

const energyAnalysis = (props: any) => {
  const [form] = Form.useForm()
  const [formLayout] = useState<LayoutType>('inline')
  const roleListCount = useSelector((state: RootState) => state.system.roleListCount)

  return (
    <div className="g_energy">
      <div className="m_title">新风空调系统能耗分析优化系统</div>
      <div className="m_form">
        <Form form={form} layout={formLayout}>
          <Space>
            <span>区域范围</span>
            <Form.Item>
              <Select defaultValue="杭州">
                <Option value="杭州">杭州</Option>
              </Select>
            </Form.Item>
            <span>干球温度</span>
            <Form.Item>
              <InputNumber className="u_inputNum" defaultValue="23.0" formatter={(value) => `${value}℃`} step="0.1" />
            </Form.Item>
            <span>日期范围</span>
            <Form.Item>
              <RangePicker className="u_dataPick" defaultValue={[moment('2019-01-01', weekFormat), moment('2019-12-31', weekFormat)]} />
              {/* format={customWeekStartEndFormat} */}
            </Form.Item>
            <Form.Item>
              <Button type="primary">分析</Button>
            </Form.Item>
          </Space>
        </Form>
      </div>
    </div>
  )
}

export default memo(energyAnalysis)
