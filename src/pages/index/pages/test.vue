<template>
  <div class="test">
    <background class="bg"></background>
    <div class="content-wrapper">
      <ul class="letter-wrapper">
        <li v-for="(letter, index) in title"
            :key="index"
            :ref="`letter${index}`"
            :style="generateLetterStyle(index)"
            class="letter">
          <svg class="icon"
               aria-hidden="true">
            <use :xlink:href="letter"></use>
          </svg>
        </li>
      </ul>

      <div class="input-wrapper">
        <h-form ref="formItems"
                :model="formItems"
                :label-width="0">
          <h-row>
            <h-col :span="24">
              <h-form-item prop="username">
                <h-input v-model="formItems.username"
                         :maxlength="6"
                         :class="focusItem === 'username' && 'h-input-focus'"
                         @on-focus="focusItem = 'username'"
                         @on-blur="focusItem = ''"
                         placeholder="域账号">
                  <i class="icon-wrapper"
                     slot="prepend">
                    <svg class="icon"
                         aria-hidden="true">
                      <use xlink:href="#icon-denglu-tubiao-"></use>
                    </svg>
                  </i>
                </h-input>
              </h-form-item>
            </h-col>
            <h-col :span="24">
              <h-form-item prop="password">
                <h-input v-model="formItems.password"
                         :maxlength="64"
                         type="password"
                         :class="focusItem === 'password' && 'h-input-focus'"
                         @on-focus="focusItem = 'password'"
                         @on-blur="focusItem = ''"
                         placeholder="密码">
                  <i class="icon-wrapper"
                     slot="prepend">
                    <svg class="icon"
                         aria-hidden="true">
                      <use xlink:href="#icon-mima"></use>
                    </svg>
                  </i>
                </h-input>
              </h-form-item>
            </h-col>
          </h-row>
        </h-form>

        <h-button type="primary"
                  :loading="loading"
                  @click="login">登 录</h-button>
      </div>
    </div>
  </div>
</template>

<script>
import Form from 'h_ui/src/components/Form'
import Row from 'h_ui/src/components/Grid'
import Input from 'h_ui/src/components/Input'
import Button from 'h_ui/src/components/Button'
import 'h_ui/dist/h_ui.min.css'
import Background from '@/pages/index/components/homepage'

const colors = [
  '#0099CC',
  '#00CCCC',
  '#00CC99',
  '#00CC66',
  '#00FF33',
  '#00FF99',
  '#00FFFF',
  '#333366',
  '#333333',
  '#339966',
  '#3399CC',
  '#33FF66',
  '#6666FF',
  '#66CCFF',
  '#66FF33',
  '#990000',
  '#993399',
  '#993300',
  '#996633',
  '#999966',
  '#99CC00',
  '#CC0033',
  '#CC3300',
  '#CC3333',
  '#CC33CC',
  '#CC3366',
  '#CCCC00',
  '#FF6633',
  '#FF6600'
]
const perLevelHeight = 24

export default {
  name: 'test',
  components: {
    'h-form': Form,
    'h-form-item': Form.Item,
    'h-row': Row,
    'h-col': Row.Item,
    'h-input': Input,
    'h-button': Button,
    Background
  },
  data() {
    return {
      loading: false,
      focusItem: '',
      formItems: {},
      title: [
        '#icon-zimu-',
        '#icon-zimu-1',
        '#icon-zimu-2',
        '#icon-zimu-3',
        '#icon-zimu-4',
        '#icon-zimu-5',
        '#icon-zimu-6'
      ],
      bgColor: ''
    }
  },
  computed: {
    letterWrapperStyle() {
      return `background: ${this.bgColor}`
    }
  },
  methods: {
    levelInit() {
      // level {Number, Int} [-1, 1]
      let baseLevel = Math.floor(Math.random() * 3) - 1
      this.titleRenderObject.forEach(item => {
        // add -1 / 0 / 1
        baseLevel += Math.floor(Math.random() * 3) - 1
        if (baseLevel < -1) {
          baseLevel = -1
        } else if (baseLevel > 1) {
          baseLevel = 1
        }
        item.level = baseLevel
      })
    },
    generateLetterStyle(index) {
      return `top: ${this.titleRenderObject[index].level * perLevelHeight}px; ${
        this.letterWrapperStyle
      }`
    },
    login() {
      alert('call login api...')
      this.loading = true
    }
  },
  created() {
    this.titleRenderObject = this.title.map(letter => {
      let tmp = {
        letter,
        level: 0
      }
      return tmp
    })
    this.levelInit()
    debugger
  },
  mounted() {
    // 背景颜色初始化
    let len = colors.length
    this.bgColor = colors[Math.floor(Math.random() * len)]
    setInterval(() => {
      // 改变背景颜色
      this.bgColor = colors[Math.floor(Math.random() * len)]
      // 字符动画
      this.levelInit()
    }, 2000)
  }
}
</script>

<style lang="stylus">
li {
  list-style none
}

.icon {
  width 1em
  height 1em
  vertical-align -0.15em
  fill currentColor
  overflow hidden
}

.test {
  text-align center

  .bg {
    filter blur(64px)
  }

  .content-wrapper {
    position absolute
    top 50%
    left calc(50% - 200px)
    width 360px
    transform translateY(-50%)

    .letter-wrapper {
      display inline-block
      height 108px
      padding 0
      font-weight 700
      color white

      // transition all .3s
      .letter {
        position relative
        top 0
        transition all 1s
        display inline-block
        padding 2px 0
        font-size 40px

        &:first-child {
          padding-left 4px
        }

        &:last-child {
          padding-right 4px
        }
      }
    }

    .input-wrapper {
      display flex

      .h-form {
        flex 1 1 auto
        padding-right 12px
        padding-left 12px

        .h-col {
          .h-form-item {
            margin-bottom 0
          }

          &:first-child {
            .h-form-item {
              margin-bottom 12px
            }
          }
        }

        .h-input-wrapper {
          border 1px solid #fff
          border-radius 4px

          &>.h-input-group-prepend, &>input {
            border none
            border-radius 0
            background #fff
            color #333

            .icon {
              font-size 20px
            }
          }
        }

        .h-input-focus {
          // border 1px solid #298DFF
          overflow hidden
          box-shadow none

          .icon {
            color #298DFF
          }
        }

        .form-error-wrapper {
          height 24px
          margin-bottom 12px
          line-height 24px
          background #ABB6CE
          color #D9534F
          font-size 12px

          &>.icon {
            position relative
            top 1px
            font-size 16px
          }
        }

        .icon-wrapper {
          font-size 16px
          color #ccc
        }
      }
    }
  }
}
</style>
