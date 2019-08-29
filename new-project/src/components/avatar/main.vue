<template>
  <div id="avatar">
    <div :style="imgStyles"
         @mouseenter="rotateStart"
         @mouseleave="rotateStop"></div>
  </div>
</template>

<script>
import { randomColor } from '@/assets/js/utils'

export default {
  name: 'avatar',
  props: {
    size: {
      type: Number,
      default: 60
    },
    url: {
      type: String
    }
  },
  data() {
    return {
      rc: randomColor()
    }
  },
  computed: {
    imgStyles() {
      let bg = ''
      if (this.url) {
        bg = `url(${this.url})`
      } else {
        bg = this.rc
      }

      return {
        width: `${this.size}px`,
        height: `${this.size}px`,
        borderRadius: `${Math.floor(this.size / 2)}px`,
        background: bg,
        backgroundSize: 'cover'
      }
    }
  },
  methods: {
    rotateStart() {
      console.log('rotateStart')
    },
    rotateStop() {
      console.log('rotateStop')
    }
  }
}
</script>

<style lang="stylus">
#avatar {
  display: inline-block;
  animation: hue-rotate-revert 90s infinite linear;

  &:hover {
    transform: rotate(360000deg);
    transition-delay: 1s;
    transition-property: all;
    transition-duration: 60s;
    transition-timing-function: cubic-bezier(0.34, 0, 1, 1);
  }
}
</style>
