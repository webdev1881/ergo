<template>
  <div>
    
    <div v-if="isLoading" class="load">
      <Loader />
    </div>

    <div> {{ weeksValue }} </div>

  </div>
</template>

<script>
import Gfk from "../data/gfk.json";

export default {
  name: "clasters",
  data: () => ({
    isLoading: true,
    weeksValue: null
  }),

  async mounted() {
    this.weeksValue = await this.$store.dispatch('fetchGfkWeeksType')
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