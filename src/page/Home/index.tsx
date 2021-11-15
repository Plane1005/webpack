import React, { useEffect, useState } from 'react'
import { fetchWorkList } from '@/store/reducer/systemReducer'
import { useHistory } from 'react-router'
import { RootState, useAppDispatch } from '@/store'
import { useSelector } from 'react-redux'
import homePng from '@/assets/home.png'
import titlePng from '@/assets/title.png'
import './style.less'

const Home: React.FC = (props: any) => {
  const dispatch = useAppDispatch()
  const history = useHistory()
  const workList = useSelector((state: RootState) => state.system.workList)
  const workListCount = useSelector((state: RootState) => state.system.workListCount)
  const [pagenum, setPagenum] = useState<number>(1)

  useEffect(() => {
    dispatch(fetchWorkList({
      pagenum
    }))
  }, [pagenum])

  return (
    <div  className="g-homePng"  >
      <img src={homePng} className="m-homePng" />
      <img src={titlePng} className="m-homePng" />
    </div>
  )
}

export default Home
