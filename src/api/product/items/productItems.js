import request from '@/utils/request'
import querystring from 'querystring'
export function getItemsList(params) {
  return request({
    url: '/admin/productItem/list',
    method: 'get',
    params: params
  })
}

export function saveItems(params) {
  const data = querystring.stringify(params)
  return request({
    url: '/admin/productItem/save',
    method: 'post',
    data
  })
}

export function getItemsById(id) {
  const data = {
    id
  }
  return request({
    url: '/admin/productItem/getItem',
    method: 'get',
    params: data
  })
}

export function getChild(id, usefor) {
  const data = {
    id,
    usefor
  }
  return request({
    url: '/admin/productItem/getChild',
    method: 'get',
    params: data
  })
}

