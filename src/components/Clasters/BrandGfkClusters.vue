<template>
  <div>

    <div v-if="isLoading" class="load">
      <Loader />
    </div>

    <div>
      <canvas class="canvas" ref="canvas"></canvas>
    </div>

  </div>
</template>

<script>
import { Line } from "vue-chartjs"


export default {
  name: "BrandsChartUnits",
  extends: Line,
  data: () => ({
    isLoading: true,
    brandsValueGfk: null,
    urlGfk: './gfk.json',
    weeks: 6,
    lastWeek: 0,
    color:'#3fa6ec',
    brand: 'ERGO',
    options: {
      responsive: true,

      plugins: {
        datalabels: {
          color: 'red',
          id: 'y-axis-1',
          backgroundColor: function(context) {                 
            return context.dataset.backgroundColor
          },
          formatter: function(value, context) {
            return (value/1000).toFixed(1)
          },
          display: 'auto',
          anchor: 'start',
          align : 'top',
          color: 'black',
          value: {
            callback: function (label, index, labels) {
              return (value / 1000).toFixed(1) + "k";
            }
          },
        }
      },

      scales: {
        yAxes: [
          {
            ticks: {
              backdropColor: 'black',
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
        xAxes: [
          {
            ticks: {
              callback: function (label, index, labels) {
                // console.log( this );
                if(index === 3) {
                  return label
                }
                // console.log( labels );
                return label
              },
            },
            scaleLabel: {
              // display: true,
            },
          },
        ],
      },
      
    },
  }),

  async mounted() {
    let fetchBrandsClusters = await this.$store.dispatch("fetchBrandsClusters", [this.urlGfk, this.weeks])
    // this.lastWeek = fetchBrands[1]
    
    // this.brandsValueGfk = fetchBrands[0].filter( b => {return b.brand === this.brand})

    // console.log( this.brandsValueGfk );

    // this.render();
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

    // render() {
    //   this.renderChart(
    //     {
    //       labels: this.brandsValueGfk.map((w,index) => Object.keys(w.weeks) ) || null,
    //       datasets: [
    //         {
    //           label: `W  ${this.lastWeek}`,
    //           AxisID: 'y-axis-1',
    //           fill: false,
    //           backgroundColor: this.color,
    //           borderColor: this.color,
    //           data: this.brandsValueGfk.map((w,i) => w.weeks[this.lastWeek].ASP),
    //         },
    //       ],
    //     }, 
    //     this.options)
    // },


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