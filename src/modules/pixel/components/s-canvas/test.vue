<template>
  <div ref="wrapper"
       class="palette-wrapper"
       :style="wrapperStyle">
    <canvas ref="cv"
            class="test"
            :width="width"
            :height="height"
            @wheel="wheelHandler"
            @mousedown="mousedownHandle"
            @mousemove="mousemoveHandle"
            @mouseout="mouseoutHandle"
            @mouseup="mouseupHandle">
    </canvas>
    <canvas ref="_cv"
            class="hidden"
            :width="width"
            :height="height">
    </canvas>

    <div class="load-info"
         :class="{ 'load-info-opacity-zero': loadInfoChangeOpacity, 'load-info-hide': loadInfoHide }">
      <p v-for="(info, index) in loadInfo"
         :key="index">
        {{info}}
      </p>
    </div>

    <el-popover placement="bottom"
                width="200"
                trigger="manual"
                v-model="popoverVisible">
      <ul v-loading="infoLoad"
          class="content">
        <li class="content-item"
            v-for="(item, index) in dotInfo"
            :key="index">
          <span :style="{color: item.color, background: item.color === '#ffffff' ? '#333' : ''}"
                class="no">#{{item.no}}</span>
          <span>Created by <span class="user">{{item.user}}</span></span>
        </li>
      </ul>
      <span slot="reference"
            class="popre"
            :style="popreStyle"></span>
    </el-popover>
  </div>
</template>

<script>
import sColorPicker from '@pixel/components/s-color-picker/index'
import { getDotInfo } from '@pixel/assets/js/api'
import io from 'socket.io-client'

class Dot {
  constructor(x = 0, y = 0) {
    this.x = x
    this.y = y
  }

  setX(x, xRenderMax = 0) {
    x < 0 && (x = 0)
    let max = 1024 - xRenderMax
    x > max && (x = max)
    this.x = x
  }

  setY(y, yRenderMax = 0) {
    y < 0 && (y = 0)
    let max = 512 - yRenderMax
    y > max && (y = max)
    this.y = y
  }
}

export default {
  name: 'index',
  components: {
    sColorPicker
  },
  props: {
    color: String,
    imageData: Object
  },
  data() {
    return {
      imageObject: new Image(),
      dragFlag: false, // 鼠标移动标识
      mousedownFlag: false, // 鼠标按下标识
      ratioLevel: window.config.pixel.RATIO.levelMin, // 画布缩放等级
      ratio: window.config.pixel.RATIO.levelInfos[0], // 画布缩放比率，一个最小控制方块 = ratio * ratio （个像素）
      lastResetDot: null,
      moveLastPosition: {
        x: 0,
        y: 0
      },
      mousePosition: {}, // 鼠标当前位置
      popoverVisible: false,
      dotInfo: [],
      infoLoad: false,
      loadInfo: [], // 加载信息显示层
      loadInfoChangeOpacity: false, // 隐藏加载信息
      loadInfoHide: false
    }
  },
  computed: {
    user() {
      return this.$store.getters.pixelUserName
    },
    // 是否能执行绘画操作
    canDraw() {
      return this.ratioLevel !== window.config.pixel.RATIO.levelMin
    },
    // x 轴能渲染实际像素点个数
    renderX() {
      return this.width / this.ratio
    },
    // y 轴能渲染实际像素点个数
    renderY() {
      return this.height / this.ratio
    },
    wrapperStyle() {
      return `width: ${window.config.pixel.WIDTH}px; height: ${
        window.config.pixel.HEIGHT
      }px`
    },
    colorRGBA() {
      let r = parseInt(this.color.slice(1, 3), 16)
      let g = parseInt(this.color.slice(3, 5), 16)
      let b = parseInt(this.color.slice(5, 7), 16)

      return [r, g, b, 255]
    },
    // 浮框定位
    popreStyle() {
      if (!this.mousePosition) return

      return {
        left: this.mousePosition.x + 'px',
        top: this.mousePosition.y + 'px'
      }
    }
  },
  methods: {
    init() {
      // console.time()
      this.removeImgSmooth(this.ctx)
      this.removeImgSmooth(this._ctx)

      this.imageObject.onload = () => {
        // 正副画板画上数据
        this.ctx.drawImage(this.imageObject, 0, 0)
        this._ctx.drawImage(this.imageObject, 0, 0)

        // 隐藏加载信息窗口
        this.loadInfo.push(
          `吃${
            [
              '栗子',
              '腰果',
              '花生',
              '杏仁',
              '核桃',
              '瓜子',
              '榛子',
              '开心果',
              '巴旦木',
              '松仁'
            ][Math.floor(Math.random() * 10)]
          }...`
        )
        this.loadInfoChangeOpacity = true
        setTimeout(() => {
          this.loadInfoHide = true
        }, 700)

        // 赋值源数据
        this.resourceData = this._ctx.getImageData(
          0,
          0,
          this.width,
          this.height
        )
        this.imageObject.onload = null
        // console.timeEnd()
      }
    },
    drawDot({ x, y, color = this.color, save = false }) {
      this.ctx.fillStyle = color || this.color
      this.ctx.fillRect(x, y, 1, 1)

      // 记录当前索引
      this.index = (y + this.startDot.y) * this.width + x + this.startDot.x

      if (save) {
        // 保存点数据请求
        // console.log(`save x = ${x},y = ${y},color = ${color}`)
        this.saveDot({
          x: x + this.startDot.x,
          y: y + this.startDot.y,
          color
        })
      }
    },
    /**
     * @description 1. 把点储存到 _cv 这个 canvas ，保证 imageObject 数据同步； 2. 把点信息发送到后台
     */
    saveDot({ x, y, color = this.colorRGBA }, server = true) {
      // imageObject 同步数据
      this._ctx.fillStyle = color
      this._ctx.fillRect(x, y, 1, 1)
      this.imageObject.src = this.$refs._cv.toDataURL()
      // resourceData 维护
      this.resourceData = this._ctx.getImageData(0, 0, this.width, this.height)

      if (server) {
        // 数据发给 server
        let rgba = []
        this.tranHexColorToRgb(color, rgba)
        let dot = {
          index: y * this.width + x,
          color,
          user: this.user,
          r: rgba[0],
          g: rgba[1],
          b: rgba[2]
        }
        window.socket.emit('saveDot', dot)
      }
    },
    resetDot() {
      // remove last reset dot
      this.drawDot({
        x: this.lastResetDot.x,
        y: this.lastResetDot.y,
        color: this.lastResetDot.color
      })
      this.lastResetDot = null
    },
    /**
     * @description 16 进制颜色转 rgb 颜色
     */
    tranHexColorToRgb(color, colorArr = []) {
      let arr = color.match(/\w{2}/g)
      let r = parseInt(arr[0], 16)
      let g = parseInt(arr[1], 16)
      let b = parseInt(arr[2], 16)
      colorArr.push(r, g, b, 255)

      return `rgba(${r}, ${g}, ${b})`
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
    largen(e) {
      if (this.ratioLevel < window.config.pixel.RATIO.levelMax) {
        this.ratioLevel++
        // 当前环境下画布缩放比率
        let scaleRatio =
          window.config.pixel.RATIO.levelInfos[this.ratioLevel] / this.ratio

        // 获取当前鼠标对应数据的 x 和 y 坐标
        let x =
          Math.floor((e.clientX - this.boardInfo.left) / this.ratio) +
          (this.startDot ? this.startDot.x : 0)
        let y =
          Math.floor((e.clientY - this.boardInfo.top) / this.ratio) +
          (this.startDot ? this.startDot.y : 0)

        // 赋值新的比率
        this.ratio = window.config.pixel.RATIO.levelInfos[this.ratioLevel]

        // 根据 x 和 y 坐标计算显示矩形的起始点坐标
        this.startDot = new Dot()

        let renderXLeft = this.renderX / 2
        let renderXRight = renderXLeft - 1
        if (x > renderXLeft) {
          // 左边数据足够渲染，还需判断右边数据是否足够
          if (x + renderXRight < this.width) {
            // 右边数据足够渲染
            this.startDot.setX(x - renderXLeft)
          } else {
            // 右边数据不够渲染
            this.startDot.setX(this.width - this.renderX)
          }
        } else {
          // 左边数据不够渲染，则右边必然足够
          this.startDot.setX(0)
        }

        let renderYTop = this.renderY / 2
        let renderYBottom = renderYTop - 1
        if (y > renderYTop) {
          // 上边数据足够渲染，还需判断下边数据是否足够
          if (y + renderYBottom < this.height) {
            // 下边数据足够渲染
            this.startDot.setY(y - renderYTop)
          } else {
            // 下边数据不够渲染
            this.startDot.setY(this.height - this.renderY)
          }
        } else {
          // 上边数据足够渲染，则下边必然足够
          this.startDot.setY(0)
        }

        // 刷新画布
        this.ctx.scale(scaleRatio, scaleRatio)
        this.ctx.drawImage(
          this.imageObject,
          this.startDot.x,
          this.startDot.y,
          this.renderX,
          this.renderY,
          0,
          0,
          this.renderX,
          this.renderY
        )
      }
    },
    shrink(e) {
      if (this.ratioLevel > window.config.pixel.RATIO.levelMin) {
        this.ratioLevel--
        // 当前环境下画布缩放比率
        let scaleRatio =
          window.config.pixel.RATIO.levelInfos[this.ratioLevel] / this.ratio

        // 获取当前鼠标对应数据的 x 和 y 坐标
        let x =
          Math.floor((e.clientX - this.boardInfo.left) / this.ratio) +
          this.startDot.x
        let y =
          Math.floor((e.clientY - this.boardInfo.top) / this.ratio) +
          this.startDot.y

        // 赋值新的比率
        this.ratio = window.config.pixel.RATIO.levelInfos[this.ratioLevel]

        // 计算新的渲染起点
        this.startDot.setX(x - this.renderX / 2, this.renderX)
        this.startDot.setY(y - this.renderY / 2, this.renderY)
        // console.log('startDot:', this.startDot)

        // 刷新画布
        this.ctx.scale(scaleRatio, scaleRatio)
        this.ctx.drawImage(
          this.imageObject,
          this.startDot.x,
          this.startDot.y,
          this.renderX,
          this.renderY,
          0,
          0,
          this.renderX,
          this.renderY
        )
      }
    },
    removeImgSmooth(ctx) {
      ctx.mozImageSmoothingEnabled = false
      ctx.webkitImageSmoothingEnabled = false
      ctx.msImageSmoothingEnabled = false
      ctx.imageSmoothingEnabled = false
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
      if (!this.canDraw) return

      this.mousedownFlag = true
      this.dragFlag = false
      this.moveLastPosition.x = e.clientX
      this.moveLastPosition.y = e.clientY
      this.lastResetDot = null
    },
    mousemoveHandle(e) {
      this.mousePosition = {
        x: e.offsetX,
        y: e.offsetY
      }
      // 未放大时不执行逻辑
      if (!this.canDraw) return

      if (this.mousedownFlag) {
        let xMove = this.moveLastPosition.x - e.clientX
        let yMove = this.moveLastPosition.y - e.clientY
        let resourceXMove =
          xMove > 0
            ? Math.floor(xMove / this.ratio)
            : Math.ceil(xMove / this.ratio)
        let resourceYMove =
          yMove > 0
            ? Math.floor(yMove / this.ratio)
            : Math.ceil(yMove / this.ratio)
        if (resourceXMove || resourceYMove) {
          // 设置状态为拖拽
          this.dragFlag = true
          // 上一次位置信息修改为当前位置信息
          this.moveLastPosition.x = e.clientX
          this.moveLastPosition.y = e.clientY

          this.startDot.setX(this.startDot.x + resourceXMove, this.renderX)
          this.startDot.setY(this.startDot.y + resourceYMove, this.renderY)

          this.ctx.drawImage(
            this.imageObject,
            this.startDot.x,
            this.startDot.y,
            this.renderX,
            this.renderY,
            0,
            0,
            this.renderX,
            this.renderY
          )
        }
      } else {
        let x = Math.floor(e.offsetX / this.ratio)
        let y = Math.floor(e.offsetY / this.ratio)

        // last reset dot is null
        if (this.lastResetDot !== null) {
          // if in same dot
          if (this.lastResetDot.x === x && this.lastResetDot.y === y) return
          this.resetDot()
        }

        // update last reset dot
        let colorLast = this.getCurrentColor(
          x + this.startDot.x,
          y + this.startDot.y
        )
        this.lastResetDot = {
          x,
          y,
          color: colorLast
        }

        // draw current dot
        this.drawDot({ x, y })
      }
    },
    mouseoutHandle() {
      // 拖动时鼠标移出画布表示拖动终止，再次拖动需要再次在画布范围内按下鼠标左键
      this.mousedownFlag = false

      if (this.lastResetDot !== null) {
        this.resetDot()
      }
    },
    mouseupHandle(e) {
      if (!this.canDraw) return

      if (!this.user) {
        this.$notify.info({
          title: '提示',
          message: '请先填写常用昵称'
        })
      } else if (!this.dragFlag) {
        this.drawDot({
          x: Math.floor(e.offsetX / this.ratio),
          y: Math.floor(e.offsetY / this.ratio),
          color: this.color,
          save: true
        })
        this.lastResetDot = null
      }

      // reset state
      this.mousedownFlag = false
      this.dragFlag = false
    },
    keydownHandle(e) {
      if (!this.canDraw) return
      if (this.altDown) return

      if (e.key === 'Alt') {
        e.preventDefault()
        this.altDown = true

        // 取信息
        this.infoLoad = true
        getDotInfo(this.index).then(data => {
          this.dotInfo = data.history
          this.infoLoad = false
        })

        // 显示
        this.popoverVisible = true
      }
    },
    keyupHandle(e) {
      if (e.key === 'Alt') {
        e.preventDefault()
        this.altDown = false
        // 隐藏
        this.popoverVisible = false
      }
    },
    wheelHandler(e) {
      // console.log('wheel:', e)
      if (e.wheelDelta) {
        // IE Chrome
        if (e.wheelDelta > 0) {
          this.largen(e)
        }
        if (e.wheelDelta < 0) {
          this.shrink(e)
        }
      } else if (e.detail) {
        // Firefox
        if (e.detail > 0) {
          this.largen(e)
        }
        if (e.detail < 0) {
          this.shrink(e)
        }
      }
    }
  },
  watch: {},
  created() {
    this.loadInfo.push('画布初始化...')

    // canvas 宽高
    this.width = window.config.pixel.WIDTH
    this.height = window.config.pixel.HEIGHT

    // socket.io init
    // window.socket = io.connect('http://localhost:3000')
    // transports: [ 'websocket' ]
    window.socket = io.connect(window.location.origin.replace(/https/, 'wss'))
    this.loadInfo.push('加载历史数据...')

    // window.socket.emit('getDataUrl')
    window.socket.on('dataUrl', data => {
      this.imageObject.src = data.url
      this.loadInfo.push('渲染图像...')

      this.init()
    })

    window.socket.on('newDot', data => {
      this.saveDot(
        {
          x: data.index % this.width,
          y: Math.floor(data.index / this.width),
          color: data.color
        },
        false
      )
    })
  },
  mounted() {
    this.$nextTick(() => {
      this.ctx = this.$refs.cv.getContext('2d')
      this._ctx = this.$refs._cv.getContext('2d')

      // 画布原点距离窗口左边框、上边框距离
      let temp = this.$refs.cv.getBoundingClientRect()
      this.boardInfo = {
        left: temp.x,
        top: temp.y
      }

      // 首次进入可以使用 alt 键
      this.$refs.wrapper.click()

      document.addEventListener('keydown', this.keydownHandle)
      document.addEventListener('keyup', this.keyupHandle)
    })
  }
}
</script>

<style lang="stylus">
.palette-wrapper {
  position: relative;
  box-sizing: content-box;
  display: inline-block;
  box-shadow: 2px 3px 4px #3333;
  border: 1px solid #eee;
  overflow: hidden;
  font-size: 0;

  .test {
    display: block;
    background: #fff;
    cursor: default;
    outline: none;
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
  }

  .hidden {
    position: fixed;
    top: 0;
    left: 0;
    visibility: hidden;
  }

  .popre {
    position: absolute;
  }

  .load-info {
    position: absolute;
    bottom: 0;
    padding-left: 12px;
    padding-bottom: 12px;
    line-height: 18px;
    font-size: 12px;
    color: #455;
    transition: all 0.7s;

    &>p:last-child {
      position: relative;
      animation: info-shake 0.3s infinite;
    }

    @keyframes info-shake {
      0% {
        transform: scale(1);
      }

      100% {
        transform: scale(1.1);
        left: 2px;
      }
    }
  }

  .load-info-opacity-zero {
    opacity: 0;
  }

  .load-info-hide {
    display: none;
  }
}

.el-popover {
  .content {
    min-height: 19px;

    .content-item {
      .user {
        font-weight: 700;
      }
    }
  }
}
</style>
