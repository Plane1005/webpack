import { IDrawerInfo, IFilterForm } from '@/types'
import { Button, Col, Form, FormInstance, Row, Space, Drawer } from 'antd'
import { PlusCircleOutlined, ExportOutlined } from '@ant-design/icons'
import React, { ReactNode, useEffect, useState } from 'react'
import styled from './style.module.scss'

interface PropsType {
  form: FormInstance<any>
  title: ReactNode
  formItems: IFilterForm[]
  onAdd: (values: any) => void
  onEdit: (values: any) => void
  onCopy: (values: any) => void
  data: IDrawerInfo
  setData: React.Dispatch<React.SetStateAction<IDrawerInfo>>
}

export type AddDrawerPropsType = Partial<PropsType>

const AddDrawer = (props: AddDrawerPropsType) => {
  const { title = '新增', data, form, formItems = [], onAdd, setData, onEdit, onCopy } = props
  const [isInit, setisInit] = useState(false);

  const handleSubmit = () => {
    form
      ?.validateFields()
      .then(() => {
        const values = form?.getFieldsValue();
        console.log('drawer add values', form?.getFieldsValue())
        if (data?.isEdit) {
          onEdit?.(values)
          return;
        }
        if (data?.isCopy) {
          onCopy?.(values)
          return;
        }
        onAdd?.(values)
      })
      .catch(() => {})
  }

  useEffect(() => {
    if (data?.data && !isInit) {
      setisInit(true)
      form?.setFieldsValue(data.data)
    }
  }, [data?.data]);

  const resetFilter = () => {
    form?.resetFields()
  }

  const onClose = () => {
    setData?.({ visible: false })
  }

  return (
    <Drawer
      open={data?.visible}
      className={styled.add_drawer}
      title={title}
      onClose={onClose}
      destroyOnClose
      footer={
        <div className="flex-row-end">
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
          <Form.Item label={it.label} name={it.name} rules={[{ required: it.notRequire ? false : true }]}>
            {it.component}
          </Form.Item>
        ))}
      </Form>
    </Drawer>
  )
}

export default AddDrawer
