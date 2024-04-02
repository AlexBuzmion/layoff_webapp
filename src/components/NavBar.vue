<template>
    
    <section class="wrapper">

        <div class="navbar">
            <nav>
                <ul>
                    
                    <li v-for="(item, i) in navMenu" :key="i">
                        <RouterLink :to="item.path" class="column">{{ item.section }}</RouterLink>
                        
                    </li>    
                    <GoogleLogin :callback="callback" ></GoogleLogin>
                    <div style="align-items: right;">
                    </div>
                </ul>
            </nav>
        </div>

    </section>
 
</template>

<script setup>
    
    import { RouterLink } from 'vue-router'
    
    const navMenu = [
        { path: "/", section:"Home", }, 
        { path: "/charts", section:"Player Data", }, 
        { path: "/about", section:"About", },
        { path: "/remote-config", section:"Remote Config",}
    ];

    const callback = (response) => {
        // This callback will be triggered when the user selects or login to
        // his Google account from the popup
        console.log("Handle the response", response)
    }

    
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