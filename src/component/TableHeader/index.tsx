import { IFilterForm } from '@/types'
import { Button, Col, Form, FormInstance, Row, Space, Table } from 'antd'
import { PlusCircleOutlined, ExportOutlined } from '@ant-design/icons'
import React, { ReactNode } from 'react'
import XLSX, { utils, write, WritingOptions } from 'xlsx'
import { saveAs } from 'file-saver'
import styled from './style.module.scss'

interface PropsType {
  title: string
  form: FormInstance<any>
  needToolbar: boolean
  needAddBtn: boolean
  needExtraBtn: boolean
  loading: boolean
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

// 将二进制字符串转换为8位无符号整数数组（Uint8Array）
function s2ab(s: string): ArrayBuffer {
  var buf: ArrayBuffer = new ArrayBuffer(s.length)
  var view = new Uint8Array(buf)
  for (var i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff
  return buf
}

const TableFilter = (props: TableFilterPropsType) => {
  const {
    form,
    loading = false,
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
    setPage,
  } = props

  const exportFile = () => {
    // 将antd的列定义转换为xlsx需要的格式
    const exportColumns = columns.map((col: { title: string }) => col.title === '操作' ? '' : col.title as string)
    // 将antd的数据转换为xlsx需要的格式，同时处理枚举值和标签值
    const exportData = dataSource.map((item: { [x: string]: any }) => {
      // 定义一个空数组来存储每一行的数据
      let row = []
      // 遍历每一列，根据dataIndex获取对应的值，并添加到数组中
      for (let col of columns) {
        if (col.key === 'action') break;
        let value = item[col.dataIndex];
        if (col.render) {
          value = col.render(value)
          if (typeof value === 'object') value = value?.props.children;
        }
        row.push(value)
      }
      return row
    })
    // 定义一个标题数组
    const title = ['这是一个导出的excel文件']
    // 创建一个工作簿对象和一个工作表对象
    const workbook = utils.book_new()
    const worksheet = utils.aoa_to_sheet([exportColumns, ...exportData])
    // 将工作表添加到工作簿中，并命名为sheet1
    utils.book_append_sheet(workbook, worksheet, 'sheet1')
    // 定义导出文件名为table.xlsx，并设置文件类型为二进制字符串（bstr）
    const filename = 'table.xlsx'
    const writeOptions: WritingOptions = { type: 'binary', bookType: 'xlsx' }
    saveAs(new Blob([s2ab(write(workbook, writeOptions))], { type: '' }), filename)
  }

  const onSubmit = (values?: any) => {
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
      {formItems.length ? (
        <Form form={form} className={styled.table_container} onFinish={onSubmit} onReset={onReset}>
          <Row gutter={48}>
            {formItems.map(
              (it) =>
                !it?.hiddenFilter && (
                  <Col span={it.span || 6} key={it.label}>
                    <Form.Item label={it.label} name={it.name}>
                      {it.filterCom || it.component}
                    </Form.Item>
                  </Col>
                )
            )}
            <Col span={6}>
              <Form.Item>
                <Button htmlType="reset" style={{ width: 80, marginRight: 12 }}>
                  重置
                </Button>
                <Button type="primary" htmlType="submit" style={{ width: 80 }} loading={loading}>
                  提交
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      ) : (
        <></>
      )}
      {needToolbar && (
        <div className={styled.toolbar}>
          {toolbarExtra}
          {needExtraBtn && (
            <Button icon={<ExportOutlined />} onClick={exportFile}>
              导出Excel
            </Button>
          )}
          {needAddBtn && (
            <Button type="primary" icon={<PlusCircleOutlined />} onClick={onAddBtnClick}>
              新增
            </Button>
          )}
        </div>
      )}
      <Table
        columns={columns}
        dataSource={dataSource}
        className={styled.table_container}
        pagination={{ showSizeChanger: false }}
        loading={loading}
      />
    </div>
  )
}

export default TableFilter
