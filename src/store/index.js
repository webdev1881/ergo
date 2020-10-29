import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({

  states: {
    brands: null
  },


  actions: {

    async fetchGfkWeeksValue() {
      const res = await fetch('./gfk.json').then(res => res.json())
      const weeks = Array.from(new Set(res.map(({ Week }) => Week)))
      let weeksValue = []
      for (let w in weeks) {
        let units = 0
        let uah = 0
        for (let v in res) {
          if (weeks[w] === res[v]["Week"]) {
            units = units + +res[v]["Sales Units"]
            uah = uah + +res[v]["Sales Value UAH"]
          }
        }
        weeksValue.push({ week: weeks[w], units: units, uah: uah })
      }
      return weeksValue
    },

    async fetchYugWeeksValue() {
      const res = await fetch('./yug.json').then(res => res.json())
      const weeks = Array.from(new Set(res.map(({ Week }) => Week)))
      let weeksValue = []
      for (let w in weeks) {
        let units = 0
        let uah = 0
        for (let v in res) {
          if (weeks[w] === res[v]["Week"]) {
            units = units + +res[v]["Sales Units"]
            uah = uah + +res[v]["Sales Value UAH"]
          }
        }
        weeksValue.push({ week: weeks[w], units: units, uah: uah })
      }
      return weeksValue
    },

    async fetchGfkWeeksClusters() {
      const res = await fetch('./gfk.json').then(res => res.json())
      const weeks = Array.from(new Set(res.map(({ Week }) => Week)))
      const clasters = Array.from(new Set(res.map(({ SIZE }) => SIZE)))

      let weeksValue = []

      for (let w in weeks) { // перебор уникальных недель
        let weekClaster = clasters.reduce((newObj, item) => {
          newObj[item] = 0
          return newObj
        }, {});     
        for (let v in res) {
          if (weeks[w] === res[v]["Week"]) {
            for (let c in clasters) {
              if (clasters[c] === res[v].SIZE) {
                weekClaster[clasters[c]] = weekClaster[clasters[c]] + +res[v]["Sales Units"]
              }
            }

          }
        }
        let weekGroupClaster = {
          '32':0,
          '40':0,
          '43':0,
          '50':0,
          '60 >':0,
        }
        for (let g in weekClaster) {
          switch (true) {
            case g >= 31.5 && g <= 32:
              weekGroupClaster[32] += weekClaster[g]
              break;
            case g >= 38.5 && g <= 40:
              weekGroupClaster[40] += weekClaster[g]
              break;
            case g >= 42 && g <= 43:
              weekGroupClaster[43] += weekClaster[g]
              break;
            case g >= 45 && g <= 55:
              weekGroupClaster[50] += weekClaster[g]
              break;
            case g >= 58:
              weekGroupClaster['60 >'] += weekClaster[g]
              break;
          }         
        }       
        weeksValue.push( {week: weeks[w], clasters: weekGroupClaster} )
      }
      // console.log( weeksValue )
      return weeksValue
    },

    async fetchAll() {
      const res = await fetch('./gfk.json').then(res => res.json())
      const weeks = Array.from(new Set(res.map(({ Week }) => Week)))
      const clasters = Array.from(new Set(res.map(({ SIZE }) => SIZE)))
      const brands = Array.from(new Set(res.map(({ BRAND }) => BRAND)))

      let weeksValue = []

      for (let w in weeks) { // перебор уникальных недель

        let weekClaster = clasters.reduce((newObj, item) => {
          newObj[item] = 0
          return newObj
        }, {})

        let weekBrands = brands.reduce((newObj, item) => {
          newObj[item] = 0
          return newObj
        }, {})

        // console.log(weekBrands)
        // break

        for (let v in res) {

          if (weeks[w] === res[v]["Week"]) {

            for (let c in clasters) { // clasters
              if (clasters[c] === res[v].SIZE) {
                weekClaster[clasters[c]] = weekClaster[clasters[c]] + +res[v]["Sales Units"]
              }
            }

            for (let b in brands) { // brands
              if (brands[b] === res[v].BRAND) {
                weekBrands[brands[b]] = weekBrands[brands[b]] + +res[v]["Sales Units"]
              }
            }

          }

        }
        let weekGroupClaster = {
          '32':0,
          '40':0,
          '43':0,
          '50':0,
          '55':0,
          '60 >':0,
        }
        for (let g in weekClaster) { // switch
          switch (true) {
            case g >= 31.5 && g <= 32:
              weekGroupClaster[32] += weekClaster[g]
              break;
            case g >= 38.5 && g <= 40:
              weekGroupClaster[40] += weekClaster[g]
              break;
            case g >= 42 && g <= 43:
              weekGroupClaster[43] += weekClaster[g]
              break;
            case g >= 45 && g <= 50:
              weekGroupClaster[50] += weekClaster[g]
              break;
            case g >= 54.6 && g <= 55:
              weekGroupClaster[55] += weekClaster[g]
              break;
            case g >= 58:
              weekGroupClaster['60 >'] += weekClaster[g]
              break;
          }         
        }       
        weeksValue.push( {week: weeks[w], clasters: weekGroupClaster, brands: weekBrands} )
      }
      // console.log( weeksValue )
      return weeksValue
    }


  }

})
