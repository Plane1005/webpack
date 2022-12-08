import React, { lazy } from 'react'
import Layout from '../main/Layout'

export const routerConfig = [
  {
    path: '/',
    name: '首页',
    component: lazy(() => import('@/page/Home'))
  }
]
