<template>
	<div id="navbar">
	  <md-toolbar class="md-primary orange darken-3">
      <router-link class="publicolli" to="/">Publicolli</router-link>
      <div class="md-toolbar-section-end">
        <md-menu v-if="isLoggedIn" md-direction="bottom-start">
        	<md-avatar>
		      <img :src="userDB.photoURL" alt="Avatar">
		    </md-avatar>
	      <md-button class="white-text" md-menu-trigger>{{userDB.displayName}}</md-button>
	      <md-menu-content>
			    <md-menu-item v-md-to="{name: 'mycupons-el', params:{usr_id: userDB.id}}">Mis Cupones</md-menu-item>
	        	<md-menu-item @click="active = true">Cerrar Sesión</md-menu-item>
	      </md-menu-content>
    	</md-menu>
        <md-button v-if="!isLoggedIn" to="/login" class="white-text" >Iniciar Sesión</md-button>
        <md-button v-if="!isLoggedIn" to="/register" class="white-text" >Registrar</md-button>
      </div>
      <div class="hide-on-small-only">
      <a class="waves-effect waves-light btn-flat white-text">55 5435-2034</a>
  	  </div>
    </md-toolbar>
    <md-dialog-confirm
      :md-active.sync="active"
      md-title="Cerrar Sesión"
      md-content="Por favor confirme el cierre de sesión."
      md-confirm-text="Aceptar"
      md-cancel-text="Cancelar"
      @md-cancel="onCancel"
      @md-confirm="logout" />
	</div>
</template>
<script>
	import axios from 'axios'
	import firebase from 'firebase'
	export default{
		name: 'navbar',
		data: () => ({
		  isLoggedIn:false,
		  showNavigation: false,
		  showSidepanel: false,
		  userDB:'',
		  active: false,
		}),
		methods:{
			validate:function(){
				firebase.auth().onAuthStateChanged((user)=>{
					if (user) {
					axios.get(global.ENVIRONMENT+'/ixh/users/'+firebase.auth().currentUser.uid)
					.then(response=>{
				  		this.userDB = response.data
				  	})
				  	this.isLoggedIn=true
				  	$(".dropdown-trigger").dropdown()
				  } else {
						this.isLoggedIn=false
				  }
				})
			},
			logout:function(){
				//if(confirm('Are you sure to logout?')){
					var provider = new firebase.auth.FacebookAuthProvider()
					firebase.auth().signOut()
					.then(()=>{
						this.$router.push('/')
					})
					this.validate()
				//}
			},
			onCancel:function(){
				console.log('Cancel')
			}
		},
		mounted() {
			this.validate()
		}
	}
</script>
<style >
	.titleNav{
		font-family: 'Pacifico', cursive;
		color: white;
	}
	.md-drawer {
    width: 230px;
    background-color: white;
  }
  .md-menu-content-container {
    background-color: white;
  }
  .md-dialog-container{
  	background-color: white;	
  }
</style>