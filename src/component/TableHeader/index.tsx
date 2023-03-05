import { IFilterForm } from '@/types'
import { Button, Col, Form, FormInstance, Row, Space, Table } from 'antd'
import { PlusCircleOutlined, ExportOutlined } from '@ant-design/icons'
import React, { ReactNode } from 'react'
import styled from './style.module.scss'

interface PropsType {
  title: string;
  form: FormInstance<any>
  needToolbar: boolean
  needAddBtn: boolean
  needExtraBtn: boolean
  columns: any
  dataSource: any
  formItems: IFilterForm[]
  toolbarExtra: ReactNode
  onFilter: (values: any) => void
  onAddBtnClick: () => void
  onExport: () => void
  setPage: React.Dispatch<React.SetStateAction<number>>
}

export type TableFilterPropsType = Partial<PropsType>

const TableFilter = (props: TableFilterPropsType) => {
  const {
    form,
    title = '',
    needToolbar = true,
    needAddBtn = true,
    needExtraBtn = true,
    columns,
    dataSource,
    formItems = [],
    toolbarExtra,
    onFilter,
    onAddBtnClick,
    onExport,
    setPage
  } = props

  const onSubmit = (values?: any) => {
    console.log('filter values', values);
    onFilter?.(values || form?.getFieldsValue())
  }

  const onReset = () => {
    form?.resetFields()
  }

  const onPageChange = (page: number) => {
    setPage?.(page)
  }

  return (
    <div className={styled.tablehead}>
      {title && <div className={styled.title}>{title}</div>}
      {formItems.length ? <Form form={form} className={styled.table_container} onFinish={onSubmit} onReset={onReset}>
        <Row gutter={48}>
          {formItems.map((it) => (
            <Col span={6} key={it.label}>
              <Form.Item label={it.label} name={it.name}>
                {it.component}
              </Form.Item>
            </Col>
          ))}
          <Col span={6}>
            <Form.Item>
              <Button htmlType="reset" style={{ width: 80, marginRight: 12 }}>
                重置
              </Button>
              <Button type="primary" htmlType="submit" style={{ width: 80 }}>
                提交
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form> : <></>}
      {needToolbar && <div className={styled.toolbar}>
        {toolbarExtra}
        {needExtraBtn && <Button icon={<ExportOutlined />} onClick={onExport}>导出Excel</Button>}
        {needAddBtn && <Button type="primary" icon={<PlusCircleOutlined />} onClick={onAddBtnClick}>
          新增
        </Button>}
      </div>}
      <Table columns={columns} dataSource={dataSource} className={styled.table_container} pagination={{ showSizeChanger: false, onChange: onPageChange }} />
    </div>
  )
}

export default TableFilter
