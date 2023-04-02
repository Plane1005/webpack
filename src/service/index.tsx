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