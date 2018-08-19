<template>
  <div class="home">
  <div class="row">
      <div class="col s12 m4 l3"> <!-- Note that "m4 l3" was added -->
        <!-- Grey navigation panel

              This content will be:
          3-columns-wide on large screens,
          4-columns-wide on medium screens,
          12-columns-wide on small screens  -->
        <Sidemenu/>
      </div>
      <div class="col s12 m8 l9"> <!-- Note that "m8 l9" was added -->
        <!-- Teal page content

              This content will be:
          9-columns-wide on large screens,
          8-columns-wide on medium screens,
          12-columns-wide on small screens  -->
          <div class="container">
	          <div class="carousel carousel-slider center">
			    <a class="carousel-item" href="#one!"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Z%C3%B3calo_de_Ixhuatlancillo.jpg/1200px-Z%C3%B3calo_de_Ixhuatlancillo.jpg"></a>
			   	<a class="carousel-item" href="#one!"><img src="https://i.ytimg.com/vi/T34IBr-iYDA/maxresdefault.jpg"></a>
			   	<a class="carousel-item" href="#one!"><img src="https://static.panoramio.com.storage.googleapis.com/photos/large/19645822.jpg"></a>
			  </div>
		  </div>
      </div>
    </div>	
    <div class="container">
	    <div class="row">
		    <div v-for="adv in advs" v-bind:key="adv.advId" class="col s12 m4 l3">
		      <div class="card">
		        <div class="card-image">
		          <img v-bind:src="adv.image"/>
		        </div>
		        <div class="card-content">
		          <p>{{adv.title}}
		          </p>
		        </div>
		        <div class="card-action right-align">
		          <a href="#" class="btn-flat disabled tachado">$45.00</a>
		          <router-link :to="{name: 'view-element', params:{adv_id: adv.advId}}">
					  <a href="#">${{adv.price}}</a>
				  </router-link>
		        </div>
		      </div>
		    </div>
	    </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Sidemenu from '../components/Sidemenu'
import axios from 'axios'
export default {
  name: 'home',
  data(){
  	return{
	  	advs : ''	
  	}
  },
  components:{
    Sidemenu
  },
  mounted() {
  	axios.get('http://ixhuatlancillo.com:8080/ixh/advs').then(response=>{
  		console.log(response.data)
  		this.advs = response.data
  	})
  	this.$nextTick(()=>{
  		$('.carousel.carousel-slider').carousel({
		    fullWidth: true,
		    indicators: true
		  })
  		setInterval(function(){
  			$('.carousel.carousel-slider').carousel('next')
  		},4000)
  	})
  }
}
</script>
<style>


</style>
