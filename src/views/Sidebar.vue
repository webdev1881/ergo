<template>
<div ref="sidebar" :class="{toggle: isActive}" class="sidebar">

  <img src="er.svg" alt="">

  <a class="a-togg" href="#" @click.prevent="toggleNav">
    <i class="lines material-icons black-text">dehaze</i>
  </a>

  <ul class="ul-side">   
    <router-link
      v-for="link in links"
      :key="link.url"
      tag="li"
      class="item"
      active-class="active"
      :to="link.url"
      :exact="link.exact"
    >
    
      <a class="title">
        <i class="material-icons">{{link.icon}}</i>
        {{link.title}}
      </a>

    </router-link>
  </ul>


</div>


</template>




<script>
export default {
  props: ["value"],
  data: () => ({
    links: [
      { title: "Счет", icon: "cloud", url: "/", exact: true },
      { title: "История", icon: "cloud", url: "/history" },
      { title: "Новая запись", icon: "cloud", url: "/record" },
      { title: "Категории", icon: "cloud", url: "/categories" }
    ],
    isActive: false
  }),
  methods: {
    toggleNav() {
      this.isActive = !this.isActive;
    }
  }
};
</script>



<style lang="scss" >
img {
  width: 133px;
  display: block;
  margin: 5px 0 5px 0;
}
.toggle {
  width: 45px !important;
  padding-right: 0 !important;
}
.a-togg {
  color: black;
  .lines {
    font-size: 30px;
    margin-left: 7px;
  }
}

.sidebar {
  width: 225px;
  border-right: 2px solid gray;
  box-shadow: 3px 0px #111;
  transition: all .25s;
}

.ul-side {
  padding: 0;
}

.item {
  list-style-type: none;
  transition: all 0.2s;
  &:hover {
    background-color: #fff;
    cursor: pointer;
  }
  .title {
    display: flex;
    align-items: center;
    white-space: nowrap;
    color: #094a69;
    text-decoration: none;
    padding: 0 8px;
    height: 45px;
    line-height: 1px;
    i {
      margin-right: 15px;
    }
  }
}

</style>