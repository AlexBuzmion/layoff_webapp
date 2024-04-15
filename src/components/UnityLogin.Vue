<template>
  <div class="login-container">
    <form @submit.prevent="handleLogin">
      <div>
        <label for="username">Username:</label>
        <input id="username" v-model="username" type="text" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input id="password" v-model="password" type="password" required />
      </div>
      <button type="submit">Login</button>
    </form>
  </div>
</template>``

<script setup>
  import { ref } from 'vue';
  import { useAuthStore } from '@/stores/auth'; // Import the auth store

  // Reactive properties for the form inputs
  const username = ref('');
  const password = ref('');

  // Use the auth store
  const authStore = useAuthStore();

  // The method to handle the login form submission
  const handleLogin = async () => {
    try {
      // Perform the login operation
      await authStore.loginWithUnity(username.value, password.value);
      // Optionally, redirect the user or show a success message
    } catch (error) {
      console.error('Login failed:', error);
      // Handle login failure (e.g., show an error message)
    }
  };
</script>
<style>
@media (max-width: 1024px ) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
