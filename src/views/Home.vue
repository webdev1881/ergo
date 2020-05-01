<template>
  <div class="home">
    <!-- <h5>Главная</h5> -->
    <TopTable />
    <TopClaster />
  </div>
</template>



<script>
TopClaster
import TopTable from "@/components/TopTable";
import TopClaster from "@/components/TopTable";

export default {
  name: "home",
  
  data: () => ({
    gfk: {}
  }),

  created() {
    
  },

//   mounted() {

    
    
//     console.log(  brands )
//     this.table = brands
//     this.prelastWeek = (this.lastWeek-1).toString()

//     //console.log(  this.gfk[0] );

//     for( let k in this.gfk ) {

//       if( this.gfk[k].Week === this.lastWeek ) {
//         this.summ += +this.gfk[k]['GFK Units']
//       }
      
//       this.table.forEach(el => {         
//           if( el.brand === this.gfk[k].BRAND && this.gfk[k].Week === this.lastWeek) {
//             el.val += +this.gfk[k]['GFK Units']
//           }
//           if( el.brand === this.gfk[k].BRAND && this.gfk[k].Week === (this.prelastWeek)) {
//             el.val2 += +this.gfk[k]['GFK Units'] 
//           }
//         });   
//     }

// //brands = []

//     // console.log(  this.summ.toLocaleString("en", {minimumFractionDigits: 1} ) )
//     // console.log(  this.table )
//     console.log(  brands )
      

      
    

  
      
//   },
//   computed: {
//     lastWeek() {
//       return this.gfk[this.gfk.length-1].Week
//     }
//   },
  components: {
    TopTable,
    TopClaster
  }
};
</script>


<style lang="scss" >

.home {
  width: 100%;
  display: flex;
  justify-content: space-around;
}
h5 {
  display: block;
}
td,th {
  padding: 0 5px !important;
}

</style>