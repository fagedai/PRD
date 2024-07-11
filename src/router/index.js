import { createRouter, createWebHistory } from 'vue-router'


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
          component: () => import('@/views/Primarily/index.vue')
        },
        {
          path: "/home/guide",
          component: () => import('@/views/Guide/index.vue')
        },
        {
          path: "/home/enroll",
          component: () => import('@/views/Enroll/index.vue'),
        },
        {
          path: "/home/upload",
          component: () => import('@/views/Upload/index.vue')
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

export default router
