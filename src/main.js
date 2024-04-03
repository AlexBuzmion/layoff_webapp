import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from '/src/router/index.js'
import vue3GoogleLogin from 'vue3-google-login'

const clientId = import.meta.env.VUE_APP_GOOGLE_CLIENT_ID;

class Main {
    
    constructor() {
        
        this.vue = createApp(App)
        this.vue.use(createPinia())
        this.vue.use(router)
        this.vue.use(vue3GoogleLogin, {clientId: clientId})
        // Load and initialize the Google API client
        function loadGoogleAPI() {
            const script = document.createElement('script');
            script.src = 'https://apis.google.com/js/platform.js';
            script.onload = () => {
            window.gapi.load('auth2', () => {
                window.gapi.auth2.init({
                client_id: clientId
                }).then(() => {
                // Google API is ready to use
                console.log('Google API loaded and initialized');
                });
            });
            };
            document.head.appendChild(script);
        }
        this.vue.mount('#app')

        loadGoogleAPI();
    }
}
// ensure DOM content is loaded before the App is created 
document.addEventListener('DOMContentLoaded', event => {
    
    const app = new Main();
    
});