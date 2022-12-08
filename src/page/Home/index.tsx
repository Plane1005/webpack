import React, { useEffect, useState } from 'react'
import { useAppDispatch } from '@/store'
import styled from './style.module.scss'

const Home: React.FC = () => {
  const dispatch = useAppDispatch()

  return (
    <div className={styled.home}>
      Home
    </div>
  )
}

export default Home
