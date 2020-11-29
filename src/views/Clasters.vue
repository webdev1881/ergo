<template>
 <div class="clusters_brands" >
  <div v-if="isLoading" class="load">
   <Loader />
  </div>
  

  <div class="clasters">
   <div class="title" v-show="isLoadedClasters">Clusters</div>
   <div class="charts">
    <WeekGfkClusters @changeLoading="loadedClasters" />
    <WeekYugClusters @changeLoading="loadedClasters" />
   </div>
   <div class="arrows" v-show="isLoadedClasters">
    <button class="waves-effect waves-light btn-small" @click="addWeeksClaster">
     <i class="material-icons dp48">keyboard_arrow_left</i>
    </button>
    <button class="waves-effect waves-light btn-small" @click="removeWeeksClaster">
     <i class="material-icons dp48">keyboard_arrow_right</i>
    </button>
   </div>
  </div>

  <div class="brands">
   <div class="title" v-show="isloadedBrand">Brands</div>

  <!-- _________________________________________________________________SELECT -->
   <div class="select" > 
    <select class="wrap" ref="select" v-model="brand" >
     <option v-for="b in brands" :key="b" :value="b">{{ b }}</option>
    </select>
    <label>Materialize Select</label>
   </div>

   <div class="charts">
    <BrandGfkClusters :brand="brand" @changeLoadingBrand="loadedBrand" />
    <BrandYugClusters :brand="brand" @changeLoadingBrand="loadedBrand" />
   </div>
   <div class="arrows" v-show="isloadedBrand">
    <button class="waves-effect waves-light btn-small" @click="addWeeksClasterBrand">
     <i class="material-icons dp48">keyboard_arrow_left</i>
    </button>
    <button class="waves-effect waves-light btn-small" @click="removeWeeksClasterBrand">
     <i class="material-icons dp48">keyboard_arrow_right</i>
    </button>
   </div>
  </div>
 </div>
</template>

<script>
import WeekGfkClusters from "@/components/Clasters/WeekGfkClusters";
import WeekYugClusters from "@/components/Clasters/WeekYugClusters";

import BrandGfkClusters from "@/components/Clasters/BrandGfkClusters";
import BrandYugClusters from "@/components/Clasters/BrandYugClusters";

import brands from "../data/brands";

export default {
 name: "clasters",
 data: () => ({
  isLoading: true,
  isLoadedClasters: false,
  isloadedBrand: false,
  brands: [],
  brand: "ERGO",
 }),

 async mounted() {

  this.brands = brands;
  Chart.defaults.global.plugins.datalabels.display = false

  setTimeout(() => this.select = M.FormSelect.init(this.$refs.select))

  this.isLoading = false;

 },


 methods: {
  loadedClasters(value) {
   this.isLoadedClasters = true;
  },
  loadedBrand(value) {
   this.isloadedBrand = true;
  },

  addWeeksClaster() {
   this.$children[0].add();
   this.$children[1].add();
  },
  removeWeeksClaster() {
   this.$children[0].remove();
   this.$children[1].remove();
  },

  addWeeksClasterBrand() {
   this.$children[2].add();
   this.$children[3].add()
  },
  removeWeeksClasterBrand() {
   this.$children[2].remove();
   this.$children[3].remove()
  },
 },

 components: {
  WeekGfkClusters,
  WeekYugClusters,
  BrandGfkClusters,
  BrandYugClusters
 },
};
</script>

<style lang="scss" scoped>

.clusters_brands {
    padding: 7px;
}

.load {
 display: flex;
 justify-content: center;
 padding-top: 40px;
}

.arrows {
 display: flex;
 justify-content: center;
 // display: none;
}

.charts {
 width: 100%;
 display: flex;
 justify-content: space-around;
}

.title {
 font-size: 1.5rem;
 display: flex;
 justify-content: center;
}

.arrows {
 display: flex;
 justify-content: center;
 // display: none;
}

hr {
 border: 0;
 height: 1px;
 background-image: linear-gradient(left, #f0f0f0, #8c8c8c, #f0f0f0);
}

.brands {
 width: 100%;
 padding-top: 50px;
}

.brand {
 width: 50%;
}

.select {
    display: flex;
    justify-content: center;
}

.select-wrapper {
    width: 370px;
}


</style>