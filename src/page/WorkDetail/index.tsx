import React, { useEffect, useState } from 'react'
import { fetchWorkList } from '@/store/reducer/systemReducer'
import { useHistory } from 'react-router'
import { RootState, useAppDispatch } from '@/store'
import { useSelector } from 'react-redux'
import { fetchWorkDetail } from '@/store/reducer/systemReducer'
import './style.less'
import { Avatar, Button, Spin } from 'antd'
import PlusOutlined from '@ant-design/icons/lib/icons/PlusOutlined'
import WorkText from './WorkText'
import MapShow from '@/component/MapShow'
import companyInfo from '@/assets/companyInfo.png'
import recommend from '@/assets/recommend.jpg'

const WorkDetail: React.FC = (props: any) => {
  let workId = props?.location?.state?.workId || null
  const dispatch = useAppDispatch()
  const history = useHistory()
  const workDetail = useSelector((state: RootState) => state.system.workDetail)
  const [isSpin, setIsSpin] = useState<boolean>(true)

  useEffect(() => {
    dispatch(
      fetchWorkDetail({
        workId: workId,
      })
    )
  }, [])

  useEffect(() => {
    if (workDetail.workDetail) {
      setIsSpin(false)
    }
  }, [workDetail])

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
            <Button type="primary" icon={<PlusOutlined />} className="u-btn">
              向Ta投递简历
            </Button>
          </div>
          <WorkText title="职位描述" content={workDetail.workDetail} />
          <WorkText title="职位要求" content={workDetail.workRequire} />
          <h3>
            工作地点
            <em />
          </h3>
          <Spin spinning={isSpin}>
            {isSpin ? (
              <div className="m-map"></div>
            ) : (
              <MapShow
                lat={workDetail.positiony}
                lng={workDetail.positionx}
                addressTitle={workDetail.addressTitle}
                addressDetail={workDetail.addressDetail}
              />
            )}
          </Spin>
        </div>
        <div className="m-right">
          <div className="m-title">岗位基本信息</div>
          <div className="m-workInfo">
            <div className="u-work">{workDetail.work}</div>
            <div className="u-salary">{workDetail.salary}/天</div>
            <div className="u-time">
              <span>{workDetail.workTime}</span>
              <span>{workDetail.workTotalTime}个月</span>
            </div>
            <div className="u-education">
              <span>{workDetail.education}</span>
              <span>招聘{workDetail.workNum}人</span>
            </div>
          </div>
          <div className="m-title">公司基本信息</div>
          <div className="m-name">
            <Avatar src={workDetail.logoUrl} shape="square" size={64} />
            <div className="u-name">{workDetail.company}</div>
          </div>
          <img src={companyInfo} alt="" className="u-info" />
        </div>
      </div>
    </div>
  )
}

export default WorkDetail
