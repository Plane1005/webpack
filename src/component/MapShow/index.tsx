import React, { useEffect } from 'react'
import BMap from 'BMap'
let map: any = null
import './style.less'

type WorkTextType = {
  lng: string,
  lat: string
}

interface mapType {
  lng: number
  lat: number
}

function mapInit(value: mapType) {
  const { lng, lat } = value
  let point = new BMap.Point(lat, lng)
  map = new BMap.Map('indexMap')
  map.centerAndZoom(point, 14) // 设置中心点 // 设置缩放比例
  map.enableContinuousZoom() //启用地图惯性拖拽
}

const MapShow: React.FC<WorkTextType> = (props) => {

  const { lng,lat } = props
  
  useEffect(() => {
    setTimeout(() => {
      mapInit({lat: parseFloat(lat),lng: parseFloat(lng)})
    }, 100)
  }, [])

  return (
    <div className="m-mapshow">
      <div id="indexMap" className="m-map" />
    </div>
  )
}

export default MapShow
