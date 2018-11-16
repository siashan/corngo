import request from '@/utils/request'
import querystring from 'querystring'
export function getNewsList(params) {
  return request({
    url: '/admin/news/newsList',
    method: 'get',
    params: params
  })
}

export function getNewsById(id) {
  const data = {
    id
  }
  return request({
    url: '/admin/news/getNews',
    method: 'get',
    params: data
  })
}

export function saveNews(params) {
  console.log(params)
  const data = querystring.stringify(params)
  return request({
    url: '/admin/news/save',
    method: 'post',
    data
  })
}

export function delNews(id) {
  const data = querystring.stringify({
    id
  })
  return request({
    url: '/admin/news/del',
    method: 'post',
    data
  })
}
