import request from '@/utils/request'
// import querystring from 'querystring'
export function getLogList(params) {
  return request({
    url: '/sys/log',
    method: 'get',
    params: params
  })
}
