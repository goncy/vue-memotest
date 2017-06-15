import Vue from 'vue'

import App from './App'

import 'tachyons'
import 'font-awesome/css/font-awesome.css'

Vue.config.productionTip = false

new Vue({
  el: '#app',
  template: '<App/>',
  components: {App}
})
