import request from '@/utils/request'
// import querystring from 'querystring'
// 数据字典请求
export function getDict(params) {
  const data = {
    groups: params.join(',')
  }
  return request({
    url: '/comm/dictItem',
    method: 'get',
    params: data
  })
}

export function getDictMap(params) {
  const data = {
    groups: params.join(',')
  }
  return request({
    url: '/comm/dictMap',
    method: 'get',
    params: data
  })
}
