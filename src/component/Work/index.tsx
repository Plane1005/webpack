import React, { CSSProperties, useState } from 'react'
import { message, Upload } from 'antd'
import PictureOutlined from '@ant-design/icons/lib/icons/PictureOutlined'
import { chkToken } from '@/utils'
import { useAppDispatch } from '@/store'
import './style.less'
import { useHistory } from 'react-router'

interface workInfoType{
  addressTitle: string,
  company: string,
  date: string,
  education: string,
  logoUrl: string,
  salary: string,
  work: string,
  workDay: string,
  workId: string,
  workTotalTime: string,
  workTime: string,
  workNum: string
}

interface WorkType {
  workInfo: workInfoType
}

const Work: React.FC<WorkType> = (props) => {
  const { addressTitle,company,date,education,logoUrl,salary,work,workDay,workId,workTotalTime,workTime,workNum } = props.workInfo
  const [maskVisble, setMaskVisble] = useState(false)
  const dispatch = useAppDispatch()
  const history = useHistory()

  const handleClick = (value: any) => {
    history.push({pathname:"/workdetail",state:{workId}})
  }

  return (
    <div
      className="g-workComponent"
      onClick={handleClick}
    >
      <div className="m-workInfo" >
        <div className="m-title" >
          {work}
        </div>
        <div className="m-salary" >
          {salary}元/天
        </div>
        <div className="m-workTime" >
          <span>{workTime}</span>
          <span>{workDay}</span>
          <span>{workTotalTime}月</span>
        </div>
        <div className="m-workRequest" >
          <span>{education}</span>
          <span>招聘{workNum}人</span>
        </div>
      </div>
      <div className="m-companyInfo" >
        <div className="m-logo" >
          <img src={logoUrl} className="u-logo" />
        </div>
        <div className="m-companyName" >
          {company}
        </div>
        {/* <div className="m-companyAddress" >
          地点：{addressTitle}
        </div>
        <div className="m-peopleName" >
          联系人：jet
        </div> */}
      </div>
    </div>
  )
}

export default Work
