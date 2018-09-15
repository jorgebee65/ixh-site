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
	  			<a v-on:click="registerFB" class="waves-effect waves-light btn-large facebook"><i class="material-icons left">cloud</i>Facebook</a>
	  		</div>
	  		<div class="col s12 m6 center">
	  			<h5>Crea un usuario</h5>
	  			<div class="row">
		  			<md-field :class="messageClass">
				      <label>Email</label>
				      <md-input v-model="email" required></md-input>
				      <span class="md-error">Sigue intentando... Sigo esperando por un email correcto</span>
				    </md-field>
				</div>
				<div class="row">
					<div class="col s12 m6 center">
						 <md-field :class="messageName">
					      <label>Nombre</label>
					      <md-input v-model="name" required></md-input>
					      <span class="md-error">Campo requerido</span>
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
						 <md-field :class="messagePassword">
					      <label>Password</label>
					      <md-input v-model="password" type="password" required></md-input>
					      <span class="md-error">Campo requerido</span>
					    </md-field>
					</div>
					<div class="col s12 m6 center">
						<md-field :md-toggle-password="false" :class="messageConfirmPass">
					      <label>Confirmar Password</label>
					      <md-input v-model="password2" type="password"></md-input>
					      <span class="md-error">No coincide</span>
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
				privacyPolicy:false,
				hasMessages: false,
				passMessages: false,
				nameMessage: false,
				passwordMessage: false,
				validated:false
			}
	},
	methods:{
		register:function(e){
			this.validate()
			if(this.validated){
				firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
				.then((datosUsuario) =>{
					//console.log('DatoUsuario'+datosUsuario)
					//console.log('DatoUsuario mas Usuario'+datosUsuario.user)
					//alert('Cuenta creada '+this.email)
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
					this.$swal({
					  position: 'center',
					  type: 'success',
					  title: 'Cuenta creada correctamente, inicia sesión',
					  showConfirmButton: true,
					  timer: 1500
					})
					this.$router.push('/')
				},
				err => {
					//alert(err.message)
					//console.log(err)
				      this.$swal({
						  type: 'error',
						  title: 'Oops...',
						  text: err.message
						})
					}
				)
				e.preventDefault()
			}else{
				console.log('some fields are no valid')
			}
		},
		registerFB:function(){
			console.log('Regitro con Facebook')
			var provider = new firebase.auth.FacebookAuthProvider()
			provider.addScope('public_profile')
			firebase.auth().signInWithPopup(provider)
			.then((datosUsuario) =>{
				console.log('Searching user from Navbar')
				axios.get(global.ENVIRONMENT+'/ixh/users/'+datosUsuario.user.uid)
				.then(response=>{
			  		alert('Ya tienes cuenta, inicia sesión')
			  		this.$router.push('/login')
			  	})
				.catch(e => {
					axios.post(global.ENVIRONMENT+'/ixh/users', {
						displayName: datosUsuario.user.displayName,
						email:datosUsuario.user.email,
						photoURL:datosUsuario.user.photoURL,
						uid:datosUsuario.user.uid
					})
					.then(response => {
						this.$swal({
						  position: 'center',
						  type: 'success',
						  title: 'Cuenta creada correctamente, inicia sesión',
						  showConfirmButton: true,
						  timer: 1500
						})
			  			this.$router.push('/login')
					})
				    .catch(e => {
				      this.errors.push(e)
				    })
				})
			}).catch(function(error){
				console.log(error)
			})
		},
		check_email(value){
			if (/^\w+([\.-]?\ w+)*@\w+([\.-]?\ w+)*(\.\w{2,3})+$/.test(value))
			{
				this.hasMessages = false
				console.log('Si')
			}else{
				this.hasMessages = true
				console.log('No')
			}
		},
		check_pass(value){
			if(value === this.password){
				this.passMessages = false
			}else{
				this.passMessages = true
			}
		},
		validate(){
			if(this.name==''){
				this.nameMessage=true
			}
			if(this.email==''){
				this.hasMessages=true
			}
			if(this.password == ''){
				this.passwordMessage = true
			}
			if(!this.nameMessage && !this.hasMessages && !this.passwordMessage ){
				this.validated = true
			}else{
			this.validated = false
			}
		}
	},
    watch:{
    	email(value){
			this.email = value
			this.check_email(value)
		},
		password2(value){
			this.check_pass(value)
		},
		name(value){
			if(value==''){
				this.nameMessage=true
			}else{
				this.nameMessage=false
			}
		},
		password(value){
			if(value==''){
				this.passwordMessage=true
			}else{
				this.passwordMessage=false
			}
		}
    },
    computed: {
      messageClass () {
        return {
          'md-invalid': this.hasMessages
        }
      },
      messageConfirmPass(){
      	 return {
          'md-invalid': this.passMessages
        }
      },
      messageName(){
      	return {
          'md-invalid': this.nameMessage
        }
      },
      messagePassword(){
      	return {
          'md-invalid': this.passwordMessage
        }
      }
    }
}
</script>
<style>
.facebook {
	background-color: #3B5998 !important;
}
.md-error{
	color: #EF6C00 !important;
}
</style>
