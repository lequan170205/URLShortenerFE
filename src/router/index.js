import AdminPage from '@/views/AdminPage.vue'
import ErrorPage from '@/views/ErrorPage.vue'
import HomeView from '@/views/HomeView.vue'
import LoginPage from '@/views/LoginPage.vue'
import NotFoundPage from '@/views/NotFoundPage.vue'
import RegisterPage from '@/views/RegisterPage.vue'
import VerifyOtpPage from '@/views/VerifyOtpPage.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', name: 'home', component: HomeView, meta: { requiresAuth: true } },
  { path: '/login', name: 'login', component: LoginPage },
  { path: '/register', name: 'register', component: RegisterPage },
  {
    path: '/admin',
    name: 'admin',
    component: AdminPage,
    meta: { requiresAuth: true, requiresAdmin: true }
  },
  { path: '/verify-otp', name: 'verify-otp', component: VerifyOtpPage },
  { path: '/error', name: 'error', component: ErrorPage },
  { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFoundPage }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// ✅ Global Navigation Guard
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('accessToken')
  const storedUser = localStorage.getItem('user')
  const user = storedUser ? JSON.parse(storedUser) : null

  // Nếu route cần auth nhưng không có token => redirect login
  if (to.meta.requiresAuth && !token) {
    return next({ name: 'login' })
  }

  // Nếu route cần admin nhưng user không phải admin => redirect ErrorPage
  if (to.meta.requiresAdmin) {
    if (!user || user.role !== 'Admin') {
      return next({ name: 'error', query: { message: 'Access denied' } })
    }
  }

  next()
})

export default router
