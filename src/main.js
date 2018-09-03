import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Materializecss from 'materialize-css'
import VueMaterial from 'vue-material'
import 'materialize-css/dist/css/materialize.css'
import 'vue-material/dist/vue-material.min.css'
import './assets/css/app.css'
import JQuery from 'jquery'
import mdTo from "vue-md-to"
import VueSweetalert2 from 'vue-sweetalert2'

const moment = require('moment')
require('moment/locale/es')

global.jQuery = jQuery
global.$ = jQuery
Vue.config.productionTip = false
Vue.use(VueMaterial)
Vue.use(mdTo);
Vue.use(require('vue-moment'), {
    moment
})
Vue.use(VueSweetalert2)

global.ENVIRONMENT = 'http://localhost:8080'
//global.ENVIRONMENT = 'http://publicolli.com:8080'



new Vue({
  router,
  render: h => h(App)
}).$mount('#app')