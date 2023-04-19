import { getPersonList } from '@/service'
import { useRequest } from 'ahooks'
import { Button, List, Select, Timeline } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
// @ts-ignore
import { Map, Marker, BMapGL } from 'react-bmapgl'

const p1 = [
  [
    [120.013389, 30.295262],
    [120.021896, 30.298925],
  ],
  [
    [120.019084, 30.296478],
    [120.026782, 30.297016],
  ],
  [
    [120.028651, 30.299222],
    [120.018401, 30.297974],
  ],
]

const t1 = ['仓前新校区-体育场 - 晓风书屋', '一鸣真鲜奶吧 - 天猫校园店', '必胜客 - 恕园30号楼']

const p2 = [
  [
    [120.025922, 30.298719],
    [120.017945, 30.296637],
  ],
  [
    [120.014927, 30.297643],
    [120.023506, 30.296333],
  ],
  [
    [120.018664, 30.295561],
    [120.029704, 30.30073],
  ],
]

const t2 = ['勤园长廊 - 外国语学院', '弘丰中心 - 经亨颐雕像', '美食广场 - 东体育场']

const Locus = () => {
  const ref = useRef<any>(null)
  const BMapGL = window.BMapGL
  const center = { lng: 120.02289, lat: 30.29764 }
  const [index, setIndex] = useState(0)
  const [option, setOption] = useState([])
  const [value, setValue] = useState()
  const [text, setText] = useState(t1)
  const [position, setPosition] = useState(p1)
  const { loading, run } = useRequest<any, any>((params) => getPersonList(params), {
    onSuccess(res) {
      const temp = res.map((it: { name: any; mobile: any }) => ({
        label: it.name,
        value: it.mobile,
      }))
      setOption(temp)
      setValue(temp[0])
    },
  })

  useEffect(() => {
    const map = ref.current.map
    if (map) {
      map.clearOverlays()
      const drivingRoute = new BMapGL.DrivingRoute(map, {
        renderOptions: {
          map: map,
          autoViewport: true,
        },
      })
      const start1 = new BMapGL.Point(position[index][0][0], position[index][0][1])
      const end1 = new BMapGL.Point(position[index][1][0], position[index][1][1])
      drivingRoute.search(start1, end1)
    }
  }, [index, value])

  const data = [
    {
      label: '03-01 - 03-02',
      children: text[0],
      color: index === 0 ? 'green' : 'grey',
    },
    {
      label: '03-02 - 03-03',
      children: text[1],
      color: index === 1 ? 'green' : 'grey',
    },
    {
      label: '03-03 - 03-04',
      children: text[2],
      color: index === 2 ? 'green' : 'grey',
    },
  ]

  return (
    <div>
      <>
        查看居民：
        <Select
          style={{ width: 180, marginBottom: 24 }}
          placeholder="请选择"
          value={value}
          options={option}
          onChange={(value) => {
            setValue(value)
            if (text === t1) {
              setText(t2)
              setPosition(p2)
            } else {
              setText(t1)
              setPosition(p1)
            }
          }}
        />
        <Button
          type="primary"
          style={{ marginLeft: 32 }}
          onClick={() => {
            index === 2 ? setIndex(0) : setIndex(index + 1)
          }}
        >
          切换日期
        </Button>
      </>
      <Timeline mode="left" items={data} />
      <Map center={center} zoom="14" ref={ref} style={{ height: 580 }} />
    </div>
  )
}

export default Locus
