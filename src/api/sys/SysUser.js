import request from '@/utils/request'
import querystring from 'querystring'
export function getUserList(params) {
  return request({
    url: '/sys/user/userList',
    method: 'get',
    params: params
  })
}

export function getUserById(id) {
  const data = {
    id
  }
  return request({
    url: '/sys/user/getUser',
    method: 'get',
    params: data
  })
}

export function saveUser(params) {
  params.roleList = params.roleList.join(',')
  const data = querystring.stringify(params)
  return request({
    url: '/sys/user/save',
    method: 'post',
    data
  })
}

export function delUser(id) {
  const data = querystring.stringify({
    id
  })
  return request({
    url: '/sys/user/del',
    method: 'post',
    data
  })
}
