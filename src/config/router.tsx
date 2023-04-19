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
    auth: 'Person',
    name: '常住人员管理',
    element: lazy(() => import('@/page/person-list'))
  },
  {
    path: '/inout',
    auth: 'Inout',
    name: '限行人员管理',
    element: lazy(() => import('@/page/inout-auth'))
  },
  {
    path: '/notification',
    auth: 'Notification',
    name: '通知公告管理',
    element: lazy(() => import('@/page/notification'))
  },
  {
    path: '/mark',
    auth: 'Notification',
    name: '通知编辑',
    element: lazy(() => import('@/page/notification/mark'))
  },
  {
    path: '/account',
    auth: 'Account',
    name: '通知编辑',
    element: lazy(() => import('@/page/account-auth'))
  },
  {
    path: '/locus',
    auth: 'Locus',
    name: '轨迹查询',
    element: lazy(() => import('@/page/locus'))
  }
]
