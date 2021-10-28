<!--
 * @Date: 2021-10-24 10:12:21
 * @LastEditors: wenfujie
 * @LastEditTime: 2021-10-28 10:00:19
 * @FilePath: /my-electron-vue-music/src/renderer/components/Head.vue
-->
<template>
  <div class="main">
    <div class="main-cont">
      <router-link to="/index/song-map">
        <i class="el-icon-s-home icon-home"></i>
      </router-link>
      <i
        @click="routerGo(-1)"
        :class="[
          'el-icon-arrow-left',
          { 'btn-disabled': $route.path === '/index/song-map' },
        ]"
      ></i>
      <!-- TODO: 判断是否是最后一天历史栈，是的话增加禁用类 -->
      <i @click="routerGo(1)" class="el-icon-arrow-right"></i>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    routerGo (step) {
      this.$router.go(step)
    }
  },
  mounted () {
    console.log(this.$route, '===')
  }
}
</script>

<style scoped lang="scss">
.main {
  height: 50px;
  display: flex;
  align-items: center;
  .main-cont {
    padding: 0 15px;
  }
}
.icon-home {
  margin-right: 15px;
}
</style>
