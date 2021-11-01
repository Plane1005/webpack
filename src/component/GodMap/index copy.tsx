import React, { ReactNode, useEffect, useState } from 'react'
import { Select, Input } from 'antd'
import BMap from 'BMap'
import { EnvironmentOutlined } from '@ant-design/icons'
import { truncate } from 'lodash'
import noData from '@/assets/noData.png';
let map: any = null
const Option = Select.Option
import './styles.less'

interface Props {
  value?: string //地址
  style?: any
  onChange?: (value: string) => void
  disabled?: boolean
  pointCallback?: (lng: any, lat: any) => void
  placeholderContent: any
  roomTree?: any[]
  setPickLocation: (value: any) => void
  setYid?: any
}
function mapInit() {
  map = new BMap.Map('indexMap')
  map.centerAndZoom('杭州', 11) // 设置中心点 // 设置缩放比例
  map.enableContinuousZoom() //启用地图惯性拖拽
}

export default (props: Props) => {
  const [options, setOptions] = useState([])
  const [showOpen, setshowOpen] = useState(false)
  const {
    value,
    setYid,
    onChange,
    style,
    disabled,
    pointCallback,
    placeholderContent,
    roomTree,
    setPickLocation,
  } = props

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
      style={{width:500}}
      disabled={disabled}
      value={value}
      optionLabelProp="label"
      open={showOpen}
      //   onClick={() => setshowOpen(!showOpen)}
      notFoundContent={<div style={{display:'flex',alignItems:'center',flexFlow:'column nowrap'}}>
          <img src={noData} style={{width:'80%'}} />
          <div style={{color: 'rgb(135, 145, 163)', margin: '2px 0px 20px;'}}>暂无数据</div>
          </div>}
      onChange={(val: any) => {
        setshowOpen(false)
        if (onChange) onChange(val)
        if (pointCallback) {
          const temp: any = options.find((o: any) => {
            return o.address == val
          })
          if (temp) pointCallback(temp.point.lng, temp.point.lat)
        }
      }}
      getPopupContainer={(triggerNode) => triggerNode.parentNode}
      onDropdownVisibleChange={(open) => {
        setshowOpen(!showOpen)
        if (open) setTimeout(mapInit, 100)
      }}
      dropdownRender={(menu: ReactNode) => {
        return (
          <div style={{ padding: 10 }} className={'m-select'}>
            {roomTree
              ? roomTree.map((item: any, index: number) => (
                  <div
                    key={item.id}
                    className={'localList'}
                    onClick={() => {
                      setYid(item.id)
                      setPickLocation(index)
                      setshowOpen(false)
                    }}
                  >
                    <EnvironmentOutlined /> <span className={'word'}>{item.name}</span>
                  </div>
                ))
              : ''}
            <Input
              placeholder="地址检索"
              onChange={(e) => {
                localSearch(e.target.value)
              }}
            />
            <div id="indexMap" style={{ height: 500, width: '100%', margin: '10px 0' }} />
            {menu}
          </div>
        )
      }}
      placeholder={placeholderContent}
    >
      {options.map((o: any, idx: number) => {
        return (
          <Option key={idx} label={truncate(o.title, { length: 24 })} value={o.title}  >
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
