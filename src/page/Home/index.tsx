import React, { useEffect, useState } from 'react'
import { useAppDispatch } from '@/store'
import styled from './style.module.scss'

const Home: React.FC = () => {
  const dispatch = useAppDispatch()
  const [userName,setUserName] = useState('')
  const [password,setPassword] = useState('')
  
  const onOk = () => {
    alert(`${userName} + ${password}`)
  }

  return (
    <div className={styled.home}>
      <input onChange={(e) => {
        setUserName(e.target.value)
      }}></input>
      <input type='password' onChange={(e) => {
        setPassword(e.target.value)
      }}></input>
      <button onClick={onOk}>确定</button>
    </div>
  )
}

export default Home
