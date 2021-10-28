/*
 * @Date: 2021-10-22 10:29:05
 * @LastEditors: wenfujie
 * @LastEditTime: 2021-10-25 13:53:50
 * @FilePath: /my-electron-vue-music/src/renderer/router/index.js
 */
import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/index'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/index/song-map'
    },
    {
      path: '/index',
      name: 'main-content',
      component: Index,
      children: [
        {
          path: 'song-map',
          component: require('@/components/MainContent/SongMap.vue').default
        },
        {
          path: 'song-list',
          component: require('@/components/MainContent/SongList.vue').default
        }
      ]
    },
    {
      path: '*',
      redirect: '/index/song-map'
    }
  ]
})
