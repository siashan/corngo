import request from '@/utils/request'
import querystring from 'querystring'
export function getDictList(params) {
  return request({
    url: '/sys/dict/dictList',
    method: 'get',
    params: params
  })
}

export function saveDict(params) {
  const data = querystring.stringify(params)
  return request({
    url: '/sys/dict/save',
    method: 'post',
    data
  })
}

export function delDict(id) {
  const data = querystring.stringify({
    id
  })
  return request({
    url: '/sys/dict/del',
    method: 'post',
    data
  })
}
