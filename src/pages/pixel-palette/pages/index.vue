<template>
  <div id="index">
    <h1>{{title}}</h1>
    <div class="color-pick-wrapper">
      <s-color-picker v-model="color"></s-color-picker>
    </div>

    <s-canvas></s-canvas>
  </div>
</template>

<script>
import SColorPicker from '@pp/components/s-color-picker/index'
import SCanvas from '@pp/components/s-canvas/index'

export default {
  name: 'index',
  components: {
    SColorPicker,
    SCanvas
  },
  data() {
    return {
      title: 'Pixel Palette',
      color: '#333333'
    }
  },
  computed: {},
  methods: {},
  created() {},
  mounted() {}
}
</script>

<style lang="stylus" scoped>
#index {
  text-align center

  .color-pick-wrapper {
    width 1024px
    margin-left auto
    margin-right auto
    box-shadow 2px 3px 4px #3333
    border-radius 4px
    margin-bottom 12px
  }
}
</style>
