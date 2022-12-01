import { lazy } from 'react'

export const routerConfig = [
  {
    path: '/',
    name: '首页',
    component: lazy(() => import('@/page/Home'))
  }
]
