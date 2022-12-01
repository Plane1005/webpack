import React, { useEffect, useState } from 'react'
import { fetchWorkList } from '@/store/reducer/systemReducer'
import { useAppDispatch } from '@/store'

const Home: React.FC = () => {
  const dispatch = useAppDispatch()
  const [pagenum, setPagenum] = useState<number>(1)

  useEffect(() => {
    dispatch(fetchWorkList({
      pagenum
    }))
  }, [pagenum])

  return (
    <div  className="g-homePng"  >
      123
    </div>
  )
}

export default Home
