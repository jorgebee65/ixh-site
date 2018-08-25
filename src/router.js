import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Advertisement from '@/components/Advertisement'
import Filtered from '@/components/Filtered'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/:adv_id',
      name: 'view-element',
      component: Advertisement
    },
    {
      path: '/filter/:cat_id',
      name: 'filtered-element',
      component: Filtered
    }
  ]
})

export default router;
