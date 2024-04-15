import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from '/src/router/index.js'
import { ensureValidToken } from '/src/services/unityService.js'

class Main {
    
    constructor() {
        this.vue = createApp(App)
        this.vue.use(createPinia())
        this.vue.use(router)

        // initialize unity authentication 
        this.authenticate().then(() => {
            this.vue.mount('#app') 
        }).catch((error) => {
            console.error('Authentication failed: ',error)
        })
    }
    async authenticate() {
        // Ensure there's a valid Unity token before starting the app
        await ensureValidToken(); // This replaces direct login calls if `ensureValidToken` includes them
    }
}

// ensure DOM content is loaded before the App is created 
document.addEventListener('DOMContentLoaded', event => {
    
    const app = new Main();
    
});