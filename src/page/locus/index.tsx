import React, { useEffect, useRef } from 'react'
import { Map, Marker, BMapGL } from 'react-bmapgl'

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
      <Map center={center} zoom="17" ref={ref} style={{ height: 480 }} />
    </div>
  )
}

export default Locus
