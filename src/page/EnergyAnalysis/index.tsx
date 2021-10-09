import React, { useState, memo, useEffect, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '@/store'
import './index.less'

const energyAnalysis = (props: any) => {
  const roleListCount = useSelector((state: RootState) => state.system.roleListCount)

  return (
    <div>
      123456
      <p>{roleListCount}</p>
    </div>
  )
}

export default memo(energyAnalysis)
