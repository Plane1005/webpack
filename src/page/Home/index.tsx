import React, { ReactNode, useEffect, useRef, useState } from 'react'
import * as echarts from 'echarts'
import geoJson from '@/assets/zj.json'
import styled from './style.module.scss'

const option = {
  title: {
    text: '染疫人员数量统计 （2022.10）',
    subtext: '数据来源于统计局',
  },
  tooltip: {
    trigger: 'item',
    formatter: '{b}数量：{c}人',
  },
  toolbox: {
    show: true,
    orient: 'vertical',
    left: 'right',
    top: 'top',
    feature: {
      dataView: { readOnly: false },
      saveAsImage: {},
    },
  },
  visualMap: {
    min: 100,
    max: 5000,
    text: ['High', 'Low'],
    realtime: false,
    calculable: true,
    inRange: {
      color: ['lightskyblue', 'yellow', 'orangered'],
    },
  },
  series: [
    {
      name: '浙江染疫人员数量',
      type: 'map',
      map: '浙江',
      label: {
        show: true,
      },
      data: [
        { name: '杭州市', value: 4800 },
        { name: '湖州市', value: 1547 },
        { name: '嘉兴市', value: 316 },
        { name: '舟山市', value: 2022 },
        { name: '绍兴市', value: 2404 },
        { name: '宁波市', value: 1068 },
        { name: '金华市', value: 3765 },
        { name: '衢州市', value: 4518 },
        { name: '丽水市', value: 55 },
        { name: '温州市', value: 2190 },
        { name: '台州市', value: 491 },
      ],
    },
  ],
}

const Home = () => {
  const chartWapper = useRef<HTMLDivElement>(null)
  const chartRef = useRef<any>(null)

  useEffect(() => {
    chartRef.current = echarts.init(chartWapper.current as HTMLDivElement)
    chartRef.current.hideLoading()
    echarts.registerMap('浙江', geoJson)
    chartRef.current.setOption(option)
  }, [])

  useEffect(() => {
    window.addEventListener('resize', () => {
      chartRef.current?.resize();
    })
    return () => {
      window.removeEventListener('resize', () => {
        chartRef.current?.resize();
      })
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      chartRef.current?.resize();
    }, 200)
  }, []);

  return (
    <div className={styled.home}>
      <div className={styled.cardWrap}>
        <div ref={chartWapper} className={styled.card} />
        <div className={styled.card}></div>
      </div>
    </div>
  )
}

export default Home
