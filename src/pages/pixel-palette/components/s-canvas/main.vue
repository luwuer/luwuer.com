<template>
  <div ref="wrapper"
       class="palette-wrapper"
       :style="wrapperStyle"
       :class="{'can-move': controlDown}">
    <canvas ref="cv"
            :width="widthStr"
            :height="heightStr">
    </canvas>
  </div>
</template>

<script>
import constMap from '@pp/assets/js/const'
import sColorPicker from '@pp/components/s-color-picker/index'
import img_1 from '@index/assets/img/bilibili.png'

export default {
  name: 'index',
  components: {
    sColorPicker
  },
  data() {
    return {
      width: constMap.WIDTH,
      height: constMap.HEIGHT,
      testImg: new Image(),
      moveLastPosition: {
        x: 0,
        y: 0
      },
      controlDown: false // control 按下
    }
  },
  computed: {
    wrapperStyle() {
      return `width: ${constMap.WIDTH}px; height: ${constMap.HEIGHT}px`
    },
    widthStr() {
      return `${this.width}px`
    },
    heightStr() {
      return `${this.height}px`
    }
  },
  methods: {
    largen() {
      if (this.width < constMap.WIDTH * 12) {
        this.width += constMap.WIDTH
        this.height += constMap.HEIGHT
        this.$nextTick(() => {
          this.removeImgSmooth()
          this.ctx.drawImage(this.testImg, 0, 0, this.width, this.height)
        })
      }
    },
    shrink() {
      if (this.width > constMap.WIDTH) {
        this.width -= constMap.WIDTH
        this.height -= constMap.HEIGHT
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
      }
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
        this.ctx = this.$refs.cv.getContext('2d')
        this.removeImgSmooth()
        this.ctx.drawImage(this.testImg, 0, 0, this.width, this.height)
        console.log(this.ctx.getImageData(0, 0, this.width, this.height))
      }

      this.$refs.cv.addEventListener('click', e => {
        console.log(e)
      })

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
  border-radius 4px
  overflow hidden
  font-size 0
  // cursor default
}

.can-move {
  cursor move
}
</style>
