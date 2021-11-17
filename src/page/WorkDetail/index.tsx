import React, { useEffect, useState } from 'react'
import { fetchWorkList } from '@/store/reducer/systemReducer'
import { useHistory } from 'react-router'
import { RootState, useAppDispatch } from '@/store'
import { useSelector } from 'react-redux'
import { fetchWorkDetail } from '@/store/reducer/systemReducer'
import './style.less'
import { Avatar, Button } from 'antd'
import PlusOutlined from '@ant-design/icons/lib/icons/PlusOutlined'

const WorkDetail: React.FC = (props: any) => {
  let workId = props?.location?.state?.workId || null
  const dispatch = useAppDispatch()
  const history = useHistory()
  const workDetail = useSelector((state: RootState) => state.system.workDetail)

  useEffect(() => {
    dispatch(
      fetchWorkDetail({
        workId: workId,
      })
    )
  }, [])

  return (
    <div className="g-workDetail">
      <div className="m-workDetail">
        <div className="m-left">
          <div className="m-hrDetail">
            <Avatar src={workDetail.hrAvatar} size={60} />
            <div className="m-hrInfo">
              <div className="u-name">{workDetail.hrName}</div>
              <div className="u-info">
                招聘 <em className="vdot">·</em> 刚刚活跃
              </div>
            </div>
            <Button type="primary" icon={<PlusOutlined />} className="u-btn" >向Ta投递简历</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WorkDetail
