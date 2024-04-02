import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from '/src/router/index.js'
import vue3GoogleLogin from 'vue3-google-login'

class Main {
    
    constructor() {
        
        this.vue = createApp(App)
        this.vue.use(createPinia())
        this.vue.use(router)
        this.vue.use(vue3GoogleLogin, {
            clientId: '477410765209-ndhqompnl26k7g1em2el63g27ll3p5oo.apps.googleusercontent.com'})
        this.vue.mount('#app')
    }
}
// ensure DOM content is loaded before the App is created 
document.addEventListener('DOMContentLoaded', event => {
    
    const app = new Main();
    
});