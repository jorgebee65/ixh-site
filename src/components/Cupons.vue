<template>
  <div class="mycupons-el">
  	<div class="row">
      <p></p>
    </div>
  	<div class="container">
	  	<div class="row">
	  		<md-card v-for="cup in cupons" v-bind:key="cup.id">
		      <md-card-header>
		        <md-card-header-text>
		          <div class="md-title">{{cup.adv.title}}</div>
		          <div class="md-subhead hcupon">{{cup.code}}</div>
		        </md-card-header-text>

		        <md-card-media>
		          <img v-bind:src="cup.adv.image"/>
		        </md-card-media>
		      </md-card-header>
		      <md-card-content>
          		{{cup.adv.description}}
       		  </md-card-content>
       		  <md-card-actions>
		        <md-button class="md-raised md-accent">Descargar</md-button>
		      </md-card-actions>
		    </md-card>
	    </div>
    </div>
  </div>
</template>

<script>
	import axios from 'axios'
	export default{
		name:'mycupons-el',
	data(){
			return {
				cupons : ''
			}
	},
	beforeRouteEnter(to,from,next){
		console.log('Id del Usuario:'+to.params.usr_id)
		axios.get(global.ENVIRONMENT+'/ixh/users/'+to.params.usr_id+'/cupons/')
			.then(response=>{
	  			next(vm=>{
					vm.cupons = response.data
				})	
  			})
	},
	watch:{
			'$route':'fetchData'
	},
	methods:{
		
	}
}
</script>
<style>
.hcupon{
	color: #EF6C00;
	font-weight: bolder !important;
	font-size: 30px !important;
}

</style>
