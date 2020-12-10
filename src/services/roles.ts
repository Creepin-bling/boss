import request from '@/utils/request'

export const getRolePages = (data: any) => {
  return request({
    url: '/boss/role/getRolePages',
    method: 'POST',
    data
    // headers: { 'content-type': 'application/x-www-form-urlencoded' },
  })
}

export const saveOrUpdate = (data: any) => {
  return request({
    url: '/boss/role/saveOrUpdate',
    method: 'POST',
    data
    // headers: { 'content-type': 'application/x-www-form-urlencoded' },
  })
}

export const getRoleById = (id: string | number) => {
  return request({
    url: `/boss/role/${id}`,
    method: 'GET'
    // headers: { 'content-type': 'application/x-www-form-urlencoded' },
  })
}
export const DelRolesInfo = (id: string | number) => {
  return request({
    url: `/boss/role/${id}`,
    method: 'DELETE'
    // headers: { 'content-type': 'application/x-www-form-urlencoded' },
  })
}
export const setAllocateRole = (data: any) => {
  return request({
    url: '/boss/menu/allocateRoleMenus',
    method: 'POST',
    data
    // headers: { 'content-type': 'application/x-www-form-urlencoded' },
  })
}

export const allocateUserRoles = (data: any) => {
  return request({
    url: '/boss/role/allocateUserRoles',
    method: 'POST',
    data
    // headers: { 'content-type': 'application/x-www-form-urlencoded' },
  })
}

export const getUserRole = (userId: string | number) => {
  return request({
    url: `/boss/role/user/${userId}`,
    method: 'GET'
    // headers: { 'content-type': 'application/x-www-form-urlencoded' },
  })
}

export const getAllRoles = () => {
  return request({
    url: '/boss/role/all',
    method: 'GET'
    // headers: { 'content-type': 'application/x-www-form-urlencoded' },
  })
}
