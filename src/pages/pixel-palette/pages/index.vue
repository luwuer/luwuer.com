<template>
  <div id="index">
    <div class="color-pick-wrapper">
      <s-color-picker v-model="color"></s-color-picker>
    </div>

    <s-canvas :color="color"></s-canvas>
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
    margin 8px auto
    box-shadow 2px 3px 4px #3333
    border-radius 4px
  }
}
</style>
