<template>
  <div>

    <div v-if="isLoading" class="load">
      <Loader />
    </div>

    <div style="height: 800px">
      <canvas class="canvas" ref="canvas"></canvas>
    </div>

  </div>
</template>

<script>
import { HorizontalBar } from "vue-chartjs"


export default {
  name: "WeekChartUnits",
  extends: HorizontalBar,
  data: () => ({
    isLoading: true,
    brandsValueGfk: null,
    urlGfk: './gfk.json',
    weeks: 3,
    lastWeek: 0,
    color:'#3fa6ec',
    options: {
      responsive: true,
      maintainAspectRatio: false,

      plugins: {
        datalabels: {
          id: 'y-axis-1',
          backgroundColor: function(context) {            
            // let index = context.dataIndex;
            // let val = context.dataset.data[index];
            // console.log(val); 
            return 
          },
          formatter: function(value, context) {

            return (value/1000).toFixed(2)
          },
          display: 'false',
          anchor: 'center',
          font: {size: 10},
          align : 'center',
          color: 'white',
          clip: true,
        }
      },
      
      tooltips: {
        position: 'nearest',
        callbacks: {
          label: function(tooltipItem, data) {
            let value = +tooltipItem.value
            return (value/1000).toFixed(1) + " k";
          }
        }
      },

      legend: {
        display: true,
        labels: {}
      },
      
      scales: {
        fontSize: 32,
        yAxes: [
          {
            id: 'y-axis-1',
            ticks: {
              callback: function (label, index, labels) {
                return label
              },
            },
            scaleLabel: {
              display: false,
              labelString: "1k = 1000",
            },
          },
        ],
      },
    },
  }),

  async mounted() {
    let fetchBrands = await this.$store.dispatch("fetchBrands", [this.urlGfk, this.weeks])
    this.brandsValueGfk = fetchBrands[0]
    this.lastWeek = fetchBrands[1]

    this.render();
    this.isLoading = false;

  },

  methods: {
    onInput(){
      this.$emit('changeLoading', this.isLoading);
    },

    // add() {
    //   let firstWeek = this.brandsGfk.length;
    //   let newDataGfk = (this.brandsValueGfk[this.brandsValueGfk.length - 1 - firstWeek])
    //   let newDataYug = (this.weeksValueYug[this.weeksValueYug.length - 1 - firstWeek])
    //   if (this.brandsGfk.length < this.brandsValueGfk.length) {  
    //     this.brandsGfk.unshift(newDataGfk)
    //     this.weeksYug.unshift(newDataYug)
    //     this.$data._chart.data.labels.unshift(newDataGfk.week)
    //     this.$data._chart.data.datasets[0].data.unshift(newDataGfk.uah)
    //     this.$data._chart.data.datasets[1].data.unshift(newDataYug.uah)
    //     this.$data._chart.update()     
    //   }
    // },

    // remove() {
    //   let firstWeek = this.brandsGfk.length;
    //   let newDataGfk = (this.brandsValueGfk[this.brandsValueGfk.length - firstWeek])
    //   let newDataYug = (this.brandsValueGfk[this.brandsValueGfk.length - firstWeek])
    //   if (this.brandsGfk.length <= this.brandsValueGfk.length && this.brandsGfk.length > 2) {       
    //     this.brandsGfk.shift(newDataGfk)
    //     this.weeksYug.shift(newDataYug)
    //     this.$data._chart.data.labels.shift(newDataGfk.week)
    //     this.$data._chart.data.datasets[0].data.shift(newDataGfk.uah)
    //     this.$data._chart.data.datasets[1].data.shift(newDataYug.uah)
    //     this.$data._chart.update()     
    //   }
    // },

    render() {
      this.renderChart(
        {
          labels: this.brandsValueGfk.map((w) => w.brand) || null,
          datasets: [
            {
              label: `W  ${this.lastWeek}`,
              AxisID: 'y-axis-1',
              fill: false,
              backgroundColor: this.color,
              borderColor: this.color,
              data: this.brandsValueGfk.map((w,i) => w.weeks[this.lastWeek].ASP),
            },
            {
              label:  `W  ${this.lastWeek-1}`,
              AxisID: 'y-axis-1',
              fill: false,
              backgroundColor: this.color,
              borderColor: this.color,
              data: this.brandsValueGfk.map((w,i) => w.weeks[this.lastWeek-1].ASP),
            },
            {
              label:  `W  ${this.lastWeek-2}`,
              yAxisID: 'y-axis-1',
              fill: false,
              backgroundColor: this.color,
              borderColor: this.color,
              data: this.brandsValueGfk.map((w,i) => w.weeks[this.lastWeek-2].ASP),
            },
          ],
        }, 
        this.options)
    },


  },
  beforeDestroy () {
    this.$data._chart.destroy()
    console.log( 'Chart destroyed YugASP' );
  },
}
</script>

<style lang="scss" scoped >

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