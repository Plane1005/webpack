import React, { useEffect } from 'react'
import BMap from 'BMap'
let map: any = null
import './style.less'
import EnvironmentOutlined from '@ant-design/icons/lib/icons/EnvironmentOutlined'

type WorkTextType = {
  lng: string
  lat: string
  addressTitle: string
  addressDetail: string
}

interface mapType {
  lng: number
  lat: number
  addressTitle: string
  addressDetail: string
}

function mapInit(value: mapType) {
  const { lng, lat, addressTitle, addressDetail } = value
  let point = new BMap.Point(lng, lat)
  map = new BMap.Map('indexMap')
  map.centerAndZoom(point, 14) // 设置中心点 // 设置缩放比例
  map.enableContinuousZoom() //启用地图惯性拖拽
  let _marker = new BMap.Marker(point) // 创建标注
  map.addOverlay(_marker) // 将标注添加到地图中
  let opt = {
    width: 200, // 信息窗口宽度
    height: 50, // 信息窗口高度
    title: addressTitle, // 信息窗口标题
    message: `这里是${addressTitle}`,
  }
  let infoWindow = new BMap.InfoWindow(`地址：${addressDetail}`, opt) // 创建信息窗口对象
  _marker.addEventListener('click', function () {
    map.openInfoWindow(infoWindow, point) //开启信息窗口
  })
}

const MapShow: React.FC<WorkTextType> = (props) => {
  const { lng, lat, addressDetail, addressTitle } = props

  useEffect(() => {
    setTimeout(() => {
      mapInit({ lat: parseFloat(lat), lng: parseFloat(lng), addressTitle, addressDetail })
    }, 100)
  }, [])

  return (
    <div className="m-mapshow">
      <div className="m-title" ><EnvironmentOutlined className="u-icon" />{ addressTitle }</div>
      <div>
        <div id="indexMap" className="m-map" />
        </div>
    </div>
  )
}

export default MapShow
