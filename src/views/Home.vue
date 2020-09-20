<template>
  <div class="home">
    <h5>Главная</h5>
    <div v-if="isLoading" class="load">
      <Loader />
    </div>

    <div>{{ json }}</div>
  </div>
</template>



<script>
export default {
  name: "home",

  data: () => ({
    isLoading: true,
    json: null,
  }),

  async mounted() {
    this.json = await this.$store.dispatch("fetchJson");
    this.isLoading = false;
  },


  created() {},
  computed: {},
  components: {},
};
</script>


<style lang="scss" >
.home {
  width: 100%;
  display: flex;
  justify-content: space-around;
}
h5 {
  display: block;
}
td,
th {
  padding: 0 5px !important;
}
</style>