<template>
  <div id="index">
    <h1>{{title}}</h1>
    <div class="palette-wrapper">
      <canvas :width="widthStr" :height="heightStr"></canvas>
    </div>
  </div>
</template>

<script>
export default {
  name: 'index',
  data() {
    return {
      title: 'Pixel Palette',
      width: 1024,
      height: 512
    }
  },
  computed: {
    widthStr() {
      return `${this.width}px`
    },
    heightStr() {
      return `${this.height}px`
    }
  },
  created() {}
}
</script>

<style lang="stylus" scoped>
#index {
  .palette-wrapper {
    display inline-block
    margin-left auto
    margin-right auto

    canvas {
      background #233
    }
  }
}
</style>
