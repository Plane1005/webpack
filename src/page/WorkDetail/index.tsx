import React, { useEffect, useState } from 'react'
import { fetchWorkList } from '@/store/reducer/systemReducer'
import { useHistory } from 'react-router'
import { RootState, useAppDispatch } from '@/store'
import { useSelector } from 'react-redux'
import { Pagination } from 'antd'
import Work from '@/component/Work'
import './style.less'

const WorkDetail: React.FC = (props: any) => {
  const { id } = props.location.state
  const dispatch = useAppDispatch()
  const history = useHistory()
  const workList = useSelector((state: RootState) => state.system.workList)
  const [pagenum, setPagenum] = useState<number>(1)

  useEffect(() => {
    console.log(id);
  }, [])


  return (
    <div className="g-workList">
      workdetail
    </div>
  )
}

export default WorkDetail
