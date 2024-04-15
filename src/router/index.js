import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutViewVue from '@/views/AboutView.vue'
import ChartsViewVue from '@/views/ChartsView.vue'
import RemoteConfigurationsVue from '@/views/RemoteConfigurations.vue'
import LoginView from '/src/components/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: LoginView,
      meta: {requiresAuth: false}
    },
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

export default router
