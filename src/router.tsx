import { lazy } from 'react'

export const routerConfig = [
  {
    path: '/',
    name: '首页',
    component: lazy(() => import('@/page/Home'))
  },{
    path: '/worklist',
    name: '内推列表',
    component: lazy(() => import('@/page/WorkList'))
  },{
    path: '/usercenter',
    name: '个人中心',
    component: lazy(() => import('@/page/UserCenter'))
  },{
    path: '/mymessage',
    name: '消息中心',
    component: lazy(() => import('@/page/MyMessage'))
  },{
    path: '/addwork',
    name: '添加内推',
    component: lazy(() => import('@/page/WorkInfo'))
  },{
    path: '/workdetail',
    name: '内推详情',
    component: lazy(() => import('@/page/WorkDetail'))
  },
]
