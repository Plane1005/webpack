import { Button, Space } from 'antd'
import React, { ReactNode } from 'react'
import styled from './style.module.scss'

interface PropsType {
  title: ReactNode
  needAddBtn: boolean
  addBtnContent: string
  extra: ReactNode
}

export type TableHeaderPropsType = Partial<PropsType>

const TableHeader = (props: TableHeaderPropsType) => {
  const { title, needAddBtn = true, addBtnContent = '新增', extra } = props

  return (
    <div className={styled.tablehead}>
      <div className={styled.title}>{title || ''}</div>
      <Space>
        {needAddBtn && <Button>{addBtnContent}</Button>}
        {extra}
      </Space>
    </div>
  )
}

export default TableHeader
