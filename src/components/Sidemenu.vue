<template>
	<div id="sidemenu">
		<ul class="collection">
		    <li v-for="cat in cats" v-bind:key="cat.catId" class="collection-item avatar">
		      <i class="material-icons circle">{{cat.icon}}</i>
		      <span class="title">{{cat.description}}</span>
		      <p>(1)</p>
		    </li>
		</ul>
	</div>
</template>
<script>
	import axios from 'axios'
	export default {
	  name: 'sidemenu',
	  data(){
	  	return{
		  	cats : ''
	  	}
	  },
	  mounted() {
	  	axios.get(global.ENVIRONMENT+'/ixh/cats').then(response=>{
	  		console.log(response.data)
	  		this.cats = response.data
	  	})
	  }
	}
</script>