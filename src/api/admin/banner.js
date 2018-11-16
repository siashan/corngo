import request from '@/utils/request'
import querystring from 'querystring'
export function getBannerList(params) {
  return request({
    url: '/admin/banner/bannerList',
    method: 'get',
    params: params
  })
}

export function saveBanner(params) {
  console.log(params)
  const data = querystring.stringify(params)
  return request({
    url: '/admin/banner/save',
    method: 'post',
    data
  })
}

export function delBanner(id) {
  const data = querystring.stringify({
    id
  })
  return request({
    url: '/admin/banner/del',
    method: 'post',
    data
  })
}
