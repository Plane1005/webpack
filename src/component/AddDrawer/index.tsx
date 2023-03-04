import { IDrawerInfo, IFilterForm } from '@/types'
import { Button, Col, Form, FormInstance, Row, Space, Drawer } from 'antd'
import { PlusCircleOutlined, ExportOutlined } from '@ant-design/icons'
import React, { ReactNode, useEffect } from 'react'
import styled from './style.module.scss'

interface PropsType {
  form: FormInstance<any>
  title: ReactNode
  formItems: IFilterForm[]
  onAdd: (values: any) => void
  data: IDrawerInfo
  setData: React.Dispatch<React.SetStateAction<IDrawerInfo>>
}

export type AddDrawerPropsType = Partial<PropsType>

const AddDrawer = (props: AddDrawerPropsType) => {
  const { title = '新增', data, form, formItems = [], onAdd, setData } = props

  const handleSubmit = (values: any) => {
    console.log('drawer add values', form?.getFieldsValue())
    onAdd?.(form?.getFieldsValue())
  }

  const resetFilter = () => {
    form?.resetFields()
  }

  const onClose = () => {
    setData?.({ ...data, visible: false })
  }

  return (
    <Drawer
      open={data?.visible}
      className={styled.add_drawer}
      title={title}
      onClose={onClose}
      footer={
        <div className='flex-row-end'>
          <Button htmlType="reset" style={{ width: 80, marginRight: 12 }} onClick={resetFilter}>
            重置
          </Button>
          <Button type="primary" htmlType="submit" style={{ width: 80 }} onClick={handleSubmit}>
            提交
          </Button>
        </div>
      }
    >
      <Form form={form} initialValues={data?.data}>
        {formItems.map((it) => (
          <Form.Item label={it.label} name={it.name}>
            {it.component}
          </Form.Item>
        ))}
      </Form>
    </Drawer>
  )
}

export default AddDrawer
