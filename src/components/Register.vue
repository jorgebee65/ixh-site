<template>
  <div class="register-view">
  	<div class="row">
      <p></p>
    </div>
  	<div class="container">
	  	<div class="row">
	  		<h1>Regístrate</h1>
	  		<h6 class="center">¿Ya tienes una cuenta? <router-link to="/login"> Inicia Sesión </router-link></h6>
	  		<div class="col s12 m6 center">
	  			<h5>Con tus redes sociales</h5>
	  			<a class="waves-effect waves-light btn-large facebook"><i class="material-icons left">cloud</i>Facebook</a>
	  		</div>
	  		<div class="col s12 m6 center">
	  			<h5>Crea un usuario</h5>
	  			<div class="row">
		  			<md-field md-clearable>
				      <label>Email</label>
				      <md-input v-model="email"></md-input>
				    </md-field>
				</div>
				<div class="row">
					<div class="col s12 m6 center">
						 <md-field>
					      <label>Nombre</label>
					      <md-input v-model="name"></md-input>
					    </md-field>
					</div>
					<div class="col s12 m6 center">
						<md-field>
					      <label>Apellidos</label>
					      <md-input v-model="lastname"></md-input>
					    </md-field>
					</div>
				</div>
				<div class="row">
					<div class="col s12 m6 center">
						 <md-field>
					      <label>Password</label>
					      <md-input v-model="password" type="password"></md-input>
					    </md-field>
					</div>
					<div class="col s12 m6 center">
						<md-field :md-toggle-password="false">
					      <label>Confirmar Password</label>
					      <md-input v-model="password2" type="password"></md-input>
					    </md-field>	
					</div>
				</div>
				<div class="row">
					<md-checkbox v-model="privacyPolicy" value="1">Acepto los términos y condiciones y las 
						<router-link to="/aviso">politicas de privacidad</router-link>
					</md-checkbox>
				</div>
			    <md-button @click="register" class="md-raised md-primary center">Registrar</md-button>
	  		</div>
	    </div>
	    <div class="row">
	    	
	    </div>
    </div>
  </div>
</template>

<script>
	import firebase from 'firebase'
	import axios from 'axios'
	export default{
		name:'register-view',
	data(){
			return {
				email:'',
				password:'',
				name:'',
				lastname:'',
				password2:'',
				privacyPolicy:false
			}
	},
	methods:{
		register:function(e){
			firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
			.then((datosUsuario) =>{
				console.log('DatoUsuario'+datosUsuario)
				console.log('DatoUsuario mas Usuario'+datosUsuario.user)
				alert('Cuenta creada '+this.email)
				axios.post(global.ENVIRONMENT+'/ixh/users', {
								displayName: this.name,
								email:this.email,
								photoURL:'https://txstate.rightanswers.com/portal//app/images/default-avatar.jpg',
								uid:datosUsuario.user.uid
							})
							.then(response => {
								console.log(response)
							})
						    .catch(e => {
						      this.errors.push(e)
						    })
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
