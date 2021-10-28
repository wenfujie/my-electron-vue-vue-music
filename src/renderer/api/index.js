/*
 * @Date: 2021-10-24 11:06:22
 * @LastEditors: wenfujie
 * @LastEditTime: 2021-10-26 13:59:37
 * @FilePath: /my-electron-vue-music/src/renderer/api/index.js
 */
import http from '../utils/http'

// 手机登录
export function login (phone, password) {
  return http.get('/login/cellphone?phone=' + phone + '&password=' + password)
}

export function banner () {
  return http.get('/banner')
}

export function personalized () {
  return http.get('/personalized')
}

export function getPlaylistDetail (id) {
  return http.get('/playlist/detail?id=' + id)
}

export function getPlaylistHot () {
  return http.get('/playlist/hot')
}

export function getTopPlaylistHighquality (cat = '全部', limit = 30) {
  return http.get('/top/playlist/highquality?cat=' + cat + '&limit=' + limit)
}

export function like (id) {
  return http.get('/like?id=' + id)
}

export function toplist (idx) {
  return http.get('/top/list?idx=' + idx)
}

export function singerlist (cat, offset) {
  if (cat === 0) {
    return http.get('/top/artists?offset=0')
  }
  return http.get('/artist/list?cat=' + cat + '&offset=' + offset)
}

export function getSongDetail (ids) {
  return http.get('/song/detail?ids=' + ids)
}

export function getMusicUrl (id, br = 999000) {
  return http.get('/song/url?id=' + id + '&br=' + br)
}

export function djlist (catid) {
  if (catid === 0) {
    return http.get('/dj/recommend')
  } else {
    return http.get('/dj/recommend/type?type=' + catid)
  }
}
export function djcat () {
  return http.get('/dj/catelist')
}
