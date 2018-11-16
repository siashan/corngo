import request from '@/utils/request'
import querystring from 'querystring'
export function getAreaList(params) {
  return request({
    url: '/admin/area/list',
    method: 'get',
    params: params
  })
}

export function saveArea(params) {
  console.log(params)
  const data = querystring.stringify(params)
  return request({
    url: '/admin/area/save',
    method: 'post',
    data
  })
}

export function delArea(id) {
  const data = querystring.stringify({
    id
  })
  return request({
    url: '/admin/area/del',
    method: 'post',
    data
  })
}
