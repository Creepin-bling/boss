/* 用户相关请求模块 */

// import store from '@/store'
import request from '@/utils/request'
import qs from 'qs'

interface User {
  phone: string;
  password: string;
}
export const login = (data: User) => {
  return request({
    url: '/front/user/login',
    method: 'POST',
    // headers: { 'content-type': 'application/x-www-form-urlencoded' },
    data: qs.stringify(data)
  })
}

export const getUserInfo = () => {
  return request({
    url: '/front/user/getInfo',
    method: 'GET'
    // headers: { 'content-type': 'application/x-www-form-urlencoded' },
  })
}

export const getUserPages = (data: any) => {
  return request({
    url: '/boss/user/getUserPages',
    method: 'POST',
    data
    // headers: { 'content-type': 'application/x-www-form-urlencoded' },
  })
}
