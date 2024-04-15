import { createRouter, createWebHistory } from 'vue-router'
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

export default router
