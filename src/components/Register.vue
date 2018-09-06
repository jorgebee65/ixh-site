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
					<md-checkbox v-model="array" value="1">Acepto los términos y condiciones y las 
						<router-link to="/aviso">politicas de privacidad</router-link>
					</md-checkbox>
				</div>
			    <md-button class="md-raised md-primary center">Registrar</md-button>
	  		</div>
	    </div>
	    <div class="row">
	    	
	    </div>
    </div>
  </div>
</template>

<script>
	export default{
		name:'register-view',
	data(){
			return {
				user:'',
				password:''
			}
	}
}
</script>
<style>
.facebook {
	background-color: #3B5998 !important;
}
</style>
