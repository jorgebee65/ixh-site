<template>
  <div class="app">
    <Navbar/>
    <router-view/>
    <Footer/>
  </div>
</template>

<script>
  import Navbar from './components/Navbar'
  import Footer from './components/Footer'
  
export default {
  name: 'app',
  data: () => ({
  }),
  components:{
    Navbar,
    Footer
  }
}
</script>