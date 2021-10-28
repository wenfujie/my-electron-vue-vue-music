<!--
 * @Date: 2021-10-24 10:13:56
 * @LastEditors: wenfujie
 * @LastEditTime: 2021-10-28 14:44:15
 * @FilePath: /my-electron-vue-music/src/renderer/components/MainContent.vue
-->
<template>
  <div class="main-content-main">
    <CurrPlaySongs />
    <router-view></router-view>
  </div>
</template>

<script>
import CurrPlaySongs from '@/components/MainContent/CurrPlaySongs.vue'
export default {
  components: {CurrPlaySongs},
  data () {
    return {}
  },
  methods: {

  },
  mounted () {
    console.log(this.$route.path, '==')
  }
}
</script>

<style scoped lang="scss">
.main-content-main{
  overflow: auto;
}
</style>
