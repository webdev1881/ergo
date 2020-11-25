<template>
 <div>
  <div v-if="isLoading" class="load">
   <Loader />
  </div>

  <div>
   <div class="md-layout md-gutter">
    <div class="md-layout-item">
     <md-field>
      <label for="brand"> {{ brand }} </label>
      <md-select  name="brand" id="movie">
       <md-option value="fight-club">Fight Club</md-option>
       <md-option value="godfather">Godfather</md-option>
       <md-option value="godfather-ii">Godfather II</md-option>
       <md-option value="godfather-iii">Godfather III</md-option>
       <md-option value="godfellas">Godfellas</md-option>
       <md-option value="pulp-fiction">Pulp Fiction</md-option>
       <md-option value="scarface">Scarface</md-option>
      </md-select>
     </md-field>
    </div>
   </div>
  </div>

  <div>
   <canvas class="canvas" ref="canvas"></canvas>
  </div>


  



 </div>
</template>


 </div>
</template>

<script>
import { Line } from "vue-chartjs";
import brands from "../../data/brands";

export default {
 name: "BrandsChartUnits",
 extends: Line,
 data: () => ({
  items: ["Foo", "Bar", "Fizz", "Buzz"],
  isLoading: true,
  brandValueGfk: null,
  urlGfk: "./gfk.json",
  weeks: [],
  num: 6,
  lastWeek: 0,
  select: null,
  current: null,
  brands: [],
  brand: "SAMSUNG",
  options: {
   responsive: true,

   plugins: {
    datalabels: {
     color: "red",
     id: "y-axis-1",
     backgroundColor: function (context) {
      return context.dataset.backgroundColor;
     },
     formatter: function (value, context) {
      return value.toFixed(0);
     },
     display: "auto",
     anchor: "start",
     align: "top",
     color: "black",
     value: {
      callback: function (label, index, labels) {
       return (value / 1000).toFixed(1) + "k";
      },
     },
    },
   },

   scales: {
    yAxes: [
     {
      ticks: {
       backdropColor: "black",
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
        if (index === 3) {
         return label;
        }
        // console.log( labels );
        return label;
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
  this.brands = brands;

  // this.select = M.FormSelect.init(this.$refs.select);

  // setTimeout(() => M.updateTextFields());

  // document.addEventListener('DOMContentLoaded', function() {
  //   var elems = document.querySelectorAll('select');
  //   var instances = M.FormSelect.init(elems, options);
  // });

  let fetchBrandsClusters = await this.$store.dispatch(
   "fetchBrandGfkClusters",
   this.urlGfk
  );

  this.brandValueGfk = fetchBrandsClusters.filter((b) => {
   return b.brand === this.brand;
  });
  // setTimeout( () => M.updateTextFields() )

  console.log(brands);

  this.render();
  this.isLoading = false;
 },

 methods: {
  onInput() {
   this.$emit("changeLoading", this.isLoading);
  },

  // add() {
  //   let firstWeek = this.brandsGfk.length;
  //   let newDataGfk = (this.brandValueGfk[this.brandValueGfk.length - 1 - firstWeek])
  //   let newDataYug = (this.weeksValueYug[this.weeksValueYug.length - 1 - firstWeek])
  //   if (this.brandsGfk.length < this.brandValueGfk.length) {
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
  //   let newDataGfk = (this.brandValueGfk[this.brandValueGfk.length - firstWeek])
  //   let newDataYug = (this.brandValueGfk[this.brandValueGfk.length - firstWeek])
  //   if (this.brandsGfk.length <= this.brandValueGfk.length && this.brandsGfk.length > 2) {
  //     this.brandsGfk.shift(newDataGfk)
  //     this.weeksYug.shift(newDataYug)
  //     this.$data._chart.data.labels.shift(newDataGfk.week)
  //     this.$data._chart.data.datasets[0].data.shift(newDataGfk.uah)
  //     this.$data._chart.data.datasets[1].data.shift(newDataYug.uah)
  //     this.$data._chart.update()
  //   }
  // },

  render() {
   for (let i = this.num; i > 0; i--) {
    this.weeks.push(
     this.brandValueGfk[0].weeks[this.brandValueGfk[0].weeks.length - i]
    );
   }

   // console.log( this.weeks );

   this.renderChart(
    {
     labels: this.weeks.map((w) => w.week) || null,
     datasets: [
      {
       label: "32",
       fill: false,
       backgroundColor: "#75B34B",
       borderColor: "#75B34B",
       data: this.weeks.map((w, i) => w.clasters["32"].UNITS),
      },
     ],
    },
    this.options
   );
  },
 },
 // beforeDestroy () {
 //   this.$data._chart.destroy()
 //   console.log( 'Chart destroyed YugASP' );
 // },
};
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