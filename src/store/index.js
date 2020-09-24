import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({

  states: {
    brands: null
  },


  actions: {

    async fetchWeeksValue() {
      const res = await fetch('./gfk.json').then(res => res.json())
      const weeks = Array.from(new Set(res.map(({ Week }) => Week)))
      let weeksValue = []
      for (let w in weeks) {
        let sumUnits = 0
        let sumUAH = 0
        for (let v in res) {
          if (weeks[w] === res[v]["Week"]) {
            sumUnits = sumUnits + +res[v]["Sales Units"]
            sumUAH = sumUAH + +res[v]["Sales Value UAH"]
          }
        }
        weeksValue.push({ week: weeks[w], units: sumUnits, uah: sumUAH })
      }

      return weeksValue
    }



  }

})
