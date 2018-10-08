<template>
  <div class="login-view">
  	<div class="row">
      <p></p>
    </div>
  	<div class="container">
  		<h4>Inicio de sesión</h4>
	  	<div class="row">
	  		<h5 class="center">¿Ya tienes una cuenta? ingresa:</h5>
	  		<div class="col s12 m6 center">
	  			<h5>Con tus redes sociales</h5>
	  			<center>
	  				<a v-on:click="loginFB" ><img class="facebook" src="../assets/fblogin.png" /></a>
  					<img class="logo " src="../assets/logo.png">
  				</center>
	  		</div>
	  		<div class="col s12 m6 center">
	  			<h5>Con tu email</h5>
	  			<md-field md-clearable>
			      <label>Email</label>
			      <md-input v-model="email"></md-input>
			    </md-field>
			    <md-field>
			      <label>Password</label>
			      <md-input v-model="password" type="password"></md-input>
			    </md-field>
			    <md-button @click="login" class="md-raised md-primary center">Iniciar Sesión</md-button>
	  		</div>
	    </div>
	    <div class="row">
	    	<h6 class="center">¿Aún no tienes cuenta? <router-link to="/register"> Registrate aquí </router-link></h6>
	    </div>
    </div>
  </div>
</template>

<script>
	import firebase from 'firebase'
	import axios from 'axios'
	export default{
		name:'login-view',
	data(){
			return {
				email:'',
				password:''
			}
	},
	methods:{
		login:function(e){
			firebase.auth().signInWithEmailAndPassword(this.email, this.password)
			.then((datosUsuario) =>{
//				alert('Ha iniciado sesión con: '+this.email)
				this.$swal({
					  position: 'center',
					  type: 'success',
					  title: 'Ha iniciado sesión con: '+this.email,
					  showConfirmButton: true,
					  timer: 1500
					})
				this.$router.push('/')
			},
			err => 
				alert(err.message)
			)
			e.preventDefault()
		},
		loginFB:function(){
			console.log('Login')
			var provider = new firebase.auth.FacebookAuthProvider()
			provider.addScope('public_profile')
			firebase.auth().signInWithPopup(provider)
			.then((datosUsuario) =>{
				console.log('Searching user from Navbar')
				axios.get(global.ENVIRONMENT+'/ixh/users/'+datosUsuario.user.uid)
				.then(response=>{
			  		console.log('ID:'+response.data.id)
			  		this.userDB = response.data
			  	})
				.catch(e => {
					axios.post(global.ENVIRONMENT+'/ixh/users', {
						displayName: datosUsuario.user.displayName,
						email:datosUsuario.user.email,
						photoURL:datosUsuario.user.photoURL,
						uid:datosUsuario.user.uid
					})
					.then(response => {
						console.log(response)
					})
				    .catch(e => {
				      this.errors.push(e)
				    })
				})
				this.isLoggedIn=true
				$(".dropdown-trigger").dropdown()
			}).catch(function(error){
				console.log(error)
			})
		}
	}
}
</script>
<style>
.facebook {
	display: block;
  max-width:230px;
  max-height:95px;
  width: auto;
  height: auto;
}

.logo {
	display: block;
  max-width:256px;
  max-height:256px;
  width: auto;
  height: auto;
}
</style>
