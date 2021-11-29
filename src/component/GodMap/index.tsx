import React, { ReactNode, useEffect, useState } from 'react'
import { Select, Input } from 'antd'
import BMap from 'BMap'
import { EnvironmentOutlined } from '@ant-design/icons'
import { truncate } from 'lodash'
import noData from '@/assets/noData.png'
let map: any = null
const Option = Select.Option
import './styles.less'

interface godMapType {
  setAddress: (value: any) => void
}

interface mapType {
  lng: number
  lat: number
  zoom: number
}

function mapInit(value: mapType) {
  const { lng, lat, zoom } = value
  let point = new BMap.Point(lng, lat)
  map = new BMap.Map('indexMap')
  map.centerAndZoom(point, zoom) // 设置中心点 // 设置缩放比例
  map.enableContinuousZoom() //启用地图惯性拖拽
}

export default (props: godMapType) => {
  const { setAddress } = props

  const [location, setLocation] = useState<mapType>({ lng: 120.15507, lat: 30.274084, zoom: 11 })
  const [options, setOptions] = useState([])
  const [showOpen, setshowOpen] = useState(false)
  const [marker, setMarker] = useState(null)

  useEffect(() => {
    mapInit(location)
  }, [])

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
    <div className="g-map">
      <div className="m-select">
        <div className="u-label">公司地址：</div>
        <Select
          placeholder="请选取公司地址"
          style={{ width: 500 }}
          optionLabelProp="label"
          open={showOpen}
          onSelect={(value) => {
            if (marker) {
              map.removeOverlay(marker)
            }
            let item: any = options.find((item: any) => item.uid === value)
            let point = new BMap.Point(item.point.lng, item.point.lat)
            map.centerAndZoom(point, 16)
            setLocation({ lng: item.point.lng, lat: item.point.lat, zoom: 16 })
            setAddress({
              lng: item.point.lng,
              lat: item.point.lat,
              title: item.title,
              address: item.address,
            })
            let _marker = new BMap.Marker(point) // 创建标注
            setMarker(_marker)
            map.addOverlay(_marker) // 将标注添加到地图中
            let opt = {
              width: 200, // 信息窗口宽度
              height: 50, // 信息窗口高度
              title: item.title, // 信息窗口标题
              message: `这里是${item.title}`,
            }
            let infoWindow = new BMap.InfoWindow(`地址：${item.address}`, opt) // 创建信息窗口对象
            _marker.addEventListener('click', function () {
              map.openInfoWindow(infoWindow, point) //开启信息窗口
            })
          }}
          notFoundContent={
            <div style={{ display: 'flex', alignItems: 'center', flexFlow: 'column nowrap' }}>
              <img src={noData} style={{ width: '80%' }} />
              <div style={{ color: 'rgb(135, 145, 163)', margin: '2px 0px 20px;' }}>暂无数据</div>
            </div>
          }
          getPopupContainer={(triggerNode) => triggerNode.parentNode}
          onDropdownVisibleChange={(open) => {
            setshowOpen(!showOpen)
          }}
          dropdownRender={(menu: ReactNode) => {
            return (
              <div style={{ padding: 10 }}>
                <Input
                  placeholder="地址检索"
                  onChange={(e) => {
                    localSearch(e.target.value)
                  }}
                />

                {menu}
              </div>
            )
          }}
        >
          {options.map((o: any, idx: number) => {
            return (
              <Option key={idx} label={truncate(o.title, { length: 24 })} value={o.uid}>
                <div>
                  <div
                    style={{
                      color: '#3E3E3E',
                      fontSize: 14,
                      display: 'flex',
                      alignItems: 'center',
                    }}
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
      </div>
      <div id="indexMap" className="m-map" />
    </div>
  )
}
