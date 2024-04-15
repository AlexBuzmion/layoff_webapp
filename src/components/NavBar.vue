<template>
    
    <section class="wrapper">

        <div class="navbar">
            <nav>
                <ul>
                    <li v-for="(item, i) in filteredNavMenu" :key="i">
                        <RouterLink :to="item.path" class="column">{{ item.section }}</RouterLink>
                        
                    </li>   
                </ul>
            </nav>
        </div>

    </section>
 
</template>

<script setup>
    import { computed} from 'vue'
    import { RouterLink } from 'vue-router'
    import { useAuthStore } from '@/stores/auth'


    const authStore = useAuthStore();

    const navMenuLoggedin = [
        { path: "/", section:"Home", }, 
        { path: "/charts", section:"Player Data", }, 
        { path: "/remote-config", section:"Remote Config",},
        { path: "/about", section:"About", },
    ];

    const navMenuNotLoggedIn = [
        { path: "/", section:"Home", }, 
        { path: "/about", section:"About", },
        { path: "/login", section:"Login", },
        
    ];

    const filteredNavMenu = computed(() => {
        // Only show the full nav menu if the user is logged in
        if (authStore.isLoggedIn) {
            return navMenuNotLoggedIn;
        }
        return navMenuLoggedin;

    });
    const callback = (response) => {
    if (response && response.success) {
        authStore.setUserDetails(response.user);
    }
};

    
</script>

<style scoped>
.wrapper .navbar nav {
    display: flex;
    justify-content: space-between; /* This will push the menu and the button to opposite ends */
    align-items: center; /* This will vertically center-align the items */
    background: var(--medium);
    font-weight: 700;
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

.GoogleLogin {
    margin-left: auto; /* This will push the GoogleLogin button to the far right */
}

</style>