<template>
  <div class="week">
    <div v-if="isLoading" class="load">
      <Loader />
    </div>

    <canvas class="canvas" ref="canvas"></canvas>

    <button  class="waves-effect waves-light btn" @click="add" >654654645</button>

  </div>
</template>

<script>
import { Line } from "vue-chartjs";

export default {
  name: "WeekChart",
  extends: Line,
  data: () => ({
    isLoading: true,
    weeksValue: null,
    weeks: [],
    num: 7,
    options: {
      responsive: true,
      scales: {
        yAxes: [
          {
            ticks: {
              callback: function (label, index, labels) {
                return label / 1000 + "k";
              },
            },
            scaleLabel: {
              display: true,
              labelString: "1k = 1000",
            },
          },
        ],
      },
    },
  }),

  async mounted() {
    this.weeksValue = await this.$store.dispatch("fetchWeeksValue");
    this.render();
    this.isLoading = false;
  },

  methods: {
    add() {
        // let firstWeek = +this.weeks[0].week
        // this.weeks.push(this.weeksValue[this.weeksValue.length - +firstWeek])
        // console.log( this.weeks);
    },
    render() {
      for (let i = this.num; i > 0; i--) {
        this.weeks.push(this.weeksValue[this.weeksValue.length - i])
      }
      this.renderChart(
        {
          labels: this.weeks.map((w) => w.week),
          datasets: [
            {
              label: "GFK Units",
              fill: false,
              backgroundColor: "rgb(255, 99, 132)",
              borderColor: "rgb(255, 99, 132)",
              data: this.weeks.map((w) => w.units),
            },
          ],
        },
        this.options
      );
    },
  },
};
</script>

<style lang="scss" >
.week {
  width: 50%;
}
</style>