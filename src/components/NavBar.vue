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
    import { computed} from 'vue'
    import { RouterLink, useRouter } from 'vue-router'
    import { useAuthStore } from '@/stores/auth'
    
    const router = useRouter()
    const authStore = useAuthStore()

    // Login call to AuthStore
    const login = () => { authStore.login() }
    // Logout call to AuthStore
    const logout = () => { authStore.logout() }
    // guard routes based on user login status
    const filteredNavMenu = computed(() => {
        return router.options.routes
        .filter(route => {
        // If a route requires auth, only show it when the user is logged in
        if (route.meta.requiresAuth) return authStore.isLoggedIn
        // Otherwise, the route does not require auth and should always be shown
        return true
        })
        .map(route => ({
        path: route.path,
        section: route.name,
        }))
    })

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