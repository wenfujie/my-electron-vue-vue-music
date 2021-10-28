/*
 * @Date: 2021-10-24 12:15:27
 * @LastEditors: wenfujie
 * @LastEditTime: 2021-10-28 10:54:05
 * @FilePath: /my-electron-vue-music/src/renderer/store/modules/PlayList.js
 */
import { getMusicUrl } from '@/api'
const state = {
  currPlaySongInfo: {
    id: '',
    name: '',
    singer: '',
    url: '',
    picUrl: ''
  },
  currPlayOption: {
    currPlaySongs: [], // 当前播放列表
    playMode: 'order', // 播放模式 ['random', 'order']
    isShowSongList: false // 是否显示当前播放列表
  }
}

const getters = {
  currPlaySongInfo: (state) => state.currPlaySongInfo,
  currPlayOption: (state) => state.currPlayOption
}

const mutations = {
  SET_CURR_PLAY_SONG_INFO (state, songInfo) {
    state.currPlaySongInfo = songInfo
  },
  SET_CURR_PLAY_OPTION (state, optionObj) {
    Object.assign(state.currPlayOption, optionObj)
  }
}

const actions = {
  // 获取播放地址，并设置当前播放歌曲信息
  async getMusicUrl ({ commit }, songInfo) {
    const res = await getMusicUrl(songInfo.id)
    const url = res.data[0].url ? res.data[0].url : ''
    const singer = songInfo.ar.length ? songInfo.ar[0].name : ''
    const name = songInfo.name
    const picUrl = songInfo.al.picUrl
    const id = songInfo.id
    commit('SET_CURR_PLAY_SONG_INFO', { url, name, singer, picUrl, id })
    return url
  },
  // 切歌 - 上一首
  prevSong (defaultParam) {
    const { playMode } = { ...state.currPlayOption }
    const switchSongMap = {
      order: actions.prevSongOfOrder,
      random: actions.switchSongOfRandom
    }
    switchSongMap[playMode](defaultParam)
  },
  // 切歌 - 下一首
  nextSong (defaultParam) {
    const { playMode } = { ...state.currPlayOption }
    const switchSongMap = {
      order: actions.nextSongOfOrder,
      random: actions.switchSongOfRandom
    }
    switchSongMap[playMode](defaultParam)
  },
  // 随机切歌
  switchSongOfRandom ({ commit }) {
    const { currPlaySongs } = { ...state.currPlayOption }
    const randomIndex = Math.floor(Math.random() * currPlaySongs.length)
    actions.getMusicUrl({ commit }, currPlaySongs[randomIndex])
  },
  // 上一曲（顺序播放）
  prevSongOfOrder ({ commit }) {
    const currSongIndex = getCurrPlaySongIndex()
    const { currPlaySongs } = { ...state.currPlayOption }
    let prevSongIndex
    if (currSongIndex !== -1) {
      // 为第一首时，切到最后一首
      prevSongIndex =
        currSongIndex === 0 ? currPlaySongs.length - 1 : currSongIndex - 1
      actions.getMusicUrl({ commit }, currPlaySongs[prevSongIndex])
    }
  },
  // 下一曲（顺序播放）
  nextSongOfOrder ({ commit }) {
    const currSongIndex = getCurrPlaySongIndex()
    const { currPlaySongs } = { ...state.currPlayOption }
    let nextSongIndex
    if (currSongIndex !== -1) {
      // 为最后一首时，切到第一首
      nextSongIndex =
        currSongIndex === currPlaySongs.length - 1 ? 0 : currSongIndex + 1

      actions.getMusicUrl({ commit }, currPlaySongs[nextSongIndex])
    }
  }
}

function getCurrPlaySongIndex () {
  const { currPlaySongs } = { ...state.currPlayOption }
  const { id } = { ...state.currPlaySongInfo }
  // 当前播放歌曲索引
  return currPlaySongs.findIndex((item) => item.id === id)
}

export default {
  state,
  mutations,
  actions,
  getters
}
