<!--
 * @Date: 2021-10-24 10:13:17
 * @LastEditors: wenfujie
 * @LastEditTime: 2021-10-28 14:49:39
 * @FilePath: /my-electron-vue-music/src/renderer/components/FootOperation.vue
-->
<template>
  <div>
    <ProgressBar :progressNum="playProcess" @seeked="seeked" />
    <div class="container">
      <div :class="['song-info', { hidden: !currPlaySongInfo.id }]">
        <img :src="currPlaySongInfo.picUrl" class="" />
        <div class="song-info_describe">
          <div>
            <span>{{ currPlaySongInfo.name }} - </span>
            <span>{{ currPlaySongInfo.singer }}</span>
          </div>
          <div>
            <span
              >{{ currTime | parseTimeToMMSS }} /
              {{ totalTime | parseTimeToMMSS }}</span
            >
          </div>
        </div>
      </div>

      <div class="music-operator">
        <span class="icon-btn prev" @click="prevSong"></span>
        <span
          :class="['icon-btn', 'big-size', isPause ? 'play' : 'pause']"
          @click="playOrPauseSong"
        ></span>
        <span class="icon-btn next" @click="nextSong"></span>
      </div>

      <audio
        v-show="false"
        ref="audio"
        :src="playUrl"
        preload
        controls
        @timeupdate="timeupdate"
        @loadedmetadata="loadedMetaData"
        @ended="playEnded"
        @pause="isPause = true"
        @play="isPause = false"
      />

      <div class="music-option">
        <span
          :class="['icon-btn', 'small-size', currPlayOption.playMode]"
          @click="switchPlayMode"
          :title="'currPlayModeItem.value'"
        ></span>
        <span
          class="icon-btn small-size songs"
          @click="showPlayListDialog"
        ></span>
      </div>
    </div>
  </div>
</template>

<script>
import ProgressBar from '@/components/FootOperation/ProgressBar.vue'
import { mapGetters } from 'vuex'
import { playModeList } from '@/utils/staticData'

export default {
  components: { ProgressBar },
  data () {
    return {
      isPause: true, // 是否暂停中
      currTime: 0, // 当前播放时长
      totalTime: 0, // 总时长
      playUrl: ''
    }
  },
  computed: {
    ...mapGetters(['currPlaySongInfo', 'currPlayOption']),
    currPlayModeItem () {
      return this.playModeList.find(
        (item) => item.id === this.currPlayOption.playMode
      )
    },
    // 播放进度
    playProcess () {
      if (!this.currTime || !this.totalTime) return 0
      return parseInt((this.currTime / this.totalTime) * 100)
    }
  },
  methods: {
    switchPlayMode () {
      let currModeIndex = this.playModeList.findIndex(
        (item) => item.id === this.currPlayModeItem.id
      )
      currModeIndex += 1
      // 若已是最后一种模式，则切换为第一种
      if (currModeIndex + 1 > this.playModeList.length) {
        currModeIndex = 0
      }
      const playMode = this.playModeList[currModeIndex].id
      this.$store.commit('SET_CURR_PLAY_OPTION', { playMode })
    },
    // 跳转歌曲进度
    seeked (progressNum) {
      const audio = this.$refs.audio
      const seekTime = parseInt(this.totalTime * (progressNum / 100))
      audio.currentTime = seekTime
    },
    // 当前歌曲播放结束回调
    playEnded () {
      this.nextSong()
    },
    // 暂停或播放
    playOrPauseSong () {
      if (this.currPlaySongInfo.id) {
        const audio = this.$refs.audio
        if (audio.paused) {
          audio.play()
        } else {
          audio.pause()
        }
      } else {
        // 不存在正在播放的歌曲，取当前列表第一首播放
        if (this.currPlayOption.currPlaySongs.length) {
          // TODO:
        }
      }
    },
    prevSong () {
      this.$store.dispatch('prevSong')
    },
    nextSong () {
      this.$store.dispatch('nextSong')
    },
    showPlayListDialog () {
      this.$store.commit('SET_CURR_PLAY_OPTION', {
        isShowSongList: true
      })
    },
    loadedMetaData (e) {
      this.totalTime = parseInt(e.currentTarget.duration)
    },
    timeupdate (e) {
      this.currTime = parseInt(e.currentTarget.currentTime)
    }
  },
  created () {
    this.playModeList = playModeList
  },
  watch: {
    'currPlaySongInfo.url' (newUrl) {
      if (newUrl) {
        this.playUrl = newUrl
        this.$nextTick(() => {
          const audio = this.$refs.audio
          audio.play()
        })
      }
    }
  }
}
</script>

<style scoped lang="scss">
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 7px;
}
.song-info {
  display: flex;
  flex: 1;
  .song-info_describe {
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: 14px;
  }
  img {
    width: 50px;
    height: 50px;
    border-radius: 8px;
    margin-right: 13px;
  }
}
.music-operator {
  display: flex;
  align-items: center;
}
.music-option {
  flex: 1;
  display: flex;
  justify-content: flex-end;
}
.icon-btn {
  width: 30px;
  height: 30px;
  display: inline-block;
  background: no-repeat;
  background-size: 100%;
  margin: 0 7px;
  &.small-size {
    width: 20px;
    height: 20px;
  }
  &.big-size {
    width: 40px;
    height: 40px;
  }
  &.prev {
    background-image: url("../assets/images/icons/prev.png");
  }
  &.next {
    background-image: url("../assets/images/icons/next.png");
  }
  &.pause {
    background-image: url("../assets/images/icons/pause.png");
  }
  &.play {
    background-image: url("../assets/images/icons/play.png");
  }
  &.order {
    background-image: url("../assets/images/icons/order.png");
  }
  &.random {
    background-image: url("../assets/images/icons/random.png");
  }
  &.songs {
    background-image: url("../assets/images/icons/songs.png");
  }
}
</style>
