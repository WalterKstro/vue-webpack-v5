<template>
  <div class="wrapper">
    <Navigaitor />
    <Slider />
  </div>
</template>

<script>
// import Navigaitor from './components/Navigaitor.vue'
// import Slider from './components/Slider.vue'

  export default {
    name : 'App',
    components : {
      Navigaitor : () => import( 
        /* webpackChunkName: "Navigaitor" */ './components/Navigaitor.vue'),
      Slider : () => import( 
        /* webpackChunkName: "Slider", 
        webpackPrefetch:true */ './components/Slider.vue')
      }
  }
</script>

<style lang="scss">
*,
*::after,
*::before{
  font-size: 62.5%;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
html{
  font-family: Arial;
}


.banner{
  max-width: 1024px;
  width: 100%;
  height: 50vh;
  margin-right: auto;
  margin-left: auto;
  background-image: url(./assets/bowl.jpg);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>