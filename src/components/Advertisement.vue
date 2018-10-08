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
	        	
	        	<div id="info-adv" class="viewport">
			      <md-toolbar :md-elevation="1">
			        <span class="md-title">Descuento</span>
			      </md-toolbar>
			      <div class="row">
		        	<div class="center-align">
		        		<a href="#" class="btn-flat disabled tachado">{{adv.sOriginalPrice}}</a>
		        	</div>
		        	<div class="light-green-text price center-align">{{adv.sPrice}}</div>
		        	 <div class="center-align">
				       <a @click="buy()" class="waves-effect waves-light btn">Lo Quiero!</a>
				  	 </div>
				   </div>
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
	  	<div>
	  		<div class="fixed-action-btn">
			  <a v-if="showScrollBtn" class="btn-floating btn-large orange darken-2 pulse" @click="topFunction()">
			    <i class="large material-icons">open_in_browser</i>
			  </a>
			</div>
	  	</div>
      </div>
      <md-dialog-confirm
      :md-active.sync="active"
      md-title="Iniciar Sesión"
      md-content="Para adquirir el cupón debe iniciar sesión"
      md-confirm-text="Iniciar Sesión"
      md-cancel-text="Cancelar"
      @md-cancel="onCancel"
      @md-confirm="goLogin" />
	</div>
</template>
<script>
	import axios from 'axios'
	import firebase from 'firebase'
	export default{
		name:'view-element',
	data(){
			return {
				adv : '',
				active: false,
				showScrollBtn: false
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
			console.log('comprar')
			firebase.auth().onAuthStateChanged((user)=>{
				if (user) {
					var fuid = firebase.auth().currentUser.uid
							axios({
								url:global.ENVIRONMENT+'/ixh/cupons',
					    	method: 'POST',
					    	headers: {
									'Content-Type': 'application/json',
						    	uid: fuid 
						  	},
					    	data:{
									adv:this.adv
								}
							})
							.then(response => {
								console.log(response)
								this.$swal({
									position: 'center',
									type: 'success',
									title: 'Tu cupón está disponible en "Mis cupones"',
									showConfirmButton: true
								})
							})
							.catch(e => {
								this.$swal({
									type: 'error',
									title: 'Error',
									text: e.message
								})
									console.log(e)
							})
				}else{
						console.log('Debe iniciar sesión')
				}
			})
			console.log('comprado')
		},
		onCancel:function(){
			console.log('Cancel')
		},
		goLogin:function(){
			console.log('Iniciar Sesión')
			this.$router.push('/login')
		},
		topFunction:function(){
		    document.body.scrollTop = 0; // For Safari
    		document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
		},
		handleScroll: function (event) {
          var scrollTp = event.srcElement.scrollingElement.scrollTop
          if (scrollTp > 20) {
          		this.showScrollBtn = true
		    } else {
		        this.showScrollBtn = false
		    }
        }
	},
	mounted(){
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
	},
	created: function () {
        window.addEventListener('scroll', this.handleScroll);
    },
    destroyed: function () {
        window.removeEventListener('scroll', this.handleScroll);
    }
}
</script>
<style>
  #map {
        height: 400px;  /* The height is 400 pixels */
        width: 100%;  /* The width is the width of the web page */
       }
</style>