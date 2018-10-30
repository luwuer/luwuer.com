<template>
  <div class="test">
    <canvas ref="cv"
            :width="width"
            :height="height"></canvas>
    <button @click="clickHandle">Large</button>
  </div>
</template>

<script>
export default {
  name: 'test',
  data() {
    return {
      width: 400,
      height: 200
    }
  },
  methods: {
    clickHandle() {
      // this.width += 100
      // this.height += 50
      debugger
      // let ctx = this.$refs.cv.getContext('2d')
      // ctx.scale(2, 2)
    }
  },
  mounted() {
    this.ctx = this.$refs.cv.getContext('2d')
    this.ctx.scale(4, 4)
    this.ctx.fillRect(0, 0, 10, 10)
  }
}
</script>

<style lang="stylus" scoped>
.test {
  canvas {
    border 1px solid #333
  }
}
</style>
