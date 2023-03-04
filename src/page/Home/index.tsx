import React, { ReactNode, useEffect, useRef, useState } from 'react'
import * as echarts from 'echarts'
import geoJson from '@/assets/zj.json'
import styled from './style.module.scss'

const lineOption = {
  title: {
    text: '社区区块常住人员走势',
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
      data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月'],
      axisPointer: {
        type: 'shadow'
      }
    }
  ],
  yAxis: [
    {
      type: 'value',
      name: '人口数',
      min: 0,
      max: 300,
      interval: 50,
      axisLabel: {
        formatter: '{value} 人'
      }
    },
    {
      type: 'value',
      name: '增长率',
      min: -10,
      max: 10,
      interval: 5,
      axisLabel: {
        formatter: '{value} %'
      }
    }
  ],
  series: [
    {
      name: '迁出人数',
      type: 'bar',
      tooltip: {
        valueFormatter: function (value: number) {
          return value + ' 人';
        }
      },
      data: [
        20, 49, 70, 232, 256, 77, 136, 162, 36, 20, 64, 33
      ]
    },
    {
      name: '迁入人数',
      type: 'bar',
      tooltip: {
        valueFormatter: function (value: number) {
          return value + ' 人';
        }
      },
      data: [
        26, 59, 90, 24, 27, 77, 176, 182, 287, 188, 60, 23
      ]
    },
    {
      name: '增长率',
      type: 'line',
      yAxisIndex: 1,
      tooltip: {
        valueFormatter: function (value: number) {
          return value + ' %';
        }
      },
      data: [2.0, 2.2, 3.3, 4.5, 6.3, 8.2, 9.3, -3.4, -4.0, -6.5, -7.0, -6.2]
    }
  ]
};

const mapOption = {
  title: {
    text: '社区区块常住人员统计 （2022.10）',
    subtext: '数据来源于社区统计',
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
    max: 2000,
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
        { name: 'A区块', value: 1800 },
        { name: 'B区块', value: 1547 },
        { name: 'C区块', value: 900 },
        { name: 'D区块', value: 200 },
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
      <div className={styled.title}>社区常住人员数量统计大盘</div>
      <div className={styled.cardWrap}>
        <div ref={mapChartWapper} className={styled.card} />
        <div ref={lineChartWapper} className={styled.card}></div>
      </div>
    </div>
  )
}

export default Home
