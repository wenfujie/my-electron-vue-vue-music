<!--
 * @Date: 2021-10-24 11:24:47
 * @LastEditors: wenfujie
 * @LastEditTime: 2021-10-28 14:34:47
 * @FilePath: /my-electron-vue-music/src/renderer/components/MainContent/SongMap.vue
-->
<template>
  <div class="song-map">
    <ul class="map-ul">
      <li
        v-for="item in personalized"
        :key="item.id"
        @click="clickSongMap(item)"
      >
        <img :src="item.picUrl" alt="" />
        <p>{{ item.name }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import { personalized } from '@/api'

export default {
  data () {
    return {
      personalized: []
    }
  },
  methods: {
    clickSongMap (item) {
      this.$router.push({
        path: '/index/song-list',
        query: {
          id: item.id
        }
      })
    },
    getPersonalized () {
      personalized().then((res) => {
        // alg: "cityLevel_combine";
        // canDislike: true;
        // copywriter: "热门推荐";
        // highQuality: false;
        // id: 2989708405;
        // name: "纯音乐|心理医生催眠曲";
        // picUrl: "http://p3.music.126.net/COLKgKg4aKndBtbuUyNl5A==/1798801023047443.jpg";
        // playCount: 138989;
        // trackCount: 23;
        // trackNumberUpdateTime: 1599247726735;
        // type: 0;
        this.personalized = res.result
      })
    }
  },
  created () {
    this.getPersonalized()
  }
}
</script>

<style scoped lang="scss">
.song-map {
  height: 100%;
  overflow: auto;
  padding: 20px 40px 0 40px;
  box-sizing: border-box;
}
.map-ul {
  display: flex;
  flex-wrap: wrap;
  li {
    width: 20%;
    box-sizing: border-box;
    padding: 7px;
    font-size: 14px;
    line-height: 1.3;
    margin-bottom: 15px;
    img {
      width: 100%;
      border-radius: 8px;
      margin-bottom: 5px;
    }
  }
}
</style>
