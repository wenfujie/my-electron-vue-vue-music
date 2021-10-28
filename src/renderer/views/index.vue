<!--
 * @Date: 2021-10-24 09:53:03
 * @LastEditors: wenfujie
 * @LastEditTime: 2021-10-28 10:17:11
 * @FilePath: /my-electron-vue-music/src/renderer/views/index.vue
-->
<template>
  <div class="index-main">
    <div class="view-cont">
      <MenuBar class="" />
      <div class="right">
        <Head />
        <MainContent class="main-cont" />
      </div>
    </div>

    <FootOperation />
  </div>
</template>

<script>
import Head from '@/components/Head.vue'
import FootOperation from '@/components/FootOperation.vue'
import MainContent from '@/components/MainContent.vue'
import MenuBar from '@/components/MenuBar.vue'
export default {
  components: {
    Head,
    FootOperation,
    MainContent,
    MenuBar
  },
  mounted () {
  }
}
</script>

<style scoped lang="scss">
.index-main {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.view-cont {
  display: flex;
  flex: 1;
  .right {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
}
.main-cont {
  height: calc(100% - 50px);
}
</style>
