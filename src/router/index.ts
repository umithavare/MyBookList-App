import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/views/HomePage.vue';
import BooksPage from '@/views/Books.vue';
import RegisterPage from '@/views/Register.vue';
import LoginPage from '@/views/Login.vue';
import { useAuthStore } from '@/stores/auth';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
    meta: { requiresAuth: true },
  },
  {
    path: '/books',
    name: 'Books',
    component: BooksPage,
    meta: { requiresAuth: true },
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterPage,
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  if (
    to.matched.some((record) => record.meta.requiresAuth) &&
    !authStore.isAuthenticated
  ) {
    next('/login');
  } else {
    next();
  }
});

export default router;
