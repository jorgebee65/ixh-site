<template>
	<div id="view-element">
		<div class="container">
        <!-- Page Content goes here -->
        <h4>{{adv.title}}</h4>
        <div class="row">
	      <div class="col s12 m8">
	        <img class="responsive-img" v-bind:src="adv.image"/>
	        <h5>Resumen</h5>
	        <div>{{adv.description}}</div>
	      </div>
          <div class="col s12 m4">
	        	<div>Descuento {{adv.discount}}</div>
	        	<div class="center-align">
	        		<a href="#" class="btn-flat disabled tachado">{{adv.sOriginalPrice}}</a>
	        	</div>
	        	<div class="light-green-text price center-align">{{adv.sPrice}}</div>
	        	 <div class="center-align">
			       <a @click="buy()" class="waves-effect waves-light btn">Información</a>
			  	 </div>
	        	<div id="info-adv" class="viewport">
			      <md-toolbar :md-elevation="1">
			        <span class="md-title">Detalles del Anuncio</span>
			      </md-toolbar>

			      <md-list class="md-double-line">
			        <md-subheader>Phone</md-subheader>

			        <md-list-item>
			          <md-icon class="md-primary">phone</md-icon>

			          <div class="md-list-item-text">
			            <span>{{adv.phone}}</span>
			            <span>Mobile</span>
			          </div>

			          <md-button class="md-icon-button md-list-action">
			            <md-icon>sms</md-icon>
			          </md-button>
			        </md-list-item>

			        <md-divider></md-divider>
			        <md-subheader v-if="adv.email != null">Email</md-subheader>

			        <md-list-item v-if="adv.email != null">
			          <md-icon class="md-primary">email</md-icon>

			          <div class="md-list-item-text">
			            <span>{{adv.email}}</span>
			            <span>Personal</span>
			          </div>
			        </md-list-item>
			        <md-divider></md-divider>
			        <md-subheader v-if="adv.facebook != null || adv.instagram != null || adv.web != null">Redes Sociales</md-subheader>

			        <md-list-item v-if="adv.facebook != null">
			          <md-icon class="md-primary">supervisor_account</md-icon>

			          <div class="md-list-item-text">
			            <span>{{adv.facebook}}</span>
			            <span>Facebook</span>
			          </div>
			        </md-list-item>
			        <md-list-item v-if="adv.instagram != null">
			          <md-icon class="md-primary">photo_camera</md-icon>

			          <div class="md-list-item-text">
			            <span>{{adv.instagram}}</span>
			            <span>Instagram</span>
			          </div>
			        </md-list-item>
			        <md-list-item v-if="adv.web != null">
			          <md-icon class="md-primary">public</md-icon>

			          <div class="md-list-item-text">
			            <span>{{adv.web}}</span>
			            <span>Sitio Web</span>
			          </div>
			        </md-list-item>
			      </md-list>
			    </div>
	      </div>
	    </div>
	    <div class="row">
	      <div class="col s12 m10 l6">
	      	<h5>Ubicación</h5>
	      	<div id="map"></div>
	      </div>
	  	</div>
      </div>
	</div>
</template>
<script>
	import axios from 'axios'
	export default{
		name:'view-element',
	data(){
			return {
				adv : ''
			}
	},
	beforeRouteEnter(to,from,next){
		axios.get(global.ENVIRONMENT+'/ixh/advs/'+to.params.adv_id)
			.then(response=>{
	  			next(vm=>{
					vm.adv = response.data
				})	
  			})
	},
	watch:{
			'$route':'fetchData'
	},
	methods:{
		fetchData(){
			console.log(this.adv.latitude)
		},
		buy(){
			$('#info-adv').show()
		}
	},
	mounted(){
		$('#info-adv').hide()
		this.$nextTick(function () {
	    // Code that will run only after the
	    // entire view has been rendered
    	  var uluru = {lat: this.adv.latitude, lng: this.adv.longitude};
		  // The map, centered at Uluru
		  var map = new google.maps.Map(
		      document.getElementById('map'), {zoom: 18, center: uluru});
		  // The marker, positioned at Uluru
		  var marker = new google.maps.Marker({position: uluru, map: map});
  		})
	}
}
</script>
<style>
  #map {
        height: 400px;  /* The height is 400 pixels */
        width: 100%;  /* The width is the width of the web page */
       }
</style>