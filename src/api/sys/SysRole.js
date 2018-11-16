import request from '@/utils/request'
import querystring from 'querystring'
export function getRoleList(params) {
  return request({
    url: '/sys/role/roleList',
    method: 'get',
    params: params
  })
}

export function getRoleById(id) {
  const data = {
    id
  }
  return request({
    url: '/sys/role/getRole',
    method: 'get',
    params: data
  })
}

export function saveRole(params) {
  console.log(params)
  const data = querystring.stringify(params)
  return request({
    url: '/sys/role/save',
    method: 'post',
    data
  })
}

export function delRole(id) {
  const data = querystring.stringify({
    id
  })
  return request({
    url: '/sys/role/del',
    method: 'post',
    data
  })
}
