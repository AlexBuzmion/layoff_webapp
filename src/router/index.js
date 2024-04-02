import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutViewVue from '@/views/AboutView.vue'
import ChartsViewVue from '@/views/ChartsView.vue'
import RemoteConfigViewVue from '@/views/RemoteConfigView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'About',
      component: AboutViewVue
      //component: () => import('../views/AboutView.vue') // Dynamic load function to import only when visited
    }, 
    {
      path: '/charts',
      name: 'Charts',
      component: ChartsViewVue
    },
    {
      path: '/remote-config',
      name: 'Remote Config',
      component: RemoteConfigViewVue, 
    },
  ]
})

export default router
