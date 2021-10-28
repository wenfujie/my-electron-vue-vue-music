<!--
 * @Date: 2021-10-24 11:48:50
 * @LastEditors: wenfujie
 * @LastEditTime: 2021-10-28 14:40:45
 * @FilePath: /my-electron-vue-music/src/renderer/components/MainContent/SongList.vue
-->
<template>
  <div class="song-list-main">
    <div class="song-list-main__describe">
      <img :src="playlist.creator.avatarUrl" />
      <div class="right">
        <p class="title">{{ playlist.name }}</p>
        <p>{{ playlist.creator.nickname }}</p>
      </div>
    </div>
    <el-table
      :data="playlist.tracks"
      empty-text="你还没有添加任何歌曲"
      style="width: 100%; height: 100%;"
      stripe
      @row-dblclick="clickSong"
    >
      <el-table-column label="" width="40" align="center">
        <template slot-scope="scope">
          <i
            class="el-icon-video-play"
            style="color: red;"
            v-if="currPlaySongInfo.id === scope.row.id"
          ></i>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="音乐标题"> </el-table-column>
      <el-table-column label="歌手" width="200">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{
            scope.row.ar.length ? scope.row.ar[0].name : ""
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="专辑" width="200">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.al.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="时长" width="60">
        <template slot-scope="scope">
          <span>{{ (scope.row.dt / 1000) | parseTimeToMMSS }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getPlaylistDetail } from '@/api'
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      playlist: {}
    }
  },
  computed: {
    ...mapGetters(['currPlaySongInfo', 'currPlayOption'])
  },
  methods: {
    clickSong (item) {
      this.$store.dispatch('getMusicUrl', item).then((url) => {
        if (!url) {
          this.$message.error('该歌曲无法播放（未找到播放链接）')
          return
        }
        this.$store.commit('SET_CURR_PLAY_OPTION', {
          currPlaySongs: this.playlist.tracks
        })
      })
    },
    getSongList (id) {
      getPlaylistDetail(id).then((res) => {
        this.playlist = res.playlist
      })
    }
  },
  mounted () {
    this.songMapId = this.$route.query.id
    this.getSongList(this.songMapId)
  }
}
</script>

<style scoped lang="scss">
.song-list-main {
  height: 100%;
  .song-list-main__describe{
    display: flex;
    padding: 20px;
    box-sizing: border-box;
    img{
      display: block;
      width: 250px;
      height: 250px;
      border-radius: 8px;
    }
    .right{
      margin-left: 25px;
    }
  }
}
.title{
  font-size: 24px;
  font-weight: bold;
}
</style>
