import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import HomeView from '../views/HomeView.vue'
import AboutViewVue from '@/views/AboutView.vue'
import ChartsViewVue from '@/views/ChartsView.vue'
import RemoteConfigurationsVue from '@/views/RemoteConfigurations.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView,
      meta : {requiresAuth: false}
    },
    {
      path: '/about',
      name: 'About',
      component: AboutViewVue,
      meta : {requiresAuth: false}
      
    }, 
    {
      path: '/charts',
      name: 'Charts',
      component: ChartsViewVue,
      meta : {requiresAuth: true}
    },
    {
      path: '/remote-config',
      name: 'Remote Config',
      component: RemoteConfigurationsVue, 
      meta : {requiresAuth: true}
    },

  ]
})

  router.beforeEach((to, from, next) => {
    const authStore = useAuthStore(); // Use the auth store
    // Check if the route requires authentication.
    if (to.meta.requiresAuth && !authStore.isLoggedIn) {
      // Open Netlify Identity modal if not authenticated.
      window.netlifyIdentity.open('login')
    } else {
      // Proceed as normal if authenticated or if auth is not required.
      next();
    }
  })
export default router
