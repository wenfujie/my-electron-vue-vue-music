/*
 * @Date: 2021-10-25 16:32:57
 * @LastEditors: wenfujie
 * @LastEditTime: 2021-10-25 17:14:45
 * @FilePath: /my-electron-vue-music/src/renderer/utils/filters.js
 * @describe: 全局 filter
 */
import Vue from 'vue'
import { formatSeconds } from './index'

/**
 * 转换时间为： 05:00
 */
Vue.filter('parseTimeToMMSS', function (second) {
  if (!second) return '00:00'
  let timeInfo = formatSeconds(second)
  if (timeInfo.substring(0, 2) === '00') {
    timeInfo = timeInfo.substring(3)
  }
  return timeInfo
})
