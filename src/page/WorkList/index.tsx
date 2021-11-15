import React, { useEffect, useState } from 'react'
import { fetchWorkList } from '@/store/reducer/systemReducer'
import { useHistory } from 'react-router'
import { RootState, useAppDispatch } from '@/store'
import { useSelector } from 'react-redux'
import { Pagination } from 'antd'
import Work from '@/component/Work'
import './style.less'

const WorkList: React.FC = (props: any) => {
  const dispatch = useAppDispatch()
  const history = useHistory()
  const workList = useSelector((state: RootState) => state.system.workList)
  const workListCount = useSelector((state: RootState) => state.system.workListCount)
  const [pagenum, setPagenum] = useState<number>(1)

  useEffect(() => {
    dispatch(
      fetchWorkList({
        pagenum,
      })
    )
  }, [pagenum])

  const List = () => workList.map((value, index) => <Work key={index} workInfo={value} />)

  return (
    <div className="g-workList" >
    <div className="m-workList">
      {List()}
      </div>
      <div className="m-pagination" >
    <Pagination
    current={pagenum}
    total={workListCount}
    onChange={(e: number) => {
      setPagenum(e)
    }}
        />
        </div>
      </div>
  )
}

export default WorkList
