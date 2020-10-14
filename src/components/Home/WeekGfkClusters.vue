<template>
  <div class="week">
    <div v-if="isLoading" class="load">
      <Loader />
    </div>

    <canvas class="canvas" ref="canvas"></canvas>  

  </div>
</template>

<script>
import { Line } from "vue-chartjs"


export default {
  name: "WeekChartUnits",
  extends: Line,
  data: () => ({
    isLoading: true,
    weeksValue: null,
    weeks: [],
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
      //         return (value/1000).toFixed(1)
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
            ticks: {
              callback: function (label, index, labels) {
                return (label / 1000).toFixed(0) + "k";
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
    this.weeksValue = await this.$store.dispatch("fetchGfkWeeksClusters");

    console.log( this.weeksValue )

    this.render();

    // console.log( this.weeks);

    this.isLoading = false;
    this.onInput()
  },

  methods: {
    onInput(){
      this.$emit('changeLoading', this.isLoading);
    },

    add() {
      let firstWeek = this.weeks.length;
      let newData = (this.weeksValue[this.weeksValue.length - 1 - firstWeek])

      if (this.weeks.length < this.weeksValue.length) {  
        this.weeks.unshift(newData)
        // console.log( newData.clasters['32'] )
        this.$data._chart.data.labels.unshift(newData.week)

        this.$data._chart.data.datasets[0].data.unshift(newData.clasters['32'])
        this.$data._chart.data.datasets[1].data.unshift(newData.clasters['40'])
        this.$data._chart.data.datasets[2].data.unshift(newData.clasters['43'])
        this.$data._chart.data.datasets[3].data.unshift(newData.clasters['50'])
        this.$data._chart.data.datasets[4].data.unshift(newData.clasters['55'])
        this.$data._chart.data.datasets[5].data.unshift(newData.clasters['60 >'])
        // console.log( this.$data._chart.data.datasets[0].data )

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
        this.$data._chart.data.datasets[0].data.shift(newData.units)
        this.$data._chart.data.datasets[1].data.shift(newData2.units)
        this.$data._chart.update()     
      }
    },

    dataset() {

    },

    render() {
      for (let i = this.num; i > 0; i--) {
        this.weeks.push(this.weeksValue[this.weeksValue.length - i])
      }

      this.renderChart(
        {
          labels: this.weeks.map((w) => w.week) || null,
          datasets: [
            {
              label: "32",
              fill: false,
              backgroundColor: "#7d8fed",
              borderColor: "#7d8fed",
              data: this.weeks.map((w,i) => w.clasters['32']  ),
            },
            {
              label: "40",
              fill: false,
              backgroundColor: "#677df8",
              borderColor: "#677df8",
              data: this.weeks.map((w,i) => w.clasters['40'] ),
            },
            {
              label: "43",
              fill: false,
              backgroundColor: "#4863f5",
              borderColor: "#4863f5",
              data: this.weeks.map((w,i) => w.clasters['43'] ),
            },
            {
              label: "50",
              fill: false,
              backgroundColor: "#2746ed",
              borderColor: "#2746ed",
              data: this.weeks.map((w,i) => w.clasters['50'] ),
            },
            {
              label: "55",
              fill: false,
              backgroundColor: "#0c2bd0",
              borderColor: "#0c2bd0",
              data: this.weeks.map((w,i) => w.clasters['55'] ),
            },
            {
              label: "60 >",
              fill: false,
              backgroundColor: "#01178d",
              borderColor: "#01178d",
              data: this.weeks.map((w,i) => w.clasters['60 >'] ),
            },
          ]
        }, 
        this.options);
    },


  },
//   beforeDestroy () {
//     this.$data._chart.destroy()
//     console.log( 'Chart destroyed' );
//   },
}
</script>

<style lang="scss" >
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