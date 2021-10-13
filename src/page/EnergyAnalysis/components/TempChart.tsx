import React, { useState, memo, useEffect, useCallback } from 'react'
import ReactDom from 'react-dom'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import './index.less'

interface tempChartProps {}

const TempChart = (props: tempChartProps) => {
  const options: Highcharts.Options = {
    title: {
      text: '温度参数分布',
    },
    chart: {
      type: 'column',
    },
    subtitle: {
      text: '数据来源: WorldClimate.com',
    },
    series: [
      {
        type: 'column',
        data: [1, 2, 3],
      },
    ],
    yAxis: {
      min: 0,
      title: {
        text: '降雨量 (mm)',
      },
    },
    xAxis: {
      categories: [
        '一月',
        '二月',
        '三月',
        '四月',
        '五月',
        '六月',
        '七月',
        '八月',
        '九月',
        '十月',
        '十一月',
        '十二月',
      ],
      crosshair: true,
    },
    plotOptions: {
      column: {
        borderWidth: 0,
      },
    },
    tooltip: {
      // head + 每个 point + footer 拼接成完整的 table
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat:
        '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
      footerFormat: '</table>',
      shared: true,
      useHTML: true,
    },
  }

  const Chart = (props: HighchartsReact.Props) => (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} {...props} />
    </div>
  )

  return <Chart />
}

export default memo(TempChart)
