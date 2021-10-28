<!--
 * @Date: 2021-10-22 10:29:05
 * @LastEditors: wenfujie
 * @LastEditTime: 2021-10-25 11:29:51
 * @FilePath: /my-electron-vue-music/src/renderer/App.vue
-->
<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'my-electron-vue-vue-music'
  }
</script>

<style>
@import url(./assets/styles/public.scss);

  /* CSS */
  *{
    margin: 0;
    padding: 0;
  }
  html,body,#app{
    height: 100%;
  }
</style>
