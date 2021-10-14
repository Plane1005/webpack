import React, { useState, memo, useEffect, useCallback } from 'react'
import ReactDom from 'react-dom'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import './index.less'
import moment from 'moment'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '@/store'
import { fetchTempChart } from '@/store/reducer/systemReducer'
import { setDate, objNotEmpty } from '@/utils'

interface tempChartProps {
  param: any
}

const TempChart = (props: tempChartProps) => {
  const dispatch = useAppDispatch()
  const { param } = props
  const tempChartTemp = useSelector((state: RootState) => state.system.tempChartTemp)
  const tempChartHour = useSelector((state: RootState) => state.system.tempChartHour)
  const [values, setValues] = useState<any>({})
  const [subtitle, setSubtitle] = useState<string>('')
  const [mintemp, setMintemp] = useState<number>(0)

  // useEffect(() => {
  //   setValues(param.getFieldsValue())
  // }, [param])

  useEffect(() => {
    console.log(param)

    if (objNotEmpty(param)) {
      dispatch(
        fetchTempChart({
          beginTime: setDate(moment(param.date[0]._d).format('YYYY-MM-DD')),
          endTime: setDate(moment(param.date[1]._d).format('YYYY-MM-DD')),
          ...param,
        })
      ).then(() => {
        setSubtitle(
          `${moment(param?.date[0]?._d)?.format('MM-DD')} ~ ${moment(param?.date[1]?._d)?.format(
            'MM-DD'
          )} 温度>${param.temp}`
        )
        setMintemp(parseInt(param.temp) - 1)
      })
    }
  }, [param])

  const options: Highcharts.Options = {
    title: {
      text: '温度参数分布',
    },
    chart: {
      type: 'column',
    },
    subtitle: {
      text: subtitle,
    },
    series: [
      {
        name: '温度分段',
        type: 'column',
        data: tempChartTemp,
      },
    ],
    yAxis: {
      min: mintemp,
      title: {
        text: '温度(℃)',
      },
      tickInterval: 1,
    },
    xAxis: {
      categories: tempChartHour,
      crosshair: true,
      title: {
        text: '小时数(hour)',
      },
    },
    plotOptions: {
      column: {
        borderWidth: 0,
      },
    },
    tooltip: {
      // head + 每个 point + footer 拼接成完整的 table
      headerFormat: '<span style="font-size:10px">累计{point.key}小时</span><table>',
      pointFormat:
        '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y:.1f}℃</b></td></tr>',
      footerFormat: '</table>',
      shared: true,
      useHTML: true,
    },
    credits: {
      enabled: false,
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
