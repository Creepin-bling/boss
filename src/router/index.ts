import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import layout from '@/views/layout/index.vue'
import store from '@/store'

Vue.use(VueRouter)

// 路由配置规则
const routes: Array<RouteConfig> = [
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: 'login' */ '@/views/login/index.vue')
  },

  {
    path: '/',
    component: layout,
    children: [
      {
        path: '', // 默认子路由
        name: 'home',
        component: () => import(/* webpackChunkName: 'home' */ '@/views/home/index.vue'),
        meta: {
          requiresAuth: true // 自定义数据
        }
      },
      {
        path: '/role',
        name: 'role',
        component: () => import(/* webpackChunkName: 'role' */ '@/views/role/index.vue'),
        meta: {
          requiresAuth: true // 自定义数据
        }
      },
      {
        path: '/role/:roleId/alloc-Menu',
        name: 'alloc-menu',
        component: () => import(/* webpackChunkName: 'role' */ '@/views/role/alloc-menu.vue'),
        props: true // 将路由路径中的参数映射到组件的props中
      },
      {
        path: '/menu',
        name: 'menu',
        component: () => import(/* webpackChunkName: 'menu' */ '@/views/menu/index.vue'),
        meta: {
          requiresAuth: true // 自定义数据
        }
      },
      {
        path: '/resource',
        name: 'resource',
        component: () => import(/* webpackChunkName: 'resource' */ '@/views/resource/index.vue')
      },
      {
        path: '/course',
        name: 'course',
        component: () => import(/* webpackChunkName: 'course' */ '@/views/course/index.vue')
      },
      {
        path: '/course/create',
        name: 'course-create',
        component: () => import(/* webpackChunkName: 'course-create' */ '@/views/course/create.vue')
      },
      {
        path: '/course/:courseId/edit',
        name: 'course-edit',
        component: () => import(/* webpackChunkName: 'course-create' */ '@/views/course/edit.vue'),
        props: true
      },
      {
        path: '/course/:courseId/section',
        name: 'course-section',
        component: () => import(/* webpackChunkName: 'course-create' */ '@/views/course/section.vue'),
        props: true
      },
      {
        path: '/course/:courseId/video',
        name: 'course-video',
        component: () => import(/* webpackChunkName: 'course-create' */ '@/views/course/video.vue'),
        props: true
      },
      {
        path: '/user',
        name: 'user',
        component: () => import(/* webpackChunkName: 'user' */ '@/views/user/index.vue'),
        meta: {
          requiresAuth: true // 自定义数据
        }
      },
      {
        path: '/user/:userId/user-alloc',
        name: 'user-alloc',
        component: () => import(/* webpackChunkName: 'role' */ '@/views/user/user-alloc.vue'),
        props: true // 将路由路径中的参数映射到组件的props中
      },
      {
        path: '/advert',
        name: 'advert',
        component: () => import(/* webpackChunkName: 'advert' */ '@/views/advert/index.vue'),
        meta: {
          requiresAuth: true // 自定义数据
        }
      },
      {
        path: '/advert-space',
        name: 'advert-space',
        component: () => import(/* webpackChunkName: 'advert-space' */ '@/views/advert-space/index.vue')
      },
      {
        path: '*',
        name: '404',
        component: () => import(/* webpackChunkName: 'not-found' */ '@/views/error-page/404.vue')
      },
      {
        path: '/menu/create',
        name: 'menu-create',
        component: () => import(/* webpackChunkName: 'not-found' */ '@/views/menu/create.vue')
      },
      {
        path: '/menu/:id/edit',
        name: 'menu-edit',
        component: () => import(/* webpackChunkName: 'not-found' */ '@/views/menu/edit.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})
// 全局前置守卫
router.beforeEach((to, from, next) => {
  // if(to.path!=='/login'){
  //   // 校验
  // }
  // to.matched是匹配到的路由记录
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.state.user) {
      // 跳转到登录页面
      next({
        name: 'login',
        query: { // 通过url传递字符串参数
          redirect: to.fullPath // 把登陆成功需要返回的页面告诉登录页面
        }
      })
    } else {
      // 允许通过
      next()
    }
  } else {
    next()
  }
})

export default router
