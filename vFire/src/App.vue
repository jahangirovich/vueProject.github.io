<template>
  <div id="app">
    <navbar></navbar>
    <router-view/>
  </div>
</template>

<script>
  import navbar from './components/navbar'
export default {
    components:{
      'navbar':navbar,

    },
  name: 'App'
}
</script>

<style>
  body{
    margin:0 auto;
  }
</style>
