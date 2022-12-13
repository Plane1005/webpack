import React, { ReactNode, useEffect, useRef, useState } from 'react'
import * as echarts from 'echarts'
import geoJson from '@/assets/zj.json'
import styled from './style.module.scss'

const lineOption = {
  title: {
    text: '杭州市染疫人员数量一周走势 （2022.10.10 - 2022.10.16）',
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      crossStyle: {
        color: '#999'
      }
    }
  },
  toolbox: {
    showTitle: false,
    feature: {
      dataView: { show: true, readOnly: false },
      magicType: { show: true, type: ['line', 'bar'] },
      saveAsImage: { show: true }
    }
  },
  grid: {
    top: 100, 
    bottom: 40
  },
  legend: {
    top: 40,
    data: ['Evaporation', 'Precipitation', 'Temperature']
  },
  xAxis: [
    {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      axisPointer: {
        type: 'shadow'
      }
    }
  ],
  yAxis: [
    {
      type: 'value',
      name: 'Precipitation',
      min: 0,
      max: 250,
      interval: 50,
      axisLabel: {
        formatter: '{value} ml'
      }
    },
    {
      type: 'value',
      name: 'Temperature',
      min: 0,
      max: 25,
      interval: 5,
      axisLabel: {
        formatter: '{value} °C'
      }
    }
  ],
  series: [
    {
      name: 'Evaporation',
      type: 'bar',
      tooltip: {
        valueFormatter: function (value: number) {
          return value + ' ml';
        }
      },
      data: [
        2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3
      ]
    },
    {
      name: 'Precipitation',
      type: 'bar',
      tooltip: {
        valueFormatter: function (value: number) {
          return value + ' ml';
        }
      },
      data: [
        2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3
      ]
    },
    {
      name: 'Temperature',
      type: 'line',
      yAxisIndex: 1,
      tooltip: {
        valueFormatter: function (value: number) {
          return value + ' °C';
        }
      },
      data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
    }
  ]
};

const mapOption = {
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
      color: ['lightgreen', 'yellow', 'orangered'],
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
  const mapChartWapper = useRef<HTMLDivElement>(null)
  const mapChartRef = useRef<any>(null)
  const lineChartWapper = useRef<HTMLDivElement>(null)
  const lineChartRef = useRef<any>(null)

  useEffect(() => {
    mapChartRef.current = echarts.init(mapChartWapper.current as HTMLDivElement)
    mapChartRef.current.hideLoading()
    echarts.registerMap('浙江', geoJson)
    mapChartRef.current.setOption(mapOption)
    lineChartRef.current = echarts.init(lineChartWapper.current as HTMLDivElement)
    lineChartRef.current.setOption(lineOption)
  }, [])

  useEffect(() => {
    window.addEventListener('resize', () => {
      mapChartRef.current?.resize();
      lineChartRef.current?.resize();
    })
    return () => {
      window.removeEventListener('resize', () => {
        mapChartRef.current?.resize();
        lineChartRef.current?.resize();
      })
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      mapChartRef.current?.resize();
      lineChartRef.current?.resize();
    }, 200)
  }, []);

  return (
    <div className={styled.home}>
      <div className={styled.title}>浙江省染疫人员数量统计大盘</div>
      <div className={styled.cardWrap}>
        <div ref={mapChartWapper} className={styled.card} />
        <div ref={lineChartWapper} className={styled.card}></div>
      </div>
    </div>
  )
}

export default Home
