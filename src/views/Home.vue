<template>
  <div class="home">

    <div class="weeks">
      <WeekChartUnits />
      <WeekChartUAH />
    </div>

    

    <!-- <button @click="addWeeks"> keyboard_arrow_right </button>
    <button @click="removeWeeks"> keyboard_arrow_right </button> -->


    <div class="arrows">
      <button class="waves-effect waves-light btn-small" @click="addWeeks">
        <i class="material-icons dp48">keyboard_arrow_left</i>
      </button>
      <button class="waves-effect waves-light btn-small" @click="removeWeeks">
        <i class="material-icons dp48">keyboard_arrow_right</i>
      </button>
    </div>



  </div>
</template>


<script>

import WeekChartUnits from "@/components/Home/WeekChartUnits"
import WeekChartUAH from "@/components/Home/WeekChartUAH"

export default {
  name: "home",
  created() {},
  computed: {},

  methods: {
    addWeeks() {
      this.$children[0].add()
      this.$children[1].add()
    },
    removeWeeks() {
      this.$children[0].remove()
      this.$children[1].remove()
    }
  },

  components: {
    WeekChartUnits,
    WeekChartUAH},
};

</script>


<style lang="scss" scoped >
.weeks {
  width: 100%;
  display: flex;
  justify-content: space-around;
}

.arrows {
  display: flex;
  justify-content: center;
  // display: none;
}


</style>