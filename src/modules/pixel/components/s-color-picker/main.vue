<template>
  <div id="sColorPicker"
       :style="{'border-top': `4px solid ${value}`}">
    <div class="default-plate">
      <span class="label">选取颜色</span>
      <ul class="color-wrapper">
        <li class="color-item"
            v-for="(color, index) in defaults"
            :key="index"
            :style="{'background': color, 'border': renderBorder(color) ? '1px solid #eee' : 'none'}"
            @click="pick(color)"></li>
        <li class="color-item more-color"
            title="自定义颜色"
            :style="{'border': renderBorder(csutomerColor) ? '1px solid #eee' : 'none'}">
          <el-color-picker v-model="csutomerColor"></el-color-picker>
        </li>
      </ul>
    </div>
    <div class="history-plate">
      <span class="label">历史颜色</span>
      <ul class="color-wrapper">
        <li class="color-item"
            v-for="(color, index) in histories"
            :key="index"
            :style="{'background': color, 'border': renderBorder(color) ? '1px solid #eee' : 'none'}"
            @click="pick(color)"></li>
      </ul>
    </div>
  </div>
</template>

<script>
// import 'element-ui/packages/theme-chalk/lib/input.css'
// import 'element-ui/packages/theme-chalk/lib/button.css'
// import { ColorPicker } from 'element-ui'
import ls from '@/assets/js/ls'

const DEFAULTS = [
  '#ffffff',
  '#e4e4e4',
  '#888888',
  '#222222',
  '#FF6666',
  '#FF3333',
  '#FF0000',
  '#FFCC66',
  '#FF9933',
  '#FF9900',
  '#FFFF66',
  '#FFFF33',
  '#FFFF00',
  '#33FF66',
  '#33CC33',
  '#339900',
  '#99FF99',
  '#66FF99',
  '#00CC99',
  '#33FFFF',
  '#3399FF',
  '#3333FF',
  '#ffa7d1',
  '#cf6ee4',
  '#820080'
]

export default {
  name: 'sColorPicker',
  props: {
    value: {
      type: String,
      default: '#ffffff'
    }
  },
  data() {
    return {
      defaults: DEFAULTS,
      histories: [],
      csutomerColor: '#ff0000'
    }
  },
  computed: {},
  methods: {
    init() {
      let temp = ls.getItem('history-colors')
      console.log(temp)
      if (temp && temp.length) {
        this.histories = temp || []
        this.$emit('input', this.histories[0])
        this.csutomerColor = this.histories[0]
      }

      // 当前页tab被切换 | 切换回来
      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') {
          document.title = 'pixel-palette-visible'
        } else {
          document.title = 'pixel-palette-hidden'
        }
      })

      // 关闭缓存
      window.addEventListener('unload', () => {
        ls.setItem('history-colors', this.histories)
      })
    },
    pick(color) {
      if (this.histories[0] !== color) {
        // change histories
        this.histories.unshift(color)
        this.histories.splice(27, 1)
      }

      this.csutomerColor = color

      this.$emit('input', color)
    },
    renderBorder(color) {
      let r = parseInt(color.slice(1, 3), 16)
      let g = parseInt(color.slice(3, 5), 16)
      let b = parseInt(color.slice(5, 7), 16)
      if (r > 238 && g > 238 && b > 238) {
        return true
      } else {
        return false
      }
    }
  },
  watch: {
    csutomerColor(newVal) {
      if (newVal === null) {
        this.csutomerColor = '#ffffff'
        return
      }

      if (newVal !== this.value) {
        this.pick(newVal)
      }
    }
  },
  created() {
    this.init()
  }
}
</script>

<style lang="stylus">
#sColorPicker {
  display: flex;
  flex-direction: column;
  text-align: left;

  .history-plate, .default-plate {
    flex: 1 1 auto;
    display: flex;
    flex-direction: row;
    overflow: hidden;

    .label {
      flex: 0 0 60px;
      line-height: 32px;
      font-size: 12px;
    }

    .color-wrapper {
      flex: 1 1 auto;
      height: 32px;
      padding-top: 4px;
      padding-bottom: 4px;

      .color-item {
        box-sizing: border-box;
        display: inline-block;
        height: 24px;
        width: 24px;
        margin-right: 12px;
        border-radius: 6px;
        cursor: pointer;
        transition: all 0.2s;

        &:hover {
          transform: scale(1.2);
        }

        &:last-child {
          margin-right: 0;
        }

        .el-color-picker {
          height: 24px;

          .el-color-picker__trigger {
            width: 54px;
            height: 24px;
            padding: 0;
            border: none;

            .el-color-picker__color {
              border: none;
            }
          }
        }
      }

      .more-color {
        width: 54px;
        overflow: hidden;

        &>input {
          height: 24px;
          width: 54px;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
