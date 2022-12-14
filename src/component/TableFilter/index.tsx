import React, { ReactNode } from 'react'
import TableHeader, { TableHeaderPropsType } from '../TableHeader'
import styled from './style.module.scss'

export interface TableFilterPropsType {
  headConfig?: TableHeaderPropsType
  needHead?: boolean
}

const TableFilter = (props: TableFilterPropsType) => {

  const { headConfig = {}, needHead } = props

  return (
    <div className={styled.tablefilter}>
      {needHead && <TableHeader {...headConfig}/>}
    </div>
  )
}

export default TableFilter
