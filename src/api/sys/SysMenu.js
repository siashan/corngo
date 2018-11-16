import request from '@/utils/request'
import querystring from 'querystring'
export function getMenuList(params) {
  return request({
    url: '/sys/menu/menuList',
    method: 'get',
    params: params
  })
}
export function delMenu(id) {
  const data = querystring.stringify({
    id
  })
  return request({
    url: '/sys/menu/del',
    method: 'post',
    data
  })
}

export function saveMenu(params) {
  const data = querystring.stringify(params)
  return request({
    url: '/sys/menu/save',
    method: 'post',
    data
  })
}
