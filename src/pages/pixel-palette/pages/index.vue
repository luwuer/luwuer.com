<template>
  <div id="index">
    <h1>{{title}}</h1>
    <div class="color-pick-wrapper">
      <s-color-picker v-model="color"></s-color-picker>
    </div>
    <div class="palette-wrapper">
      <canvas :width="widthStr" :height="heightStr"></canvas>
    </div>
  </div>
</template>

<script>
import sColorPicker from '@pp/components/s-color-picker/index'

export default {
  name: 'index',
  components: {
    sColorPicker
  },
  data() {
    return {
      title: 'Pixel Palette',
      width: 1024,
      height: 512,
      color: '#e4e4e4'
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
  text-align center

  .color-pick-wrapper {
    width 1024px
    margin-left auto
    margin-right auto
    box-shadow 3px 4px 4px #3333
    margin-bottom 12px
  }

  .palette-wrapper {
    display inline-block

    canvas {
      background #233
    }
  }
}
</style>
