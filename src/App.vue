<template>
  <header class="header">
        <h1>NAH Studio</h1>
  </header>

  <div class="row">
    <NavBar class="column side middle"/>
  </div>
  
  <div class="row"> 
    <RouterView class="column middle"/>
    
  </div>

  <footer class="footer">
    <img alt="NAHlogo" src="./assets/NahLogo.png" width="5%" height="4%" />
    <p>Copyright © 2024 - NamesAreHard Studio</p>
  </footer>
</template>

<script setup>

import NavBar from './components/NavBar.vue';


</script>
  
<style scoped>
* {
  box-sizing: border-box;
}

body {
  font-family: Arial, sans-serif;
}

/* Style the header */
.header {
  padding: 10;
  text-align: center;
  font-size: 150%;
  
}

/* Container for flexboxes */
.row {
  display: -webkit-flex;
  display: flex;
}


.column {
  padding: 10px;
}

.column.side1 {
  font-size: 25px;
  -webkit-flex: 1;
  -ms-flex: 1;
  flex: 0 0 10%;
  text-align: center;
}
.column.side {
  font-size: 25px;
  -webkit-flex: 1;
  -ms-flex: 1;
  flex: 0 0 20%;
}

.column.middle {
  -webkit-flex: 3;
  -ms-flex: 3;
  flex: 3;
}

.footer {
  padding: 20px;
  text-align: center;
}

@media (max-width: 500px) {
  .row {
    -webkit-flex-direction: column;
    flex-direction: column;
  }
}

.debug {
  border: dashed 1px blueviolet;
}
</style>