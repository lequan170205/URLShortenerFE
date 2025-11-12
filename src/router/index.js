import LoginPage from '@/views/LoginPage.vue'
import RegisterPage from '@/views/RegisterPage.vue'
import VerifyOtpPage from '@/views/VerifyOtpPage.vue'
import { createRouter, createWebHistory } from 'vue-router'
import AdminPage from '../views/AdminPage.vue'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterPage
  },
  {
    path: '/admin',
    name: 'admin',
    component: AdminPage,
    meta: { requiresAuth: true }
  },
  {
    path: '/verify-otp',
    name: 'verify-otp',
    component: VerifyOtpPage
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// ✅ Global Navigation Guard
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('accessToken')

  // Nếu route cần auth nhưng không có token => redirect login
  if (to.meta.requiresAuth && !token) {
    next({ name: 'login' })
  } else {
    next() // cho phép truy cập
  }
})

export default router
