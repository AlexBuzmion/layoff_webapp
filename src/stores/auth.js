import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        isLoggedIn: false,
        userDetails: {}
    }),
    actions: {
        setUserDetails(userDetails) {
            this.isLoggedIn = true;
            this.userDetails = userDetails;
        },
        clearUserDetails() {
            this.isLoggedIn = false;
            this.userDetails = {};
        }
    }
});
