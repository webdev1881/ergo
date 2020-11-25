<template>
  <div>
    <div v-if="isLoading" class="load">
      <Loader />
    </div>

    <div class="clasters">
      <div class="title">Clusters</div>
      <div class="charts">
        <WeekGfkClusters @changeLoading="loadedClasters" />
        <WeekYugClusters @changeLoading="loadedClasters" />
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

    <div class="brands">
      <div class="title">Brands</div>
      <div class="charts">
        <div class="brand">
          <BrandGfkClusters @changeLoading="loadedClasters" />
        </div>
        <div class="brand">
          <!-- <BrandGfkClusters @changeLoading="loadedClasters" /> -->
        </div>
      </div>
    </div>



  </div>
</template>

<script>
import WeekGfkClusters from "@/components/Clasters/WeekGfkClusters";
import WeekYugClusters from "@/components/Clasters/WeekYugClusters";

import BrandGfkClusters from "@/components/Clasters/BrandGfkClusters";

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
      this.$children[0].add()
      this.$children[1].add()
    },
    removeWeeksClaster() {
      this.$children[0].remove()
      this.$children[1].remove()
    },

  },


  components: {
    WeekGfkClusters,
    WeekYugClusters,
    BrandGfkClusters,
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

.charts {
  width: 100%;
  display: flex;
  justify-content: space-around;
}

.title {
  font-size: 1.5rem;
  display: flex;
  justify-content: center;
}

.arrows {
  display: flex;
  justify-content: center;
  // display: none;
}

hr {
  border: 0;
  height: 1px;
  background-image: linear-gradient(left, #f0f0f0, #8c8c8c, #f0f0f0);
}

.brands {
  width: 100%;
  padding-top: 50px;
}

.brand {
  width: 50%;
}

</style>