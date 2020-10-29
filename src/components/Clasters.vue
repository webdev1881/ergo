<template>
  <div>
    <div v-if="isLoading" class="load">
      <Loader />
    </div>

    <div class="clasters">
      <div class="title">Clusters</div>
      <div class="charts">
        <WeekGfkClusters @changeLoading="loadedClasters" />
        <!-- <WeekYugClusters @changeLoading="loadedUah" /> -->
      </div>
      <div class="arrows" v-show="isLoadedClasters">
        <button class="waves-effect waves-light btn-small" @click="addWeeksClaster">
          <i class="material-icons dp48">keyboard_arrow_left</i>
        </button>
        <button class="waves-effect waves-light btn-small" @click="removeWeeksClaster">
          <i class="material-icons dp48">keyboard_arrow_right</i>
        </button>
      </div>
    </div>



  </div>
</template>

<script>
import WeekGfkClusters from "@/components/Home/WeekGfkClusters";
import WeekYugClusters from "@/components/Home/WeekYugClusters";

export default {
  name: "clasters",
  data: () => ({
    isLoading: true,
    weeksValue: null,
    isLoadedClasters: false,
  }),

  async mounted() {
    Chart.defaults.global.plugins.datalabels.display = false
    this.isLoading = false
  },

  methods: {

    loadedClasters(value) {
      this.isLoadedClasters = true;
    },

    addWeeksClaster() {
      // console.log(this.$children);
      this.$children[0].add()
    },
    removeWeeksClaster() {
      // console.log(this.$children);
      this.$children[0].remove()
    },

  },


  components: {
    WeekGfkClusters,
    WeekYugClusters,
  },
}
</script>

<style lang="scss" scoped>

.load {
  display: flex;
  justify-content: center;
  padding-top: 40px;
}

.arrows {
  display: flex;
  justify-content: center;
  // display: none;
}

</style>