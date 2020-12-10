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
