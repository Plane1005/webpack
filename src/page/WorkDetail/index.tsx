import React, { useEffect, useState } from 'react'
import { fetchWorkList } from '@/store/reducer/systemReducer'
import { useHistory } from 'react-router'
import { RootState, useAppDispatch } from '@/store'
import { useSelector } from 'react-redux'
import { fetchWorkDetail } from '@/store/reducer/systemReducer'
import './style.less'

const WorkDetail: React.FC = (props: any) => {
  let workId = props?.location?.state?.workId || null
  const dispatch = useAppDispatch()
  const history = useHistory()
  const workDetail = useSelector((state: RootState) => state.system.workDetail)

  useEffect(() => {
    dispatch(
      fetchWorkDetail({
        workId: workId
      })
    )
  }, [])

  return (<div className="g-workList">
    123
  </div>)
}

export default WorkDetail
