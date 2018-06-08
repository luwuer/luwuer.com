<template>
  <div id="homepage"
       ref="homepage">
    <div class="home-bgs">
      <canvas ref="canvas-bg"
              class="home-bg"></canvas>
      <canvas ref="canvas-bg-cover"
              class="home-bg-cover"
              style="background: #fff;"></canvas>
    </div>
    <div class="home-contents">

    </div>
  </div>
</template>

<script>
import { index } from '@/assets/js/common/img-import.js'

/**
 * @description 图像块类
 */
class Chunk {
  constructor(x, y, data) {
    this.x = x
    this.y = y
    this.data = data
  }
}

/**
 * @description 生成随机数
 */
function random(min, max) {
  if (max == null) {
    max = min
    min = 0
  }
  return min + Math.floor(Math.random() * (max - min + 1))
}

/**
 * @description 洗牌算法，打乱数组
 */
function shuffle(arr) {
  let len = arr.length
  let shuffled = Array(len)
  for (let i = 0, rand; i < len; i++) {
    rand = random(0, i)
    shuffled[i] = shuffled[rand]
    shuffled[rand] = arr[i]
  }
  return shuffled
}

/**
 * @description 把图片块渲染到canvas
 * @param {Obejct} ctx canvas绘图环境
 * @param {Array} chunks 图片块
 * @param {Number} num 未渲染块
 * @param {Number} perNum 每次渲染块
 */
function renderImg(ctx, chunks, num = chunks.length - 1, perNum = Math.floor(chunks.length / 100)) {
  console.log('renderImg..')
  console.log(num)
  console.log(perNum)
  // 未渲染块数等于图片块长度时打乱图片块
  if (num === chunks.length - 1) chunks = shuffle(chunks)

  // 渲染到画布
  for (let i = 0; i < perNum; i++) {
    let chunk = chunks[num - i]
    if (!chunk) break
    ctx.putImageData(chunk.data, chunk.x, chunk.y)
  }

  // 未渲染块存在则递归
  if (num > 0) {
    setTimeout(() => {
      renderImg(ctx, chunks, num - perNum, perNum)
    }, 5)
  }
}

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

      // html设置overflow
      document.querySelector('html').style.overflow = 'hidden'
    })
  },
  methods: {
    /**
     * @description 获取浏览器窗口宽高等信息
     */
    getWindowInfo() {
      // 窗口宽
      this.$set(
        this.winInfo,
        'ww',
        window.innerWidth || document.body.clientWidth
      )
      // 窗口高
      this.$set(
        this.winInfo,
        'wh',
        window.innerHeight || document.body.clientHeight
      )
      console.log(this.winInfo)
    },
    /**
     * @description 画图到canvas
     */
    drawImg() {
      if (this.canvas.getContext) {
        let ctx = this.canvas.getContext('2d')
        let img = new Image()
        let i = Math.floor(Math.random() * 17)
        img.src = this.imgMap[i]
        img.onload = () => {
          ctx.drawImage(img, 0, 0, this.winInfo.ww, this.winInfo.wh)
          let chunks = this.getChunks(ctx, 40)
          renderImg(this.canvasCover.getContext('2d'), chunks)
        }
      }
    },
    /**
     * @description 获取图片的像素小块er
     * @param {Obejct} ctx canvas绘图环境
     * @param {Number} size 小块大小size*size
     */
    getChunks(ctx, size) {
      // eslint-disable-line
      let chunks = []
      // 获取canvas的像素数据
      let imgData = ctx.getImageData(0, 0, this.winInfo.ww, this.winInfo.wh)
      console.log(ctx)
      console.log(imgData)
      for (let x = 0; x < imgData.width; x += size) {
        for (let y = 0; y < imgData.height; y += size) {
          let chunk = new Chunk(x, y, ctx.getImageData(x, y, size, size))
          chunks.push(chunk)
        }
      }
      return chunks
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
