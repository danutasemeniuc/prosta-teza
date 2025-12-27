import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/home/ui/HomePage.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
  },
  // Future routes will be added here
  // {
  //   path: '/login',
  //   name: 'login',
  //   component: () => import('@/pages/login/ui/LoginPage.vue'),
  // },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Navigation guards can be added here for future auth
// router.beforeEach((to, from, next) => {
//   const isAuthenticated = localStorage.getItem('token');
//   if (to.meta.requiresAuth && !isAuthenticated) {
//     next('/login');
//   } else {
//     next();
//   }
// });

export default router
