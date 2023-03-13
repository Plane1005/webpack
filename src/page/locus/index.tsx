import { List, Select } from 'antd'
import React, { useEffect, useRef } from 'react'
import { Map, Marker, BMapGL } from 'react-bmapgl'

const data = [
  'Racing car sprays burning fuel into crowd.',
  'Japanese princess to wed commoner.',
  'Australian walks 100km after outback crash.',
  'Man charged over missing wedding girl.',
];

const Locus = () => {
  const ref = useRef<any>(null)
  const BMapGL = window.BMapGL
  const center = { lng: 120.02289, lat: 30.29764 }

  useEffect(() => {
    if (ref.current) {
      const driving = new BMapGL.DrivingRoute(ref.current.map, {
        renderOptions: {
          map: ref.current.map,
          autoViewport: true,
        },
      })
      const start = new BMapGL.Point(120.02599, 30.29974)
      const end = new BMapGL.Point(120.02279, 30.29754)
      driving.search(start, end)
    }
  }, [])

  return (
    <div>
      <>查看居民：<Select style={{ width: 180, marginBottom: 24 }} placeholder='请选择' /></>
      <List
      style={{ marginBottom: 24 }}
      header={<div>轨迹路线</div>}
      bordered
      dataSource={data}
      renderItem={(item) => (
        <List.Item>
          {item}
        </List.Item>
      )}
    />
      <Map center={center} zoom="17" ref={ref} style={{ height: 480 }} />
    </div>
  )
}

export default Locus
