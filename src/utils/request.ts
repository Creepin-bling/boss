import axios from 'axios'
import store from '@/store'
import router from '@/router'
import { Message } from 'element-ui'
import qs from 'qs'
const request = axios.create({
  // 配置选项

})

function redirectLogin() {
  router.push({
    name: 'login',
    query: {
      redirect: router.currentRoute.fullPath
    }
  })
}
function refreshToken() {
  return axios.create()({
    method: 'POST',
    url: '/front/user/refresh_token',
    data: qs.stringify({
      // refreshtoken只能使用一次
      refreshtoken: store.state.user.refresh_token

    })
  })
}
// 请求拦截器 针对的是接口
request.interceptors.request.use(function (config) {
  // Do something before request is sent
  const { user } = store.state
  if (user && user.access_token) {
    config.headers.Authorization = user.access_token
  }

  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

let isRefreshing = false
let requests: any[] = [] // 存储刷新token期间传过来的请求
// 响应拦截器
request.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  // 如果是自定义状态码，那么错误处理就写到这里
  // console.log('请求响应成功', response)

  return response
}, async function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger

  if (error.response) { // 请求发出去收到响应了，但是状态欧超出了2xx
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    const { status } = error.response
    if (status === 400) {
      Message.error('请求参数错误')
    } else if (status === 401) {
      if (!store.state.user) {
        redirectLogin()
        return Promise.reject(error)
      }
      if (!isRefreshing) {
        // 刷新Token
        isRefreshing = true
        return refreshToken().then(res => {
          if (!res.data.success) {
            throw new Error('刷新Token失败')
          }
          // 刷新token成功了
          store.commit('setUser', res.data.content)
          // 把request中的请求重新发出去
          requests.forEach(cb => cb())
          // 重置requests数组
          requests = []
          return request(error.config)
        }).catch(error => {
          store.commit('setUser', null)
          redirectLogin()
          return Promise.reject(error)
        }).finally(() => {
          isRefreshing = false
        })
      }
      //  刷新状态下把请求挂起 放到requests中
      return new Promise(resolve => {
        requests.push(() => {
          resolve(request(error.config))
        })
      })
    } else if (status === 403) {
      Message.error('没有权限，请联系管理员')
    } else if (status === 404) {
      Message.error('资源不存在')
    } else if (status >= 500) {
      Message.error('服务端错误，请联系管理员')
    }
  } else if (error.request) { // 请求发出去没有收到响应
    Message.error('请求超时,请刷新重试')
  } else { // 在设置请求时发生了一些事情，触发了一个错误
    Message.error(`请求失败: ${error.message}`)
  }

  // 抛出请求失败的错误异常
  return Promise.reject(error)
})

export default request
