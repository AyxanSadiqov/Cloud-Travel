<template>
  <div id="app">
    <!-- <router-link to="/">Home</router-link> -->
    <router-view/>
  </div>
</template>

<script>
export default {
  beforeCreate () {
    document.querySelector('body').setAttribute('style', 'background:#E5E5E5')
  },
  beforeDestroy () {
    document.querySelector('body').setAttribute('style', '')
  }
}
</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Mulish&display=swap');
  #app{
    font-family: 'Mulish', sans-serif;
  }
</style>
