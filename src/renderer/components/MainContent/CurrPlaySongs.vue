<!--
 * @Date: 2021-10-25 17:40:01
 * @LastEditors: wenfujie
 * @LastEditTime: 2021-10-28 14:15:51
 * @FilePath: /my-electron-vue-music/src/renderer/components/MainContent/CurrPlaySongs.vue
-->
<template>
  <div style="background-color: #ccc;">
    <el-dialog title="当前播放" :visible.sync="dialogVisible" width="600px">
      <el-table
        :data="currSongs"
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
        <el-table-column label="歌手" width="150">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{
              scope.row.ar.length ? scope.row.ar[0].name : ""
            }}</span>
          </template>
        </el-table-column>
        <el-table-column label="时长" width="60">
          <template slot-scope="scope">
            <span>{{ (scope.row.dt / 1000) | parseTimeToMMSS }}</span>
          </template>
        </el-table-column>
      </el-table>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  computed: {
    dialogVisible: {
      get () {
        return this.$store.state.PlayList.currPlayOption.isShowSongList
      },
      set (boo) {
        this.$store.commit('SET_CURR_PLAY_OPTION', {
          isShowSongList: boo
        })
      }
    },
    currPlaySongInfo () {
      return this.$store.state.PlayList.currPlaySongInfo
    },
    currSongs () {
      console.log(
        JSON.parse(
          JSON.stringify(
            this.$store.state.PlayList.currPlayOption.currPlaySongs
          )
        ),
        '===--'
      )
      return this.$store.state.PlayList.currPlayOption.currPlaySongs
    }
  },
  methods: {
    showDialog (isShow = true) {
      this.dialogVisible = isShow
    }
  }
}
</script>

<style scoped lang="scss">
.main-ul {
  height: 400px;
  overflow: auto;
}
</style>
