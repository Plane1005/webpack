import React from 'react'
import './style.less'

type WorkTextType = {
  title: string,
  content: string
}

const WorkText: React.FC<WorkTextType> = (props) => {

  const { title,content } = props

  return (
    <div className="m-detail">
      <h3>
        {title}
        <em />
      </h3>
      <div className="textContent">{content}</div>
    </div>
  )
}

export default WorkText
