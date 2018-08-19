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
	        	<div>Descuento {{adv.discount}}% </div>
	        	<div class="right-align">
	        		<a href="#" class="btn-flat disabled tachado">${{normalprice}}</a>
	        	</div>
	        	<div class="light-green-text price">${{adv.price}}</div>
	      </div>
	      <div class="center-align">
	      	<a class="waves-effect waves-light btn-large">Comprar</a>
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
				adv : '',
				normalprice:''
			}
	},
	beforeRouteEnter(to,from,next){
		console.log('Paso este parametro: '+to.params.adv_id)
		axios.get('http://ixhuatlancillo.com:8080/ixh/advs/'+to.params.adv_id)
			.then(response=>{
	  			next(vm=>{
					console.log('arre')
					vm.adv = response.data
					vm.normalprice = response.data.price * (1+ (response.data.discount/100 ))
				})	
  			})
	},
	watch:{
			'$route':'fetchData'
	},
	methods:{
		fetchData(){

		}
	}
}
</script>
<style>
  
</style>