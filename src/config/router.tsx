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
    path: '/person',
    name: '常住人员管理',
    element: lazy(() => import('@/page/person-list'))
  },
  {
    path: '/inout',
    name: '限行人员管理',
    element: lazy(() => import('@/page/inout-auth'))
  },
  {
    path: '/notification',
    name: '通知公告管理',
    element: lazy(() => import('@/page/notification'))
  },
  {
    path: '/mark',
    name: '通知编辑',
    element: lazy(() => import('@/page/notification/mark'))
  },
  {
    path: '/account',
    name: '通知编辑',
    element: lazy(() => import('@/page/account-auth'))
  }
]
