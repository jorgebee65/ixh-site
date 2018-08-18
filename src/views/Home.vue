<template>
  <div class="home">
  <div class="row">
      <div class="col s12 m4 l3"> <!-- Note that "m4 l3" was added -->
        <!-- Grey navigation panel

              This content will be:
          3-columns-wide on large screens,
          4-columns-wide on medium screens,
          12-columns-wide on small screens  -->
        <div class="collection">
	      <a href="#!" class="collection-item">Alvin</a>
	      <a href="#!" class="collection-item active">Alvin</a>
	      <a href="#!" class="collection-item">Alvin</a>
	      <a href="#!" class="collection-item">Alvin</a>
      	</div>
      </div>
      <div class="col s12 m8 l9"> <!-- Note that "m8 l9" was added -->
        <!-- Teal page content

              This content will be:
          9-columns-wide on large screens,
          8-columns-wide on medium screens,
          12-columns-wide on small screens  -->
          <div class="container">
	          <div class="carousel carousel-slider center">
	          	<div class="carousel-fixed-item center">
			      <a class="btn waves-effect">button</a>
			    </div>
			    <a class="carousel-item" href="#one!"><img src="https://cdn.needish.com/is-prod-deals/2UoRrKFHJfPW6GXxdQkpqQ/scale/900x600.jpg"></a>
			   	<a class="carousel-item" href="#one!"><img src="https://cdn.needish.com/is-prod-deals/LRAmGotkBukRVxFHVw48Mg/scale/900x600.jpg"></a>
			   	<a class="carousel-item" href="#one!"><img src="https://cdn.needish.com/is-prod-deals/b_7G_XbFi8tOQ22SmazaYg/scale/900x600.jpg"></a>
			  </div>
		  </div>
      </div>
    </div>	
    <div class="container">
	    <div class="row">
	    	<div class="col s1 m4">
	    		<div class="row">
				    <div class="col s12 m7">
				      <div class="card">
				        <div class="card-image">
				          <img src="https://cdn.needish.com/is-prod-deals/LRAmGotkBukRVxFHVw48Mg/scale/460x279.jpg">
				          <span class="card-title">Card Title</span>
				        </div>
				        <div class="card-content">
				          <p>I am a very simple card. I am good at containing small bits of information.
				          </p>
				        </div>
				        <div class="card-action">
				          <a href="#">This is a link</a>
				        </div>
				      </div>
				    </div>
				</div>
	    	</div>
	    </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'home',
  mounted() {
  	this.$nextTick(()=>{
  		$('.carousel.carousel-slider').carousel({
		    fullWidth: true,
		    indicators: true
		  })
  		setInterval(function(){
  			$('.carousel.carousel-slider').carousel('next')
  		},3000)
  	})
  }
}
</script>
