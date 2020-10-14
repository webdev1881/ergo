<template>
  <div class="home">
    <div class="weeks">

      <div class="total">
        <div class="title">Total</div>
        <div class="charts">
          <WeekChartUnits @changeLoading="loadedUnits" />
          <WeekChartUAH @changeLoading="loadedUah" />
        </div>
        <div class="arrows" v-show="isLoadedUnits && isLoadedUah">
          <button class="waves-effect waves-light btn-small" @click="addWeeks">
            <i class="material-icons dp48">keyboard_arrow_left</i>
          </button>
          <button class="waves-effect waves-light btn-small" @click="removeWeeks">
            <i class="material-icons dp48">keyboard_arrow_right</i>
          </button>
        </div>
      </div>

      <div class="clasters">
        <div class="title">Clusters</div>
        <div class="charts">
          <WeekGfkClusters @changeLoading="loadedUnits" />
          <WeekYugClusters @changeLoading="loadedUah" />
        </div>
        <div class="arrows" v-show="isLoadedUnits && isLoadedUah">
          <button class="waves-effect waves-light btn-small" @click="addWeeksClaster">
            <i class="material-icons dp48">keyboard_arrow_left</i>
          </button>
          <button class="waves-effect waves-light btn-small" @click="removeWeeks">
            <i class="material-icons dp48">keyboard_arrow_right</i>
          </button>
        </div>
      </div>

    </div>

    <hr />
  </div>
</template>


<script>
import WeekChartUnits from "@/components/Home/WeekChartUnits";
import WeekChartUAH from "@/components/Home/WeekChartUAH";

import WeekGfkClusters from "@/components/Home/WeekGfkClusters";
import WeekYugClusters from "@/components/Home/WeekYugClusters";

import ChartDataLabels from "chartjs-plugin-datalabels";

export default {
  name: "home",
  data: () => ({
    isLoadedUnits: false,
    isLoadedUah: false,
  }),

  async mounted() {
    Chart.defaults.global.plugins.datalabels.display = false;
  },
  watch: {},

  methods: {
    loadedUnits(value) {
      this.isLoadedUnits = true;
    },
    loadedUah(value) {
      this.isLoadedUah = true;
    },

    addWeeks() {
      this.$children[0].add()
      this.$children[1].add()
    },
    addWeeksClaster() {
      // console.log(this.$children);
      this.$children[2].add()
    },
    removeWeeks() {
      this.$children[0].remove();
      this.$children[1].remove();
    },
  },

  components: {
    WeekChartUnits,
    WeekChartUAH,
    WeekGfkClusters,
    WeekYugClusters,
  },
};
</script>


<style lang="scss" scoped >
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

.clasters {
  margin-top: 30px;;
}



</style>