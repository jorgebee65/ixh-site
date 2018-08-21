<template>
	<div id="navbar">
	  <md-toolbar class="md-primary green darken-3">
      <md-button class="md-icon-button" @click="showNavigation = true">
        <md-icon>menu</md-icon>
      </md-button>
      <span class="md-title titleNav">Ixhua</span>
      <div class="md-toolbar-section-end">
        <md-button v-if="logOutBtn ===true" @click="logout" class="white-text" >Cerrar Sesión</md-button>
        <md-button v-else @click="login" class="white-text" >Iniciar Sesión</md-button>
      </div>
    </md-toolbar>
    <md-drawer :md-active.sync="showNavigation">
      <md-toolbar class="md-transparent" md-elevation="0">
        <span class="md-title">Ixhua</span>
      </md-toolbar>

      <md-list>
      	<md-list-item v-if="dispName != null">
            <md-icon>account_circle</md-icon>
      		<span class="md-list-item-text">{{dispName}}</span>
      	  </md-list-item>
          <md-list-item>
            <md-icon>move_to_inbox</md-icon>
            <span class="md-list-item-text"><router-link to="/"> Inicio</router-link></span>
        </md-list-item>
      </md-list>
    </md-drawer>
	</div>
</template>
<script>
	import firebase from 'firebase'
	export default{
		name: 'navbar',
		data: () => ({
		  logOutBtn:false,
		  showNavigation: false,
		  showSidepanel: false,
		  dispName:null
		}),
		methods:{
			validate:function(){
				console.log('validando inicio de sesión')
				if(firebase.auth().currentUser){
					console.log('Hay usuario')
					firebase.auth().currentUser.providerData.forEach(function (profile) {
					    this.dispName = profile.displayName
					  })
					this.logOutBtn=true
				}else{
					console.log('no Hay usuario')
					this.logOutBtn=false
				}
			},
			login:function(){
				console.log('Login')
				var provider = new firebase.auth.FacebookAuthProvider()
				provider.addScope('public_profile')
				firebase.auth().signInWithPopup(provider)
				.then((datosUsuario) =>{
					alert('Inicio sesión como: '+datosUsuario.user.displayName)
					this.dispName = datosUsuario.user.displayName
					this.logOutBtn= true
				}).catch(function(error){
					console.log(error)
				})
			},
			logout:function(){
				if(confirm('Are you sure to logout?')){
					var provider = new firebase.auth.FacebookAuthProvider()
					firebase.auth().signOut()
					.then(()=>{
						this.logOutBtn= false
					})
				}
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
</style>