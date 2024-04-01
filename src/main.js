import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

class Main {

    constructor() {
        
    this.vue = createApp(App)
    this.vue.use(createPinia())
    this.vue.use(router)
    this.vue.mount('#app')
    }
}
// ensure DOM content is loaded before the App is created 
document.addEventListener('DOMContentLoaded', event => {

    const app = new Main();
});