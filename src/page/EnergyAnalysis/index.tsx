import React, { useState, memo, useEffect, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '@/store'
import { Form, Space, Button, DatePicker, Select, InputNumber, Table, Tabs } from 'antd'
import { fetchRoleList } from '@/store/reducer/systemReducer'
import moment from 'moment'
import { setDate } from '@/utils/index'
import TempChart from './components/TempChart';
import './index.less'

type LayoutType = Parameters<typeof Form>[0]['layout']
const { Option } = Select
const { RangePicker } = DatePicker
const weekFormat = 'MM/DD'
const customWeekStartEndFormat = (value) => `${moment(value).format(weekFormat)}`
const { TabPane } = Tabs

const energyAnalysis = (props: any) => {
  const dispatch = useAppDispatch()
  const [form] = Form.useForm()
  const [formLayout] = useState<LayoutType>('inline')
  const [pageNum, setPageNum] = useState<number>(1)
  const [pageSize] = useState<number>(10)
  const roleList = useSelector((state: RootState) => state.system.roleList)
  const roleListCount = useSelector((state: RootState) => state.system.roleListCount)

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '日期',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: '干球温度',
      dataIndex: 'gqwd',
      key: 'gqwd',
    },
    {
      title: '含湿量',
      dataIndex: 'hsl',
      key: 'hsl',
    },
    {
      title: '焓值',
      dataIndex: 'hz',
      key: 'hz',
    },
    {
      title: '相对湿度',
      dataIndex: 'xdsd',
      key: 'xdsd',
    },
    {
      title: '露点温度',
      dataIndex: 'ldwd',
      key: 'ldwd',
    },
    {
      title: '湿球温度',
      dataIndex: 'sqwd',
      key: 'sqwd',
    },
    {
      title: '地表温度',
      dataIndex: 'dbwd',
      key: 'dbwd',
    },
    {
      title: '天空有效温度',
      dataIndex: 'tkyxwd',
      key: 'tkyxwd',
    },
  ]

  const searchData = () => {
    let values = form.getFieldsValue()
    dispatch(
      fetchRoleList({
        pageNum,
        pageSize,
        ...values,
        beginTime: setDate(moment(values.date[0]._d).format('YYYY-MM-DD')),
        endTime: setDate(moment(values.date[1]._d).format('YYYY-MM-DD')),
      })
    )
  }

  useEffect(() => {
    searchData()
  }, [pageNum])

  return (
    <div className="g_energy">
      <div className="m_title">新风空调系统能耗分析优化系统</div>
      <div className="m_form">
        <Form
          form={form}
          layout={formLayout}
          onFinish={searchData}
          initialValues={{
            city: '杭州',
            temp: 23.0,
            date: [moment('01-01', weekFormat), moment('12-31', weekFormat)],
          }}
        >
          <Space>
            <span>区域范围</span>
            <Form.Item name="city">
              <Select>
                <Option value="杭州">杭州</Option>
              </Select>
            </Form.Item>
            <span>干球温度</span>
            <Form.Item name="temp">
              <InputNumber className="u_inputNum" formatter={(value) => `${value}℃`} step="0.1" />
            </Form.Item>
            <span>日期范围</span>
            <Form.Item name="date">
              <RangePicker className="u_dataPick" format={customWeekStartEndFormat} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                分析
              </Button>
            </Form.Item>
          </Space>
        </Form>
      </div>
      <Tabs tabPosition="right">
        <TabPane tab="气候数据" key="1">
          <Table
            columns={columns}
            dataSource={roleList}
            pagination={{
              total: roleListCount,
              showSizeChanger: false,
              onChange: (page) => {
                setPageNum(page)
              },
              showQuickJumper: true,
            }}
          />
        </TabPane>
        <TabPane tab="温度统计" key="2">
          <TempChart />
        </TabPane>
        <TabPane tab="Tab 3" key="3">
          Content of Tab 3
        </TabPane>
      </Tabs>
    </div>
  )
}

export default memo(energyAnalysis)
