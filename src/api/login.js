import request from '@/utils/request'
import querystring from 'querystring'
export function loginByUsername(username, password) {
  let data = {
    username,
    password
  }
  data = querystring.stringify(data)
  return request({
    url: '/sys/passport/login',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/sys/passport/logout',
    method: 'post'
  })
}

export function getUserInfo() {
  return request({
    url: '/sys/passport/userInfo',
    method: 'get'
  })
}

export function cacha() {
  return request({
    url: '/mobile/passport/captcha',
    method: 'post'
  })
}

