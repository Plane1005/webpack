import { utcToLocal } from '@/utils'
import {request} from '@/utils/request'

export const getPersonList = (params: any) => {
  return request({
    url: 'person/list',
    method: 'post',
    data: params
  }).then((res) => res.data)
}

export const addPerson = (params: any) => {
  return request({
    url: 'person/add',
    method: 'post',
    data: params
  }).then((res) => res.data)
}

export const updatePerson = (params: any) => {
  return request({
    url: 'person/update',
    method: 'post',
    data: params
  }).then((res) => res.data)
}

export const getVisitorList = (params: any) => {
  return request({
    url: 'visitor/list',
    method: 'post',
    data: params
  }).then((res) => res.data)
}

export const addVisitor = (params: any) => {
  if (params.banTime) params.banTime = utcToLocal(params.banTime)
  return request({
    url: 'visitor/add',
    method: 'post',
    data: params
  }).then((res) => res.data)
}

export const updateVisitor = (params: any) => {
  if (params.banTime) params.banTime = utcToLocal(params.banTime)
  return request({
    url: 'visitor/update',
    method: 'post',
    data: params
  }).then((res) => res.data)
}

export const deleteVisitor = (params: any) => {
  return request({
    url: 'visitor/delete',
    method: 'post',
    data: params
  }).then((res) => res.data)
}

export const getNoticeList = (params: any) => {
  return request({
    url: 'notice/list',
    method: 'post',
    data: params
  }).then((res) => res.data)
}

export const addNotice = (params: any) => {
  return request({
    url: 'notice/add',
    method: 'post',
    data: params
  }).then((res) => res.data)
}

export const updateNotice = (params: any) => {
  return request({
    url: 'notice/update',
    method: 'post',
    data: params
  }).then((res) => res.data)
}

export const getAccountList = (params: any) => {
  return request({
    url: 'account/list',
    method: 'post',
    data: params
  }).then((res) => res.data)
}

export const addAccount = (params: any) => {
  if (params.banTime) params.banTime = utcToLocal(params.banTime)
  return request({
    url: 'account/add',
    method: 'post',
    data: params
  }).then((res) => res.data)
}

export const updateAccount = (params: any) => {
  return request({
    url: 'account/update',
    method: 'post',
    data: params
  }).then((res) => res.data)
}

export const deleteAccount = (params: any) => {
  return request({
    url: 'account/delete',
    method: 'post',
    data: params
  }).then((res) => res.data)
}