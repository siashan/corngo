import request from '@/utils/request'
import querystring from 'querystring'
export function getGoodsList(params) {
  return request({
    url: '/admin/goods/list',
    method: 'get',
    params: params
  })
}
// 加载类目
export function loadCat() {
  return request({
    url: '/admin/goods/loadCat',
    method: 'get'
  })
}
// 加载类目-品牌
export function loadBrand(id) {
  const data = {
    id
  }
  return request({
    url: '/admin/goods/loadBrand',
    method: 'get',
    params: data
  })
}
// 加载商品基本信息
export function getGoods(id) {
  const data = {
    id
  }
  return request({
    url: '/admin/goods/getGoods',
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
export function saveBasic(params) {
  const data = querystring.stringify(params)
  return request({
    url: '/admin/goods/saveBasic',
    method: 'post',
    data
  })
}

export function saveGoodsImg(params) {
  const data = querystring.stringify(params)
  return request({
    url: '/admin/goods/saveGoodsImg',
    method: 'post',
    data
  })
}

// 加载商品图片信息
export function getGoodsImg(id) {
  const data = {
    id
  }
  return request({
    url: '/admin/goods/getGoodsImg',
    method: 'get',
    params: data
  })
}
// 加载商品参数信息
export function getGoodsProps(id) {
  const data = {
    id
  }
  return request({
    url: '/admin/goods/getGoodsProps',
    method: 'get',
    params: data
  })
}
// 保存商品属性信息
export function saveGoodProps(params) {
  const data = querystring.stringify(params)
  return request({
    url: '/admin/goods/saveGoodProps',
    method: 'post',
    data
  })
}

// 加载商品规格信息
export function getGoodsSpec(id) {
  const data = {
    id
  }
  return request({
    url: '/admin/goods/getGoodsSpec',
    method: 'get',
    params: data
  })
}
// 保存商品规格信息
export function saveGoodsSpec(params) {
  const data = querystring.stringify(params)
  return request({
    url: '/admin/goods/saveGoodsSpec',
    method: 'post',
    data
  })
}

export function save(params) {
  const data = querystring.stringify(params)
  return request({
    url: '/admin/goods/save',
    method: 'post',
    data
  })
}
