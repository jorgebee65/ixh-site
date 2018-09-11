import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Advertisement from '@/components/Advertisement'
import Filtered from '@/components/Filtered'
import Cupons from '@/components/Cupons'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Aviso from '@/components/AvisoDePrivacidad'
import firebase from 'firebase'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        requiresGuest:true
      }
    },
    {
      path: '/aviso',
      name: 'aviso',
      component: Aviso
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
       meta: {
        requiresGuest:true
      }
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
    },
    {
      path: '/myCupons/:usr_id',
      name: 'mycupons-el',
      component: Cupons,
      meta: {
        requiresAuth:true
      }
    }
  ]
})

router.beforeEach((to,from,next) =>{
  if(to.matched.some(record => record.meta.requiresAuth)){
    firebase.auth().onAuthStateChanged((user)=>{
    if (!user) {
      next({
        path:'/login',
        query: {
          redirect: to.fullPath
        }
      })
    }else{
      next();
    }})
  }else if(to.matched.some(record => record.meta.requiresGuest)){
     firebase.auth().onAuthStateChanged((user)=>{
     if (user) {
      next({
        path:'/',
        query: {
          redirect: to.fullPath
        }
      });
    }else{
      next()
    }})
  }else{
    next()
  }
})

export default router
