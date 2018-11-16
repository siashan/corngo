import request from '@/utils/request'
import querystring from 'querystring'
export function getGoodsList(params) {
  return request({
    url: '/admin/product/goodsList',
    method: 'get',
    params: params
  })
}
// 加载商品参数信息
export function getProducts(id) {
  const data = {
    id
  }
  return request({
    url: '/admin/product/getProducts',
    method: 'get',
    params: data
  })
}
export function saveStock(params) {
  const data = querystring.stringify(params)
  return request({
    url: '/admin/product/saveStock',
    method: 'post',
    data
  })
}
