import Vue from 'vue'
import Vuex from 'vuex'
import Gfk from '../data/gfk.json'

Vue.use(Vuex)

export default new Vuex.Store({


  actions: {

    async fetchGfk({dispatch, commit}) {
      try {
        let lastWeek = Gfk.Лист1[Gfk.Лист1.length-1].Week
        //console.log(lastWeek);
        
        return [ Gfk.Лист1, lastWeek ]
      } catch (e) {
        throw e
      }
    }
  }

})
