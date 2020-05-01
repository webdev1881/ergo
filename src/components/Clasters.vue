<template>
  <div>555

    <div>000</div>

    <div v-if="isLoading" class="load">
      <!-- <Loader /> -->
    </div>

    <div>123</div>




  </div>


</template>

<script>
//import HomeCur from "@/components/HomeCur";

import Gfk from '../data/gfk.json'


export default {
  name: "clasters",
  data: () => ({
    isLoading: true,
    clasters: null,
  }),
  mounted() {
    
  //  console.log( 'disp:', Gfk );
    
    

  },
  methods: {
    // async refresh() {
    //   this.isLoading = true
    //   this.clasters = await this.$store.dispatch('fetchGfk')
    //   console.log( this.clasters ) 
    //   this.isLoading = false
    // },
  },
  // components: { HomeBill, HomeCur }
};

</script>

<style lang="scss" scoped>

.btn {
  min-width: 45px;
}

.load {
  display: flex;
  justify-content: center;
  padding-top: 40px;
}
       


</style>