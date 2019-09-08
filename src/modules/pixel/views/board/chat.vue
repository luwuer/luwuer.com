<template>
  <div id="chat"
       :style="{height: height + 'px'}">
    <div class="display"
         v-if="pixelTalkWays.length"
         v-scrollBottom
         :style="{height: height - 101 + 'px'}">
      <ul class="msgs">
        <li class="msg-list"
            v-for="(msg, index) in msgs"
            :key="index">
          <span class="user">{{msg.user}}</span>
          <span class="talk-way"
                :style="{background: randomColor(msg.way)}">{{msg.way}}</span>
          <svg class="icon"
               aria-hidden="true"
               :style="{color: randomColor.color}">
            <use xlink:href="#icon-gonggao"></use>
          </svg>
          <span class="content"> {{msg.content}}</span>
        </li>
      </ul>
    </div>
    <div class="input">
      <el-input type="textarea"
                placeholder="既然讲话好听，就多讲一点( ctrl + enter 发送)"
                v-model="input"
                :rows="4"
                :autosize="false"
                @keydown.native="send"
                @keyup.native="keyupHandle">
      </el-input>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getChatHistory, sendChat } from '@pixel/assets/js/api'

const SPCOLORA = '#ffa7d1'
const SPCOLORB = '#B70404'
const COLORS = [
  '#888888',
  '#FF6666',
  '#FFCC66',
  '#00cc99',
  '#33cc34',
  '#6DE3E3',
  '#3399FF',
  '#cf6ee4'
]

export default {
  name: 'chat',
  data() {
    return {
      input: '',
      msgs: [],
      ctrlDown: false
    }
  },
  computed: {
    ...mapGetters([
      'pixelNoticeHeight',
      'pixelLoginHeight',
      'pixelTalkWays',
      'pixelUserName'
    ]),
    height() {
      return 600 - 14 - this.pixelNoticeHeight - this.pixelLoginHeight
    }
  },
  methods: {
    init() {
      // 取聊天记录
      getChatHistory().then(data => {
        this.msgs = data.data.reverse()
      })

      // 接收最新推送消息
      window.socket.on('newChat', data => {
        if (this.msgs.length === 50) {
          this.msgs.shift()
        }

        this.msgs.push(data)
      })
    },
    randomColor(way) {
      if (way === '娇喘') {
        this.randomColor.color = SPCOLORA
        return SPCOLORA
      }
      if (way === '失去生殖器') {
        this.randomColor.color = SPCOLORB
        return SPCOLORB
      }

      let color = COLORS[Math.floor(Math.random() * COLORS.length)]

      this.randomColor.color = color
      return color
    },
    randomTalkWay() {
      return this.pixelTalkWays[
        Math.floor(Math.random() * this.pixelTalkWays.length)
      ]
    },
    send(e) {
      if (e.key === 'Control') {
        e.preventDefault()
        this.ctrlDown = true
      } else if (e.key === 'Enter') {
        if (!this.ctrlDown) return

        if (!this.pixelUserName) {
          e.preventDefault()
          this.$notify.info({
            title: '提示',
            message: '请先填写常用昵称'
          })

          return
        }

        let way = this.randomTalkWay()
        if (way === '娇喘' || way === '失去生殖器') way = this.randomTalkWay()

        sendChat(this.input, this.pixelUserName, way)
        this.input = ''
      }
    },
    keyupHandle(e) {
      if (e.key === 'Control') {
        this.ctrlDown = false
      }
    }
  },
  created() {
    this.init()
  }
}
</script>

<style lang="stylus">
#chat {
  position: relative;
  box-sizing: border-box;
  padding-bottom: 100px;
  box-shadow: 0px 2px 4px rgba(51, 51, 51, 0.2);
  border-radius: 6px;
  font-size: 14px;

  .display {
    overflow: auto;

    .msgs {
      .msg-list {
        padding: 8px 12px;
        line-height: 18px;

        .user {
          font-weight: 700;
        }

        .talk-way {
          display: inline-block;
          padding: 2px 6px;
          border-radius: 5px;
          line-height: 14px;
          color: #fff;
        }

        .icon {
          position: relative;
          top: 1px;
          color: rgb(255, 102, 102);
          font-size: 16px;
          transform: scale(1.4);
        }

        .content {
          color: #333;
        }
      }
    }
  }

  .el-textarea {
    position: absolute;
    bottom: 0;
    box-size: border-box;
    height: 100px;
    border-top: 1px solid #9996;

    textarea {
      font-family: Microsoft YaHei !important;
      font-size: 14px;
      resize: none;
      border: none;
    }
  }
}
</style>
