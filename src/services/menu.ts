/* 用户相关请求模块 */

// import store from '@/store'
import request from '@/utils/request'
// import qs from 'qs'

export const createMenu = (data: any) => {
  return request({
    url: '/boss/menu/saveOrUpdate',
    method: 'POST',
    // headers: { 'content-type': 'application/x-www-form-urlencoded' },
    data
  })
}

export const getEditMenuInfo = (id: string | number = -1) => {
  return request({
    url: '/boss/menu/getEditMenuInfo',
    method: 'GET',
    // headers: { 'content-type': 'application/x-www-form-urlencoded' },
    params: {
      id
    }
  })
}

export const getAllMenuInfo = () => {
  return request({
    url: '/boss/menu/getAll',
    method: 'GET'
    // headers: { 'content-type': 'application/x-www-form-urlencoded' },
  })
}

export const DelMenuInfo = (id: number) => {
  return request({
    url: `/boss/menu/${id}`,
    method: 'DELETE'
    // headers: { 'content-type': 'application/x-www-form-urlencoded' },
  })
}

export const getMenuNodeList = () => {
  return request({
    url: '/boss/menu/getMenuNodeList',
    method: 'GET'
    // headers: { 'content-type': 'application/x-www-form-urlencoded' },
  })
}

export const getRoleMenus = (roleId: string | number) => {
  return request({
    // url: `/boss/menu/getRoleMenus?roleId=${roleId}`,
    url: '/boss/menu/getRoleMenus',
    method: 'GET',
    params: {
      roleId
    }
    // axios 会把params转化为key=value&key=value的数据格式放到url后面
  })
}
