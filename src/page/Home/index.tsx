import React, { ReactNode, useEffect, useState } from 'react'
import { useAppDispatch } from '@/store'
import styled from './style.module.scss'

const Home = () => {
  const dispatch = useAppDispatch()

  return (
    <div className={styled.home}>
      Home
    </div>
  )
}

export default Home
