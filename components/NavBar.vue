<template>
    
    <section class="wrapper">

        <div class="navbar">
            <nav>
                <ul>
                    <li v-for="(item, i) in navMenu" :key="i">
                        <RouterLink :to="item.path" class="column">{{ item.section }}</RouterLink>
                    </li>                   
                </ul>
            </nav>
        </div>

    </section>
 
</template>

<script setup>
    import { RouterLink } from 'vue-router'
    
    const navMenu = [
        { path: "/", section:"Home"}, 
        { path: "/charts", section:"Charts"}, 
        { path: "/about", section:"About"},
        
    ];
</script>

<style scoped>
.nav {
    background: var(--medium); 
    font-weight: 700;
}

ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

li {
  display: inline;
}

</style>