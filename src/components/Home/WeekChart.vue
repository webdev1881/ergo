<template>
  <div class="week">
    <div v-if="isLoading" class="load">
      <Loader />
    </div>

    <canvas class="canvas" @ ref="canvas">
      
    </canvas>

    <button v-if="!isLoading" class="waves-effect waves-light btn-small" @click="add">Добавить</button>
    <button v-if="!isLoading" class="waves-effect waves-light btn-small" @click="remove">Удалить</button>



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
      let firstWeek = this.weeks.length;
      let newData = (this.weeksValue[this.weeksValue.length - 1 - firstWeek])
      if (this.weeks.length < this.weeksValue.length) {  
        this.weeks.unshift(newData);
        this.$data._chart.data.labels.unshift(newData.week);
        this.$data._chart.data.datasets[0].data.unshift(newData.units);
        this.$data._chart.update()     
      }
    },

    remove() {
      let firstWeek = this.weeks.length;
      let newData = (this.weeksValue[this.weeksValue.length - firstWeek])
      if (this.weeks.length <= this.weeksValue.length && this.weeks.length > 2) {       
        this.weeks.shift(newData);
        this.$data._chart.data.labels.shift(newData.week);
        this.$data._chart.data.datasets[0].data.shift(newData.units);
        this.$data._chart.update()     
      }
    },

    render() {
      for (let i = this.num; i > 0; i--) {
        this.weeks.push(this.weeksValue[this.weeksValue.length - i])
      }
      // console.log(this.weeks);
      this.renderChart(
        {
          labels: this.weeks.map((w) => w.week) || null,
          datasets: [
            {
              label: "GFK Units",
              fill: false,
              backgroundColor: "rgb(255, 99, 132)",
              borderColor: "rgb(255, 99, 132)",
              data: this.weeks.map((w) => w.units),
            },
          ],
        }, this.options);
    },


  },
};
</script>

<style lang="scss" >
.week {
  width: 50%;
}
.btn-small {
  margin-right: 20px;
}
</style>