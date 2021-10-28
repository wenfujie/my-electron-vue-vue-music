<!--
 * @Date: 2021-10-25 15:25:29
 * @LastEditors: wenfujie
 * @LastEditTime: 2021-10-26 15:56:06
 * @FilePath: /my-electron-vue-music/src/renderer/components/FootOperation/ProgressBar.vue
-->
<template>
  <div class="bg" @click="changeProgress" ref="bg">
    <div class="progress" :style="{ width: progressNum + '%' }">
      <!-- 进度末尾小红点，hover才显示 -->
      <div :class="['progress-logo']"></div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    changeProgress (e) {
      const progressPercent = parseInt(e.pageX / this.totalWidth * 100)
      this.$emit('seeked', progressPercent)
    }
  },
  props: {
    progressNum: {
      type: Number,
      default: 0
    }
  },
  mounted () {
    this.totalWidth = this.$refs.bg.clientWidth
  }
}
</script>

<style scoped lang="scss">
$progressColor: #d23a30;
.bg {
  background-color: #f5f5f5;
  height: 3px;
  &:hover {
    cursor: pointer;
    & .progress .progress-logo {
      display: block;
    }
  }
  .progress {
    left: 0;
    top: 0;
    background-color: $progressColor;
    width: 0;
    height: 3px;
    transition: width 1.5s;
    position: relative;

    .progress-logo {
      position: absolute;
      right: 0;
      top: 0;
      transform: translate(50%, -30%);
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background-color: $progressColor;
      display: none;
    }
  }
}
</style>
