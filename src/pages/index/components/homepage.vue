<template>
  <div id="homepage"
       ref="homepage">
    <div class="home-bgs">
      <canvas ref="canvas-bg"
              class="home-bg"></canvas>
      <canvas ref="canvas-bg-cover"
              class="home-bg-cover"></canvas>
    </div>
    <div class="home-contents">

    </div>
  </div>
</template>

<script>
import { index } from '@/assets/js/common/img-import.js'

export default {
  name: 'homepage',
  data() {
    return {
      canvas: null, // canvas dom
      canvasCover: null, // canvas dom
      imgMap: index,
      winInfo: {}
    }
  },
  created() {
    // resize
    let timer = 0
    window.onresize = () => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        this.getWindowInfo()
      }, 30)
    }
    // 双击
    window.ondblclick = () => {
      this.drawImg()
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.getWindowInfo()
      this.canvas = this.$refs['canvas-bg']
      this.canvasCover = this.$refs['canvas-bg-cover']
      this.refreshCanvasSize()
      this.drawImg()

      // html设置overflow
      document.querySelector('html').style.overflow = 'hidden'
    })
  },
  methods: {
    /**
     * @description 获取浏览器窗口宽高等信息
     */
    getWindowInfo() {
      this.$set(
        this.winInfo,
        'ww',
        window.innerWidth || document.body.clientWidth
      ) // 窗口宽
      this.$set(
        this.winInfo,
        'wh',
        window.innerHeight || document.body.clientHeight
      ) // 窗口宽
    },
    /**
     * @description 画图到canvas
     */
    drawImg() {
      // this.canvas.
      if (this.canvas.getContext) {
        let ctx = this.canvas.getContext('2d')
        let img = new Image()
        img.onload = () => {
          ctx.drawImage(img, 0, 0, this.winInfo.ww, this.winInfo.wh)
        }
        let i = Math.floor(Math.random() * 17)
        img.src = this.imgMap[i]
      }
    },
    /**
     * @description 更新canvas\page大小
     */
    refreshCanvasSize() {
      this.canvas.setAttribute('width', this.winInfo.ww + 'px')
      this.canvas.setAttribute('height', this.winInfo.wh + 'px')
      this.canvasCover.setAttribute('width', this.winInfo.ww + 'px')
      this.canvasCover.setAttribute('height', this.winInfo.wh + 'px')
      this.$refs.homepage.style.height = this.winInfo.wh + 'px'
    }
  },
  watch: {
    winInfo: {
      deep: true,
      handler: function() {
        this.refreshCanvasSize()
        this.drawImg()
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
#homepage {
  overflow hidden

  .home-bgs {
    .home-bg-cover {
      position fixed
      top 0
      left 0
    }
  }

  .home-contents {
  }
}
</style>
