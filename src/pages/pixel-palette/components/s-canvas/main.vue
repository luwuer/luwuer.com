<template>
  <div ref="wrapper"
       class="palette-wrapper"
       :style="wrapperStyle"
       :class="{'can-move': controlDown}">
    <canvas ref="cv"
            class="test"
            :width="widthStr"
            :height="heightStr">
    </canvas>
  </div>
</template>

<script>
import config from 'static/pixel-palette/config'
import sColorPicker from '@pp/components/s-color-picker/index'
import img_1 from '@index/assets/img/demo2.png'
import { getImageData } from '@pp/assets/js/api'

export default {
  name: 'index',
  components: {
    sColorPicker
  },
  props: {
    color: String
  },
  data() {
    return {
      ratio: config.RATIO.default, // 像素放大倍率，一个最小控制方块 = ratio * ratio （个像素）
      lastResetDot: null,
      level: 1,
      testImg: new Image(),
      moveLastPosition: {
        x: 0,
        y: 0
      },
      controlDown: false // control 按下
    }
  },
  computed: {
    /**
     * @description 画布放大倍率
     */
    canvasRatio() {
      return this.ratio / config.RATIO.default
    },
    width() {
      return config.WIDTH * this.canvasRatio
    },
    height() {
      return config.HEIGHT * this.canvasRatio
    },
    wrapperStyle() {
      return `width: ${config.WIDTH}px; height: ${config.HEIGHT}px`
    },
    widthStr() {
      return `${this.width}px`
    },
    heightStr() {
      return `${this.height}px`
    },
    colorRGBA() {
      let r = parseInt(this.color.slice(1, 3), 16)
      let g = parseInt(this.color.slice(3, 5), 16)
      let b = parseInt(this.color.slice(5, 7), 16)
      console.log(r, g, b)
      return [r, g, b, 255]
    }
  },
  methods: {
    init() {
      getImageData().then(data => {
        this.resourceData = data
        this.drawResource(data)
      })
    },
    drawResource(data) {
      console.time()
      let pixelData = data.data
      let width = data.width

      for (let index = 0; index < pixelData.length; index += 4) {
        let x = (index / 4) % width
        let y = Math.floor(index / 4 / width)
        let color = this.tranArrToColor([pixelData[index], pixelData[index + 1], pixelData[index + 2], pixelData[index + 3]])
        this.drawDot({
          x,
          y,
          color
        })
      }
      console.timeEnd()
    },
    drawDot({ x, y, color = this.color, save = false }) {
      this.ctx.fillStyle = color || this.color
      this.ctx.fillRect(x * this.ratio, y * this.ratio, this.ratio, this.ratio)

      if (save) {
        // 保存点数据请求
        console.log(`save x = ${x},y = ${y},color = ${color}`)
        this.saveDot({
          x,
          y
        })
      }
    },
    saveDot({ x, y, color = this.colorRGBA }) {
      console.time()
      let index = (y * this.resourceData.width + x) * 4
      this.resourceData.data.splice(index, 4, ...color)
      console.timeEnd()
    },
    /**
     * @description 颜色数组转颜色
     */
    tranArrToColor(arr) {
      let r = arr[0] === undefined ? 255 : arr[0]
      let g = arr[1] === undefined ? 255 : arr[1]
      let b = arr[2] === undefined ? 255 : arr[2]
      let a = arr[3] === undefined ? 255 : arr[3]
      return `rgba(${r}, ${g}, ${b}, ${a})`
    },
    /**
     * @description 获取坐标已存在点的颜色
     */
    getCurrentColor(x, y) {
      let beginIndex = (this.resourceData.width * y + x) * 4
      let endIndex = beginIndex + 4
      let arr = this.resourceData.data.slice(beginIndex, endIndex)
      return this.tranArrToColor(arr)
    },
    largen() {
      if (this.ratio < config.RATIO.max) {
        this.ratio += config.RATIO.default * 2
        this.$nextTick(() => {
          this.drawResource(this.resourceData)
        })
      }
    },
    shrink() {
      if (this.ratio > config.RATIO.min) {
        this.ratio -= config.RATIO.default * 2

        this.$nextTick(() => {
          this.drawResource(this.resourceData)
        })
      }
    },
    removeImgSmooth() {
      this.ctx.mozImageSmoothingEnabled = false
      this.ctx.webkitImageSmoothingEnabled = false
      this.ctx.msImageSmoothingEnabled = false
      this.ctx.imageSmoothingEnabled = false
    },
    /**
     * @description 计算真实位移
     */
    getRealMove(position) {
      let x = position.x - this.moveLastPosition.x
      let y = position.y - this.moveLastPosition.y
      this.moveLastPosition.x = position.x
      this.moveLastPosition.y = position.y
      return { x, y }
    },
    mousedownHandle(e) {
      this.mousedown = true
      this.moveLastPosition.x = e.clientX
      this.moveLastPosition.y = e.clientY
    },
    mousemoveHandle(e) {
      if (this.mousedown) {
        let realMove = this.getRealMove({
          x: e.clientX,
          y: e.clientY
        })
        this.$refs.wrapper.scrollLeft -= realMove.x
        this.$refs.wrapper.scrollTop -= realMove.y
      } else if (this.canvasRatio > 1) {
        console.log(this.lastResetDot)
        let x = Math.floor(e.offsetX / this.ratio)
        let y = Math.floor(e.offsetY / this.ratio)

        // last reset dot is null
        if (this.lastResetDot !== null) {
          // if in same dot
          if (this.lastResetDot.x === x && this.lastResetDot.y === y) return

          // remove last reset dot
          this.drawDot({
            x: this.lastResetDot.x,
            y: this.lastResetDot.y,
            color: this.lastResetDot.color
          })
        }

        // update last reset dot
        let colorLast = this.getCurrentColor(x, y)
        this.lastResetDot = {
          x,
          y,
          color: colorLast
        }

        // draw current dot
        this.drawDot({
          x,
          y
        })
      }
    },
    clickHandle(e) {
      console.log(e)
      this.lastResetDot = null
      this.drawDot({
        x: Math.floor(e.offsetX / this.ratio),
        y: Math.floor(e.offsetY / this.ratio),
        save: true
      })
    },
    keydownHandle(e) {
      if (this.controlDown) return
      if (e.key === 'Control') {
        this.controlDown = true
      }
    },
    keyupHandle(e) {
      if (e.key === 'Control') {
        this.controlDown = false
      }
    }
  },
  watch: {},
  created() {
    this.testImg.src = img_1
  },
  mounted() {
    this.$nextTick(() => {
      this.testImg.onload = () => {
        this.ctx = this.$refs.cv.getContext('2d', {
          alpha: false
        })
        // this.removeImgSmooth()
        this.init()
      }

      this.$refs.cv.addEventListener('click', this.clickHandle)

      this.$refs.cv.addEventListener('wheel', e => {
        if (e.wheelDelta) {
          // IE Chrome
          if (e.wheelDelta > 0) {
            this.largen()
          }
          if (e.wheelDelta < 0) {
            this.shrink()
          }
        } else if (e.detail) {
          // Firefox
          if (e.detail > 0) {
            this.largen()
          }
          if (e.detail < 0) {
            this.shrink()
          }
        }
        // console.log(e)
      })

      this.$refs.cv.addEventListener('mousedown', this.mousedownHandle)

      document.addEventListener('mouseup', () => {
        this.mousedown = false
      })

      this.$refs.cv.addEventListener('mousemove', this.mousemoveHandle)

      // document.addEventListener('keydown', this.keydownHandle)
      // document.addEventListener('keyup', this.keyupHandle)
    })
  }
}
</script>

<style lang="stylus">
.palette-wrapper {
  box-sizing content-box
  display inline-block
  box-shadow 2px 3px 4px #3333
  border 1px solid #eee
  overflow hidden
  font-size 0
}

.can-move {
  cursor move
}
</style>
