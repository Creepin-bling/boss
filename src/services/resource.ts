import request from '@/utils/request'

export const GetAllCategoryPages = (data: any) => {
  return request({
    url: '/boss/resource/getResourcePages',
    method: 'POST',
    data
    // headers: { 'content-type': 'application/x-www-form-urlencoded' },
  })
}

export const GetAllCategory = () => {
  return request({
    url: '/boss/resource/category/getAll',
    method: 'GET'
    // headers: { 'content-type': 'application/x-www-form-urlencoded' },
  })
}

export const resourceAll = () => {
  return request({
    url: '/boss/resource/getAll',
    method: 'GET'
    // headers: { 'content-type': 'application/x-www-form-urlencoded' },
  })
}

export const getRoleResources = (roleId: any) => {
  return request({
    url: '/boss/resource/getRoleResources',
    method: 'GET',
    params: {
      roleId
    }
    // headers: { 'content-type': 'application/x-www-form-urlencoded' },
  })
}

export const allocateRoleResources = (data: any) => {
  return request({
    url: '/boss/resource/allocateRoleResources',
    method: 'POST',
    data
    // headers: { 'content-type': 'application/x-www-form-urlencoded' },
  })
}
