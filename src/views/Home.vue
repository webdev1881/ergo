<template>
  <div class="home">

    <WeekChart />

  </div>
</template>



<script>

import WeekChart from "@/components/Home/WeekChart";

export default {
  name: "home",
  created() {},
  computed: {},
  components: {WeekChart},
};
</script>


<style lang="scss" >
.home {
  width: 100%;
  // display: flex;
  // justify-content: space-around;
}


</style>