<!--
 * @Date: 2021-10-22 10:29:05
 * @LastEditors: wenfujie
 * @LastEditTime: 2021-10-28 15:27:57
 * @FilePath: /my-electron-vue-music/README.md
-->
# my-electron-vue-vue-music

> 模仿网易云音乐


## 工程介绍

---

This project was generated with [electron-vue](https://github.com/SimulatedGREG/electron-vue) using [vue-cli](https://github.com/vuejs/vue-cli). Documentation about the original structure can be found [here](https://simulatedgreg.gitbooks.io/electron-vue/content/index.html).

#### Build Setup

``` bash
# install dependencies
npm install

# 本地启动项目
npm run dev

# 打包项目
npm run build

```

启动后端 api 服务

使用的是 [官方api](https://binaryify.github.io/NeteaseCloudMusicApi/#/?id=neteasecloudmusicapi)。

``` bash
$ git clone git@github.com:Binaryify/NeteaseCloudMusicApi.git

$ npm install

$ node app.js

```

服务器启动默认端口为 3000 .

## 开发问题记录

### Electron相关

#### element ui table 组件不显示

全局引入 `element ui` 后，使用 `element ui` 的 table 组件发现无法显示。

解决：在 `.electron-vue/webpack.renderer.config.js` 修改如下代码：

```js
...
let whiteListedModules = ['vue', 'element-ui']
...
```

#### build报错

初始化工程后，执行 `npm run build` 异常

```js
Cannot locate Mac/Finder/DS_Store.pm in @INC (you may need to install the Mac::Finder::DSStore module)
```

解决：
由于 `"electron-builder": "^20.15.1",` 版本太低导致，卸载重装 `"electron-builder": "^22.13.1",` 即可。