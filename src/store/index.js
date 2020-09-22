import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({

  states: {
    brands: null
  },


  actions: {

    async fetchJson(  ) {
      const res = await fetch('./gfk.json')
        .then(res => res.json())
      return await res
    },



  }

})
