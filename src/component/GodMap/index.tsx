import React, { ReactNode, useEffect, useState } from 'react'
import { Select, Input } from 'antd'
import BMap from 'BMap'
import { EnvironmentOutlined } from '@ant-design/icons'
import { truncate } from 'lodash'
import noData from '@/assets/noData.png'
let map: any = null
const Option = Select.Option
import './styles.less'

function mapInit() {
  map = new BMap.Map('indexMap')
  map.centerAndZoom('杭州', 11) // 设置中心点 // 设置缩放比例
  map.enableContinuousZoom() //启用地图惯性拖拽
}

export default (props: any) => {
  const [options, setOptions] = useState([])
  const [showOpen, setshowOpen] = useState(false)

  useEffect(() => {
    if (options.length && showOpen) {
      const points = options.map((o: any) => {
        return o.point
      }) //坐标点,用于计算中心点和缩放比例
      const view = map.getViewport(points) // 获取所有坐标中心点以及缩放比例
      map.centerAndZoom(view.center, view.zoom) // 设置中心点 // 设置缩放比例
    }
  }, [options])
  let timer: any = null
  const localSearch = (str: string) => {
    if (timer) clearTimeout(timer) //节流
    timer = setTimeout(() => {
      if (showOpen) {
        const options = {
          onSearchComplete: function (results: any) {
            if (local.getStatus() == 0) {
              // 判断状态是否正确
              const s: any = []
              for (let i = 0; i < results.getCurrentNumPois(); i++) s.push(results.getPoi(i))
              if (s.length) setOptions(s)
            }
          },
        }
        const local = new BMap.LocalSearch(map, options)
        local.search(str)
      }
    }, 1000)
  }
  return (
    <Select
      style={{ width: 500 }}
      optionLabelProp="label"
      open={showOpen}
      onSelect={(value) => {
        let item: any = options.find((item: any) => item.uid === value)
        let point = new BMap.Point(item.point.lng, item.point.lat)
        map.centerAndZoom(point,15)
      }}
      notFoundContent={
        <div style={{ display: 'flex', alignItems: 'center', flexFlow: 'column nowrap' }}>
          <img src={noData} style={{ width: '80%' }} />
          <div style={{ color: 'rgb(135, 145, 163)', margin: '2px 0px 20px;' }}>暂无数据</div>
        </div>
      }
      getPopupContainer={(triggerNode) => triggerNode.parentNode}
      onDropdownVisibleChange={(open) => {
        console.log(open);
        setshowOpen(!showOpen)
        if (open) setTimeout(mapInit, 100)
      }}
      dropdownRender={(menu: ReactNode) => {
        return (
          <div style={{ padding: 10 }} className={'m-select'}>
            <Input
              placeholder="地址检索"
              onChange={(e) => {
                localSearch(e.target.value)
              }}
            />
            <div id="indexMap" style={{ height: 400, width: '100%', margin: '10px 0' }} />
            {menu}
          </div>
        )
      }}
    >
      {options.map((o: any, idx: number) => {
        return (
          <Option key={idx} label={truncate(o.title, { length: 24 })} value={o.uid} >
            <div>
              <div
                style={{ color: '#3E3E3E', fontSize: 14, display: 'flex', alignItems: 'center' }}
              >
                <EnvironmentOutlined />
                <span>{o.title}</span>
              </div>
              <div style={{ color: '#A8A8A8', fontSize: 12 }}>{o.address}</div>
            </div>
          </Option>
        )
      })}
    </Select>
  )
}
