import {createRouter, createWebHistory} from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/gfxzyddjc'
    },
    {
      path: '/404',
      name: '404',
      component: () => import ('../views/error-page/404.vue'),
      meta: {
        title: '页面找不到....'
      }
    },
    {
      path: '/gfxzyddjc',
      name: 'gfxzyDdjc',
      component: () => import('../views/gfxzyDdjc.vue'),
      meta: {
        title: '高风险作业督导检查情况'
      }
    },
  ]
})

export default router

router.beforeEach(async (to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
    to.meta.keepAlive = true;
    from.meta.keepAlive = true;
  }
  if (to.matched.length > 0) {
    next()
  } else {
    next("/404")
  }
})