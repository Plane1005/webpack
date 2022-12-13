import React, { lazy } from 'react'
import Layout from '../main/Layout'
import Home from '@/page/home'
import PersonList from '@/page/person-list'

export const routerConfig = [
  {
    path: '/',
    name: '首页',
    element: Home
  },
  {
    path: '/person/list',
    name: '染疫人员管理',
    element: lazy(() => import('@/page/person-list'))
  }
]
