import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Loader from '@/components/Loader'
import Gfk from './data/gfk.json'

import numFilter from './filters/num.filter'
import perFilter from './filters/persent.filter'

Vue.config.productionTip = false

Vue.component('Loader', Loader);

Vue.filter('num', numFilter);
Vue.filter('per', perFilter);

Vue.use(Gfk)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
