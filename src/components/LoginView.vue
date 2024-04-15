<template>
    <div>
      <h1>Login</h1>
      <form @submit.prevent="login">
        <input v-model="username" placeholder="Username" required>
        <input type="password" v-model="password" placeholder="Password" required>
        <button type="submit">Login</button>
      </form>
    </div>
  </template>
  
  <script>
  import { useAuthStore } from '@/stores/auth';
  
  export default {
    name: 'LoginView',
    data() {
      return {
        username: '',
        password: ''
      };
    },
    methods: {
      async login() {
        const authStore = useAuthStore();
        await authStore.loginWithUnity(this.username, this.password);
        if (authStore.isLoggedIn) {
          this.$router.push('/home');
        } else {
          alert('Login failed');
        }
      }
    }
  }
  </script>
  