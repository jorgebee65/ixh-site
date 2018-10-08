<template>
	<div id="sidemenu">
		<md-list>
			<div v-for="cat in cats" v-bind:key="cat.id">
			<md-list-item :to="{name: 'filtered-element', params:{cat_id: cat.id}}">
			      <md-icon>{{cat.icon}}</md-icon>
			      <span class="title">{{cat.category}}</span>
			      {{cat.count}}
			</md-list-item>
			</div>
		</md-list>
		<center>
			<img class="logo " src="../assets/logo.png">
		</center>
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
	      this.cats = response.data
	    })
	  }
	}
</script>
<style lang="scss" scoped>
  .md-list {
    width: 320px;
    max-width: 100%;
    display: inline-block;
    vertical-align: top;
    border: 1px solid rgba(#000, .12);
  }
</style>