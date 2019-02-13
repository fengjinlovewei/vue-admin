<template lang="html">
  <div class="logo-page" mid>
      <img :src="url">
  </div>
</template>

<script>
export default {
  data(){
    return {
      url:require('../../assets/images/bigLogo.jpg')
    }
  },
  mounted(){

  }
}
</script>

<style>
  .logo-page{
    height: 100%;
    text-align: center;
  }
  .logo-page img{
    width: 70%;
    vertical-align: middle;
  }
</style>
