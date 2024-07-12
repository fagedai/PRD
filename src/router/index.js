import { createRouter, createWebHistory } from 'vue-router'
// import { userInfoStore } from '@/stores/user';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home/primarily'
    },
    {
      path: "/home",
      component: () => import('@/views/Home/index.vue'),
      children: [
        {
          path: "/home/primarily",
          name: 'primarily',
          component: () => import('@/views/Primarily/index.vue')
        },
        {
          path: "/home/guide",
          name: 'guide',
          component: () => import('@/views/Guide/index.vue')
        },
        {
          path: "/home/enroll",
          name: 'enroll',
          component: () => import('@/views/Enroll/index.vue'),
        },
        {
          path: "/home/expert",
          name: 'expert',
          component: () => import('@/views/Expert/index.vue')
        }
      ]
    },
  ],
  scrollBehavior() {
    return {
      top: 0
    }
  }
});

//登录校验
router.beforeEach((to, from, next) => {
  // const store = userInfoStore()
  let isLogin = localStorage.getItem('isLogin')
  if (to.name !== 'primarily' && to.name !== 'guide' && !isLogin) {
    next({ name: from.name })
  } else {
    next()
  }
})

export default router
