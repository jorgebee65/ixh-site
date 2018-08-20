<template>
	<div id="navbar">
	  <md-toolbar class="md-primary green darken-3">
      <md-button class="md-icon-button" @click="showNavigation = true">
        <md-icon>menu</md-icon>
      </md-button>
      <span class="md-title titleNav">Ixhua</span>
      <div class="md-toolbar-section-end">
        <md-button class="white-text" >Iniciar Sesión</md-button>
      </div>
    </md-toolbar>
    <md-drawer :md-active.sync="showNavigation">
      <md-toolbar class="md-transparent" md-elevation="0">
        <span class="md-title">Ixhua</span>
      </md-toolbar>

      <md-list>
        <md-list-item>
          <md-icon>move_to_inbox</md-icon>
          <span class="md-list-item-text">Iniciar Sesión</span>
        </md-list-item>
      </md-list>
    </md-drawer>
	</div>
</template>
<script>
  export default{
    name: 'navbar',
	data: () => ({
      showNavigation: false,
      showSidepanel: false
    })
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