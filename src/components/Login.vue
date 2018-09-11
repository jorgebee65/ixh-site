<template>
  <div class="login-view">
  	<div class="row">
      <p></p>
    </div>
  	<div class="container">
	  	<div class="row">
	  		<h1>Login</h1>
	  		<h5 class="center">¿Ya tienes una cuenta? ingresa:</h5>
	  		<div class="col s12 m6 center">
	  			<h5>Con tus redes sociales</h5>
	  			<a class="waves-effect waves-light btn-large facebook"><i class="material-icons left">cloud</i>Facebook</a>
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
				alert('Ha iniciado sesión con: '+this.email)
				this.$router.push('/')
			},
			err => 
				alert(err.message)
			)
			e.preventDefault()
		}
	}
}
</script>
<style>
.facebook {
	background-color: #3B5998 !important;
}
</style>
