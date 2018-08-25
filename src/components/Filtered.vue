<template>
  <div class="filtered-view">
  	<div class="row">
  		<div class="container">
  			<form>
  			<div class="col s8 m6">
		  		<md-field>
		          <label for="category">Filtrar</label>
		          <md-select v-model="catSelected" name="category" id="category">
		            <md-option v-for="cat in cats" v-bind:key="cat.id" :value="cat.description">{{cat.description}}</md-option>
		          </md-select>
		        </md-field>
	    	</div>
	    </form>
	    	<div class="col s4 m2">
	    		<md-button v-on:click="doSearch" class="md-primary">Buscar</md-button>
	    	</div>
  		</div>
    </div>
    <div class="container">
	    <div class="row">
		  <div v-for="adv in advs" v-bind:key="adv.id" class="col s12 m4 l3">
	          <router-link :to="{name: 'view-element', params:{adv_id: adv.id}}">
	            <md-card class="black-text" md-with-hover>
	            <md-ripple>
	              <md-card-area>
	                <md-card-media>
	                  <img v-bind:src="adv.image"/>
	                </md-card-media>
	                <md-card-header>
	                  <div class="md-subhead">{{adv.title}}</div>
	                </md-card-header>
	            </md-card-area>
	              <md-card-actions>
	                <md-button class="btn-flat disabled tachado">{{adv.sOriginalPrice}}</md-button>
	                <md-button>{{adv.sPrice}}</md-button>
	              </md-card-actions>
	            </md-ripple>
	          </md-card>
	        </router-link>
		  </div>
	    </div>
    </div>
  </div>
</template>

<script>
	import axios from 'axios'
	export default{
		name:'filtered-view',
	data(){
			return {
				advs : '',
				cats: '',
				catSelected: {}
			}
	},
	beforeRouteEnter(to,from,next){
		axios.get(global.ENVIRONMENT+'/ixh/advs/category/'+to.params.cat_id)
			.then(response=>{
	  			next(vm=>{
					vm.advs = response.data
				})	
  			})
	},
	watch:{
			'$route':'fetchData'
	},
	methods:{
		doSearch(){
			console.log('Categoria: '+this.catSelected)
			axios.get(global.ENVIRONMENT+'/ixh/advs/scategory/'+this.catSelected)
			.then(response=>{
				this.advs = response.data
  			})
		}
	},
	mounted(){
		axios.get(global.ENVIRONMENT+'/ixh/cats')
		.then(response=>{
			this.cats = response.data
  		})
	}
}
</script>
<style>


</style>
