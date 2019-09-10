<template>
  <div id="board"
       ref="board">
    <div class="color-pick-wrapper">
      <s-color-picker v-model="color"></s-color-picker>
    </div>

    <s-canvas :color="color"></s-canvas>

    <div class="left-wrapper">
      <notice></notice>
      <login :userName="userName"></login>
      <chat :height="chartHeight"></chat>
    </div>
  </div>
</template>

<script>
import SColorPicker from '@pixel/components/s-color-picker/index'
import SCanvas from '@pixel/components/s-canvas/index'
import login from './login'
import notice from './notice'
import chat from './chat'
import { getSysInfo } from '@pixel/assets/js/api'
import createFps from 'fps-indicator'

export default {
  name: 'index',
  components: {
    SColorPicker,
    SCanvas,
    login,
    notice,
    chat
  },
  data() {
    return {
      color: '#333333',
      chartHeight: 0
    }
  },
  computed: {
    userName() {
      return this.$store.getters.pixelUserName
    }
  },
  methods: {
    init() {
      getSysInfo().then(data => {
        this.$store.commit('pixelSetNotice', data.notice)
        this.$store.commit('pixelSetJokes', data.sbJokes)
        this.$store.commit('pixelSetTalkWays', data.talkWays)
      })
    },
    fpsInit() {
      let board = this.$refs.board
      let fps = createFps({
        container: board,
        position: 'top-right',
        style: {
          position: 'absolute',
          right: '112px',
          top: '14px',
          color: '#333'
        }
      })
    }
  },
  created() {
    this.init()
  },
  mounted() {
    this.$nextTick(() => {
      this.fpsInit()
    })
  }
}
</script>

<style lang="stylus" scoped>
#board {
  position: relative;
  display: inline-block;
  box-sizing: border-box;
  width: 1920px;
  padding-left: 120px;
  padding-right: 120px;
  text-align: left;

  .color-pick-wrapper {
    width: 1024px;
    margin-top: 24px;
    margin-bottom: 12px;
    box-shadow: 2px 3px 4px #3333;
    border-radius: 4px;
  }

  .left-wrapper {
    position: absolute;
    right: 120px;
    top: 24px;
    width: 640px;
  }
}
</style>
