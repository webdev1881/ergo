<template>
  <div class="home">
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


    <ul ref="collapsible" class="collapsible">
      <li>
        <div class="collapsible-header"><i class="material-icons">filter_drama</i>ASP</div>
        <div class="collapsible-body">

          <div class="asps">
            <div class="title">ASP</div>
            <div class="charts">
              <div class="asp">
                <GfkASP @changeLoading="loadedUnits" />
              </div>
              <div class="asp">
                <YugASP @changeLoading="loadedUnits" />
              </div>
            </div>
          </div>

        </div>
      </li>
    </ul>




    

    <hr />
  </div>
</template>

<script>
import WeekChartUnits from "@/components/Home/WeekChartUnits";
import WeekChartUAH from "@/components/Home/WeekChartUAH";

import GfkASP from "@/components/Home/GfkASP";
import YugASP from "@/components/Home/YugASP";

import ChartDataLabels from "chartjs-plugin-datalabels";

export default {
  name: "home",
  data: () => ({
    isLoadedUnits: false,
    isLoadedUah: false,
  }),

  async mounted() {
    Chart.defaults.global.plugins.datalabels.display = false
    setTimeout(() => this.select = M.Collapsible.init(this.$refs.collapsible))
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
      this.$children[0].add();
      this.$children[1].add();
    },

    removeWeeks() {
      this.$children[0].remove();
      this.$children[1].remove();
    },
  },

  components: {
    WeekChartUnits,
    WeekChartUAH,
    GfkASP,
    YugASP,
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
  text-align: center;
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

.asps {
  padding-top: 30px;
}

.asp {
  width: 50%;
}
</style>