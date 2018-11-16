import request from '@/utils/request'
import querystring from 'querystring'
export function getSpecList(params) {
  return request({
    url: '/admin/spec/list',
    method: 'get',
    params: params
  })
}

export function saveSpec(params) {
  const data = querystring.stringify(params)
  return request({
    url: '/admin/spec/save',
    method: 'post',
    data
  })
}

export function getBrandById(id) {
  const data = {
    id
  }
  return request({
    url: '/admin/brand/getBrand',
    method: 'get',
    params: data
  })
}

export function delSpec(id) {
  const data = {
    id
  }
  return request({
    url: '/admin/spec/del',
    method: 'post',
    params: data
  })
}
export function loadSpecValues(id) {
  const data = {
    id
  }
  return request({
    url: '/admin/spec/listValue',
    method: 'post',
    params: data
  })
}
export function saveSpecValue(params) {
  const data = querystring.stringify(params)
  return request({
    url: '/admin/spec/saveValue',
    method: 'post',
    data
  })
}
export function delSpecValue(id) {
  const data = {
    id
  }
  return request({
    url: '/admin/spec/delValue',
    method: 'post',
    params: data
  })
}
export function loadCatSpec(id) {
  const data = {
    id
  }
  return request({
    url: '/admin/category/loadSpecs',
    method: 'post',
    params: data
  })
}
export function saveCatSpec(params) {
  const data = querystring.stringify(params)
  return request({
    url: '/admin/category/saveCatSpec',
    method: 'post',
    data
  })
}

