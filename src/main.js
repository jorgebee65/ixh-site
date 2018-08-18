import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Materializecss from 'materialize-css'
import 'materialize-css/dist/css/materialize.css'
import JQuery from 'jquery'
global.jQuery = jQuery
global.$ = jQuery
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
