import React, { useEffect, useState } from 'react'
import { useAppDispatch } from '@/store'
import styled from './style.module.scss'

const Home: React.FC = () => {
  const dispatch = useAppDispatch()
  const [pagenum, setPagenum] = useState<number>(1) 
  
  return (
    <div className={styled.home}>
      123
    </div>
  )
}

export default Home
