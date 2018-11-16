import request from '@/utils/request'
import querystring from 'querystring'
export function getBrandList(params) {
  return request({
    url: '/admin/brand/list',
    method: 'get',
    params: params
  })
}

export function saveBrand(params) {
  const data = querystring.stringify(params)
  return request({
    url: '/admin/brand/save',
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

export function delBrand(id) {
  const data = {
    id
  }
  return request({
    url: '/admin/brand/del',
    method: 'post',
    params: data
  })
}
export function loadCatBrand(id) {
  const data = {
    id
  }
  return request({
    url: '/admin/category/loadBrands',
    method: 'post',
    params: data
  })
}
export function saveCatBrand(params) {
  const data = querystring.stringify(params)
  return request({
    url: '/admin/category/saveCatBrand',
    method: 'post',
    data
  })
}
