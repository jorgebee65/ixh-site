<template>
	<div id="sidemenu">
		<ul class="collection">
		    <li v-for="cat in cats" v-bind:key="cat.id" class="collection-item avatar">
			    <router-link :to="{name: 'filtered-element', params:{cat_id: cat.id}}">
			      <i class="material-icons circle">{{cat.icon}}</i>
			      <span class="title">{{cat.category}}</span>
			      <p>{{cat.count}}</p>
			    </router-link>
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
	  	axios.get(global.ENVIRONMENT+'/ixh/groups').then(response=>{
	      console.log(response.data)
	      this.cats = response.data
	    })
	  }
	}
</script>