import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
    }),
    getters: {
        // Checks the Netlify Identity login state
        isLoggedIn: (state) => {
            return !!state.user;
        },
    },
    actions: {
        setUser(user) {
            this.user = user;
        },
        login() {
            // Call Netlify Identity's login method
            window.netlifyIdentity.open('login')
        },
        logout() {
            window.netlifyIdentity.logout()
        },
        initialize() {
            this.setUser(window.netlifyIdentity.currentUser())

            window.netlifyIdentity.on('login', (user) => {
                this.setUser(user)
                window.netlifyIdentity.close()
                window.location.reload(true)
            })

            window.netlifyIdentity.on('logout', () => {
                this.setUser(null)
            })
        },
    },
});
