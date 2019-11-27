<template>
  <div class="sidebar">
    <a href="#" @click.prevent="$emit('')">
      <i class="lines material-icons black-text">dehaze</i>
    </a>
    <router-link
      v-for="link in links"
      :key="link.url"
      tag="div"
      class="item"
      active-class="active"
      :to="link.url"
      :exact="link.exact"
    >
      <i class="material-icons">{{link.icon}}</i>
      <div class="title">{{link.title}}</div>
    </router-link>
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
    ]
  })
};
</script>

<style lang="scss" >
a {
  color: black;
  .lines {
    font-size: 30px;
    margin-left: 7px;
  }
}

.sidebar {
  border-right: 1px solid gray;
  box-shadow: 5px 5px 5px 5px #111;
}

.item {
  width: 100%;
  display: flex;
  // flex-direction: row-reverse;
  align-items: center;
  padding: 10px 0px 10px 0px;
  transition: all 0.2s;
  &:hover {
    background-color: #fff;
    cursor: pointer;
  }
}

.title {
  width: 100%;
  color: #094a69;
  margin-left: 10px;
  text-decoration: none;
}
i {
  margin-left: 10px;
  margin-right: 10px;
}
</style>