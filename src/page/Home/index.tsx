import React, { ReactNode, useEffect, useRef, useState } from 'react'
import * as echarts from 'echarts'
import styled from './style.module.scss'

const option = {
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [150, 230, 224, 218, 135, 147, 260],
      type: 'line'
    }
  ]
};


const Home = () => {
  const chartWapper = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const chartRef = echarts.init(chartWapper.current as HTMLDivElement)
    chartRef.setOption(option)
  }, [])

  return (
    <div className={styled.home}>
      <div ref={chartWapper} style={{ width: 500, height: 400 }} />
    </div>
  )
}

export default Home
