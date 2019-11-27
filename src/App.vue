<template>
  <div id="app">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

    <div class="container">


        <Sidebar />



        <Home />


    </div>

    
    


  </div>
</template>



<script>

import Home from '@/views/Home'
import Sidebar from '@/views/Sidebar'

export default {
  name: 'home',

  components: {
    Sidebar, Home
  }
}

</script>

<style lang="scss">

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  margin: 0;
  padding: 0;
}

.container {
  display: flex;
  height: 100vh;
}
.sidebar {
  background-color: #d8d6d6;
  width: 20%;
}
.home {
  background-color: #fbf5f5;
  width: 80%;
}

</style>
