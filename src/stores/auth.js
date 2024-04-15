import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        isLoggedIn: false,
        userDetails: {},
        unityAccessToken: null,
    }),
    actions: {
        async loginWithUnity(username, password) {
            try {
                // Replace the URL with your Unity Auth endpoint
                const response = await fetch('https://services.api.unity.com/auth/v1/token-exchange', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username, password }),
                });

                if (!response.ok) {
                    throw new Error('Login failed');
                }

                const data = await response.json();
                this.unityAccessToken = data.accessToken; // Assume the response contains an accessToken
                this.isLoggedIn = true;
                // Optionally, set user details
            } catch (error) {
                console.error(error);
                this.isLoggedIn = false;
                this.unityAccessToken = null;
                // Handle the error appropriately
            }
        },
        logout() {
            this.isLoggedIn = false;
            this.userDetails = {};
            this.unityAccessToken = null;
            // Optionally, include logic to invalidate the token on the Unity side
        },
    },
});
