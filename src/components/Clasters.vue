<template>
  <div>
    
    <div v-if="isLoading" class="load">
      <Loader />
    </div>

    <div> {{ json }} </div>

  </div>
</template>

<script>
import Gfk from "../data/gfk.json";

export default {
  name: "clasters",
  data: () => ({
    isLoading: true,
    json: null
  }),

  async mounted() {
    this.json = await this.$store.dispatch('fetchJson')
    this.isLoading = false
  },


  methods: {},


};
</script>

<style lang="scss" scoped>
.load {
  display: flex;
  justify-content: center;
  padding-top: 40px;
}
</style>