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
import config from 'static/pages/pixel-palette/config'
import sColorPicker from '@pp/components/s-color-picker/index'
import img_1 from '@index/assets/img/demo2.png'

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
      lastDot: null,
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
    /**
     * @description 颜色数组转颜色
     */
    tranArrToColor(arr) {
      return `rgba(${arr[0]}, ${arr[1]}, ${arr[2]}, ${arr[3]})`
    },
    getCurrentColor(x, y) {
      console.log(x, y)
      let data = this.imageData.data
      let beginIndex = (this.imageData.width * y + x) * 4
      let endIndex = beginIndex + 4
      let arr = data.slice(beginIndex, endIndex)
      return this.tranArrToColor(arr)
    },
    largen() {
      if (this.ratio < config.RATIO.max) {
        this.ratio += config.RATIO.default
        this.$nextTick(() => {
          this.removeImgSmooth()
          this.ctx.drawImage(this.testImg, 0, 0, this.width, this.height)
        })
      }
    },
    shrink() {
      if (this.ratio > config.RATIO.min) {
        this.ratio -= config.RATIO.default

        this.$nextTick(() => {
          this.removeImgSmooth()
          this.ctx.drawImage(this.testImg, 0, 0, this.width, this.height)
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
    /**
     * @description 根据鼠标位置判断、并画点
     * @param {Object} position 位置
     * @param {Boolean} save 是否保存该点
     */
    drawDot(position, save = true) {
      console.log(position)
      let x = Math.floor(position.x / this.ratio) * this.ratio
      let y = Math.floor(position.y / this.ratio) * this.ratio

      if (save) {
        this.ctx.fillStyle = this.color
        console.time()
        this.ctx.fillRect(x, y, this.ratio, this.ratio)
        console.timeEnd()

        console.log('保存数据...')
        // save data
        this.imageData.save()
        this.lastDot = null
      } else {
        console.time()
        // remove last dot
        if (this.lastDot) {
          this.ctx.fillStyle = this.lastDot.color
          this.ctx.fillRect(
            this.lastDot.x,
            this.lastDot.y,
            this.ratio,
            this.ratio
          )
        }

        // save to lastDot
        let colorLast = this.getCurrentColor(
          Math.floor(position.x / this.canvasRatio) + 1,
          Math.floor(position.y / this.canvasRatio) + 1
        )
        console.log(colorLast)
        this.lastDot = {
          x,
          y,
          color: colorLast
        }
        console.timeEnd()

        // render current dot
        this.ctx.fillStyle = this.color
        this.ctx.fillRect(x, y, this.ratio, this.ratio)
        console.log(this.lastDot)
      }
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
        this.drawDot(
          {
            x: e.offsetX,
            y: e.offsetY
          },
          false
        )
      }
    },
    clickHandle(e) {
      this.drawDot({
        x: e.offsetX,
        y: e.offsetY
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
        this.removeImgSmooth()
        this.ctx.drawImage(this.testImg, 0, 0, this.width, this.height)
        this.imageData = this.ctx.getImageData(0, 0, this.width, this.height)
        console.log(this.imageData)
        console.log(this.imageData.data.slice((14 * 1024 + 38) * 4, (14 * 1024 + 38 + 6) * 4))
        // let imageData = ls.getItem('imageData')
        // if (imageData) {
        //   this.ctx.drawImage(imageData, 0, 0)
        // } else {
        //   this.ctx.drawImage(this.testImg, 0, 0, this.width, this.height)
        //   ls.setItem('imageData', this.ctx.getImageData(0, 0, this.width, this.height))
        // }
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
