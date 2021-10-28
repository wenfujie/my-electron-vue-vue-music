<!--
 * @Date: 2021-10-24 10:12:34
 * @LastEditors: wenfujie
 * @LastEditTime: 2021-10-28 15:19:33
 * @FilePath: /my-electron-vue-music/src/renderer/components/MenuBar.vue
-->
<template>
  <div class="cont">
    <ul>
      <li v-for="item in menus" :key="item.id">
        <p
          :class="{
            selected: item.router === $route.path
          }"
        >
          {{ item.value }}
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      menus: [{ id: 'songMap', value: '歌单', router: '/index/song-map' }]
    }
  }
}
</script>

<style scoped lang="scss">
.cont {
  width: 230px;
  background-color: #efefef;
}
ul {
  li {
    font-size: 16px;
    padding-right: 8px;
    box-sizing: border-box;
    p {
      line-height: 34px;
      padding-left: 15px;
      &.selected {
        color: red;
        background-color: #e7e7e7;
      }
      &:hover {
        background-color: #e7e7e7;
      }
    }
  }
}
</style>
