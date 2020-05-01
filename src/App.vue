<template>
  <div id="app">
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
    />

    <div class="layout">

      <Sidebar />
      <div class="wrapper">
        <router-view />
      </div>
      

    </div>

  </div>
</template>



<script>
import Home from "@/views/Home";
import Sidebar from "@/views/Sidebar";

export default {
  name: "home",

  components: {
    Sidebar,
    Home
  }
};
</script>

<style lang="scss">
@import "~materialize-css/dist/css/materialize.min.css";

* {
  font-size: 14px;
}


#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  margin: 0;
  padding: 0;
}

.wrapper {
  width: 100%;
  padding: 10px;
}

.layout {
  display: flex;
  height: 100vh;
}
.sidebar {
}
.home {
}
</style>
