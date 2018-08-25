import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Materializecss from 'materialize-css'
import VueMaterial from 'vue-material'
import 'materialize-css/dist/css/materialize.css'
import 'vue-material/dist/vue-material.min.css'
import './assets/css/app.css'
import JQuery from 'jquery'
global.jQuery = jQuery
global.$ = jQuery
Vue.config.productionTip = false
Vue.use(VueMaterial)

//global.ENVIRONMENT = 'http://localhost:8080'
global.ENVIRONMENT = 'http://ixhuatlancillo.com:8080'



new Vue({
  router,
  render: h => h(App)
}).$mount('#app')