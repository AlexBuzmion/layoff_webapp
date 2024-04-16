<template>
    
    <section class="wrapper">
        
        <div class="navbar">
            <nav>
                <ul class="navbar-nav">
                    <li><img src="/src/assets/NahLogo.png" alt="Logo" width="80" height="48"></li>
                    <li v-for="(item, i) in filteredNavMenu" :key="i">
                        <RouterLink :to="item.path" class="nav-item">{{ item.section }}</RouterLink>
                    </li>                   
                    <li class="nav-button">
                        <button v-if="!authStore.isLoggedIn" @click="login">Login</button>
                        <button v-else @click="logout">Logout</button>
                    </li>
                </ul>
            </nav>
        </div>
    </section>
</template>

<script setup>
    import { computed, onMounted, watch} from 'vue'
    import { RouterLink, useRouter } from 'vue-router'
    import { useAuthStore } from '@/stores/auth'
    
    const router = useRouter()
    const authStore = useAuthStore()

    // Login call to AuthStore
    const login = () => { authStore.login() }
    // Logout call to AuthStore
    const logout = () => { 
        authStore.logout() 
        router.push('/')
    }

    // guard routes based on user login status
    const filteredNavMenu = computed(() => getFilteredNavMenu());

    // Trigger navbar updates when login status changes
    const updateNavbarOnAuthChange = () => {
        filteredNavMenu.value = getFilteredNavMenu()
    }

    // Function to get filtered navigation menu based on auth state
    const getFilteredNavMenu = () => {
        return router.options.routes
        .filter(route => {
            // Show route if it does not require auth or if user is logged in
            return !route.meta.requiresAuth || authStore.isLoggedIn
        })
        .map(route => ({
        path: route.path,
        section: route.name,
        }))
    }

    // Watch for changes in login state to update navbar
    watch(() => authStore.isLoggedIn, updateNavbarOnAuthChange, { immediate: true });


</script>

<style scoped>
.wrapper .navbar nav {
    display: flex;
    justify-content: space-between; /* This will push the menu and the button to opposite ends */
    align-items: center; /* This will vertically center-align the items */
    background: var(--medium);
    font-weight: 700;
}

.navbar-nav {
    list-style: none;
    padding: 0;
    display: flex;
    align-items: center;
    width: 100%;
}

ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    display: flex; /* Display list items in a row */
}

li {
    font-size: 22px; /* Add some space between the navigation items */
    padding: 5px;
    margin: 5px;
}

li:last-child {
    margin-right: 0; /* Remove margin from the last item */
}

.nav-button {
    margin-left: auto; /* Push the button to the right */
}
.nav-button button {
    
    padding: 10px 20px;
}

</style>