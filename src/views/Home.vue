<template>
  <div class="home">
    <div class="row">
      <p></p>
    </div>
  <div class="row">
      <div class="col s12 m4 l3"> <!-- Note that "m4 l3" was added -->
        <Sidemenu/>
      </div>
      <div class="col s12 m8 l9"> <!-- Note that "m8 l9" was added -->
          <div class="container">
	          <div class="carousel carousel-slider center">
			    <a class="carousel-item" href="#one!"><img src="https://cdn.needish.com/is-prod-deals/wjGGiyYGv6qYLqEcwGgGzw/scale/900x600.jpg"></a>
			   	<a class="carousel-item" href="#one!"><img src="https://cdn.needish.com/is-prod-deals/hVewvbYrT2IhtRBqCHQZaQ/scale/900x600.jpg"></a>
			   	<a class="carousel-item" href="#one!"><img src="https://cdn.needish.com/is-prod-deals/wN2ndFBalTEoqMbRYh0Tew/scale/900x600.jpg"></a>
			  </div>
		  </div>
      </div>
    </div>

    <div class="container">
	    <div class="row" v-for="i in Math.ceil(advs.length / 4)">
		    <div v-for="adv in advs.slice((i-1)*4, i*4)" v-bind:key="adv.id" class="col s12 m3">
          <router-link :to="{name: 'view-element', params:{adv_id: adv.id}}">
            <md-card class="black-text" md-with-hover>
            <md-ripple>
              <md-card-area>
                <md-card-media>
                  <img v-bind:src="adv.image"/>
                </md-card-media>
                <md-card-header>
                  <div class="md-subhead right-align">
                    <md-icon>access_alarms</md-icon> Finaliza {{adv.ends| moment("from", "now") }}
                  </div>
                </md-card-header>
                <md-card-content>
                  {{adv.title}}                  
                </md-card-content>
            </md-card-area>
              <md-card-actions>
                <md-button class="btn-flat disabled tachado">{{adv.sOriginalPrice}}</md-button>
                <md-button>{{adv.sPrice}}</md-button>
              </md-card-actions>
            </md-ripple>
          </md-card>
        </router-link>
		    </div>
	    </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import firebaseInit from '../components/firebaseInit'
import Sidemenu from '../components/Sidemenu'
import axios from 'axios'
export default {
  name: 'home',
  data(){
  	return{
	  	advs : '',
      groups : ''
  	}
  },
  components:{
    Sidemenu
  },
  mounted() {
  	axios.get(global.ENVIRONMENT+'/ixh/advs').then(response=>{
  		this.advs = response.data
  	})
   
    
  	this.$nextTick(()=>{
  		$('.carousel.carousel-slider').carousel({
		    fullWidth: true,
		    indicators: true
		  })
  		setInterval(function(){
  			$('.carousel.carousel-slider').carousel('next')
  		},5000)
  	})
  }
}
</script>
<style>


</style>
