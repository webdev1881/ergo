<template>
  <div class="week" @click='onInput'>
    <div v-if="isLoading" class="load">
      <Loader />
    </div>

    <canvas class="canvas" ref="canvas"></canvas>

    <!-- <div class="control">
      <button v-if="!isLoading" class="waves-effect waves-light btn-small" @click="add">
        <i class="material-icons dp48">keyboard_arrow_left</i>
      </button>
      <button v-if="!isLoading" class="waves-effect waves-light btn-small" @click="remove">
        <i class="material-icons dp48">keyboard_arrow_right</i>
      </button>
    </div> -->
    

  </div>
</template>

<script>
import { Line } from "vue-chartjs"


export default {
  name: "WeekChartUAH",
  extends: Line,
  data: () => ({
    isLoading: true,
    weeksValue: null,
    weeksValue2: null,
    weeks: [],
    weeks2: [],
    num: 6,
    options: {
      responsive: true,

      // plugins: {
      //   datalabels: {
      //     id: 'y-axis-1',
      //     backgroundColor: function(context) {
      //       return context.dataset.backgroundColor
      //     },
      //     formatter: function(value, context) {
      //         return (value/1000000).toFixed(1)
      //     },
      //     display: 'auto',
      //     anchor: 'start',
      //     align : 'top',
      //     color: 'white',
      //     value: {
      //       callback: function (label, index, labels) {
      //         return (value / 1000).toFixed(1) + "k";
      //       }
      //     },
      //   }
      // },
      
      scales: {
        yAxes: [
          {
            id: 'y-axis-3',
            ticks: {
              callback: function (label, index, labels) {
                return (label / 1000000).toFixed(0) + "m" ;
              },
            },
            scaleLabel: {
              display: true,
              labelString: "1M = 1 000 000",
            },
          },
          {
            id: 'y-axis-4',
            position: 'right',
            ticks: {
              callback: function (label, index, labels) {
                return (label / 1000000).toFixed(1)  + "m";
              },
            },
            scaleLabel: {
              display: false,
              labelString: "1M = 1 000 000",
            },
          },
        ],
      },
    },
  }),

  async mounted() {
    this.weeksValue = await this.$store.dispatch("fetchGfkWeeksValue")
    this.weeksValue2 = await this.$store.dispatch("fetchYugWeeksValue")
    this.render()
    this.isLoading = false
    this.onInput()
  },

  methods: {

    onInput( ){
      this.$emit('changeLoading', this.isLoading);
    },

    add() {
      let firstWeek = this.weeks.length;
      let newData = (this.weeksValue[this.weeksValue.length - 1 - firstWeek])
      let newData2 = (this.weeksValue2[this.weeksValue2.length - 1 - firstWeek])
      if (this.weeks.length < this.weeksValue.length) {  
        this.weeks.unshift(newData)
        this.weeks2.unshift(newData2)
        this.$data._chart.data.labels.unshift(newData.week)
        this.$data._chart.data.datasets[0].data.unshift(newData.uah)
        this.$data._chart.data.datasets[1].data.unshift(newData2.uah)
        this.$data._chart.update()     
      }
    },

    remove() {
      let firstWeek = this.weeks.length;
      let newData = (this.weeksValue[this.weeksValue.length - firstWeek])
      let newData2 = (this.weeksValue[this.weeksValue.length - firstWeek])
      if (this.weeks.length <= this.weeksValue.length && this.weeks.length > 2) {       
        this.weeks.shift(newData)
        this.weeks2.shift(newData2)
        this.$data._chart.data.labels.shift(newData.week)
        this.$data._chart.data.datasets[0].data.shift(newData.uah)
        this.$data._chart.data.datasets[1].data.shift(newData2.uah)
        this.$data._chart.update()     
      }
    },

    render() {
      for (let i = this.num; i > 0; i--) {
        this.weeks.push(this.weeksValue[this.weeksValue.length - i])
      }
      for (let i = this.num; i > 0; i--) {
        this.weeks2.push(this.weeksValue2[this.weeksValue2.length - i])
      }
      this.renderChart(
        {
          labels: this.weeks.map((w) => w.week) || null,
          datasets: [
            {
              label: "GFK UAH",
              yAxisID: 'y-axis-3',
              fill: false,
              backgroundColor: "rgb(63, 166, 236)",
              borderColor: "rgb(63, 166, 236)",
              data: this.weeks.map((w) => w.uah),
            },
            {
              label: "YUG UAH",
              yAxisID: 'y-axis-4',
              fill: false,
              backgroundColor: "rgb(255, 99, 132)",
              borderColor: "rgb(255, 99, 132)",
              data: this.weeks2.map((w) => w.uah),
            },
          ],
        }, this.options);
    },


  },
};
</script>

<style lang="scss" scoped >
.week {
  width: 50%;
}
.control {
    display: flex;
    justify-content: center;
    display: none;
}
.btn-small {
  margin: 0 10px 0 10px;
  i {
    font-size: 1.4rem !important;
  }
}

</style>