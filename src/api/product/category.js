import request from '@/utils/request'
import querystring from 'querystring'
export function getCatList(params) {
  return request({
    url: '/admin/category/list',
    method: 'get',
    params: params
  })
}

export function saveCat(params) {
  console.log(params)
  const data = querystring.stringify(params)
  return request({
    url: '/admin/category/save',
    method: 'post',
    data
  })
}

export function delCat(id) {
  const data = querystring.stringify({
    id
  })
  return request({
    url: '/admin/category/del',
    method: 'post',
    data
  })
}

export function getCatPropsList(params) {
  return request({
    url: '/admin/category/loadProps',
    method: 'get',
    params: params
  })
}
export function saveCatProps(params) {
  const data = querystring.stringify(params)
  return request({
    url: '/admin/category/saveCatProp',
    method: 'post',
    data
  })
}

export function delCatProps(id) {
  const data = querystring.stringify({
    id
  })
  return request({
    url: '/admin/category/delCatProp',
    method: 'post',
    data
  })
}

export function getCatParamsList(params) {
  return request({
    url: '/admin/category/loadParams',
    method: 'get',
    params: params
  })
}

export function getCatParamsValList(params) {
  return request({
    url: '/admin/category/loadParamsVal',
    method: 'get',
    params: params
  })
}

export function saveCatParam(params) {
  const data = querystring.stringify(params)
  return request({
    url: '/admin/category/saveCatParam',
    method: 'post',
    data
  })
}

export function delCatParam(id) {
  const data = querystring.stringify({
    id
  })
  return request({
    url: '/admin/category/delCatParam',
    method: 'post',
    data
  })
}
