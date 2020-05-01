<template>
        <!-- <Loader v-if="loading" />
        <div v-else="gfk.length" class="a">123</div> -->
        <table class="week">
            <thead>
                <tr>
                <th>BRAND</th>
                <th> W {{ lastWeek-1 }} </th>
                <th> W {{ lastWeek }} </th>         
                <th> Доля {{  }} </th>
                <th> {{ lastWeek }} - {{ lastWeek-1 }} </th>
                </tr>

                <tr>
                <td class="market">MARKET</td>
                <td class="market"> {{ summ | num }} </td>
                <td class="market"> {{ summ2 | num }} </td>         
                <td class="market"> </td>
                <td class="market"> {{  summ2/summ | per }} </td>
                </tr>

            </thead>

            <tbody>
                <tr 
                v-for="(tab) in table"
                :key= tab.brand
                >
                <td> {{ tab.brand }} </td>
                <td> {{ tab.val | num }} </td>
                <td> {{ tab.val2 | num }} </td>
                <td> {{ (tab.val2 / summ) | per }} </td>
                <td> {{ tab.val2 / tab.val | per }} </td>
                </tr>

            </tbody>
        </table>
</template>

<script>
//import Gfk from '../data/gfk.json'
import brands from '../data/brands'

export default {
data: () => ({
    loading: true,
    table: [],
    lastWeek: null,
    gfk: [],
    brands: [],
    summ: 0,
    summ2: 0
  }),

async mounted() {  
    this.gfk = await this.$store.dispatch('fetchGfk')
    this.lastWeek = this.gfk[1]
    this.gfk = this.gfk[0]
    console.log(this.gfk);
    
    this.table = []
    brands.forEach( el=> {
        el.val = 0
        el.val2 = 0
    } )
    this.table = brands
    for( let k in this.gfk ) {
      if( this.gfk[k].Week === this.lastWeek ) {
        this.summ += +this.gfk[k]['GFK Units']
      }
      if( this.gfk[k].Week === (this.lastWeek-1).toString() ) {
        this.summ2 += +this.gfk[k]['GFK Units']
      }
      this.table.forEach(el => {         
          if( el.brand === this.gfk[k].BRAND && this.gfk[k].Week === this.lastWeek) {
            el.val += +this.gfk[k]['GFK Units']
          }
          if( el.brand === this.gfk[k].BRAND && this.gfk[k].Week === (this.lastWeek-1).toString()) {
            el.val2 += +this.gfk[k]['GFK Units'] 
          }
        });   
    }
  },
  computed: {
  },
  
}
</script>

<style lang="scss" >
th, td {
    font-size: 12px;
  }
.week {
    width: 50%;
}
.market {
    background-color: rgb(187, 220, 241);
}
</style>