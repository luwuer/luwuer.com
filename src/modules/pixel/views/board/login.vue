<template>
  <div class="login-box"
       ref="wrapper">
    <div class="registered"
         v-if="userName">

      <span>{{jokes[Math.floor(Math.random() * jokes.length)]}}@</span><span class="name">{{userName}}</span>
    </div>
    <div class="unregistered"
         v-else>
      <el-row :gutter="12">
        <el-col :span="20">
          <el-input v-model="name"
                    :minlength="1"
                    :maxlength="20"
                    placeholder="请输入你的常用昵称"
                    @keyup.enter.native="register"></el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary"
                     style="width: 100%"
                     @click="register">Submit</el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { register } from '@pixel/assets/js/api'

export default {
  name: 'login-box',
  props: {
    userName: String
  },
  data() {
    return {
      name: ''
    }
  },
  computed: {
    jokes() {
      return this.$store.getters.pixelJokes
    }
  },
  methods: {
    register() {
      if (!this.name) return

      register(this.name).then(data => {
        // 用户名已被注册
        if (data.code === 4001) return

        if (data.code !== 0) {
          this.$notify.error({
            title: '错误',
            message: data.msg
          })
        }

        this.$store.commit('pixelSetName', data.name)
        this.$notify({
          title: '成功',
          message: `您是本画板的第${
            data.count
          }位注册用户，快在画板上留下你的作品吧~`,
          type: 'success'
        })
      })
    }
  },
  mounted() {
    this.$store.commit('pixelSetLoginHeight', this.$refs.wrapper.offsetHeight)
  }
}
</script>

<style lang="stylus">
.login-box {
  margin-bottom: 12px;
  font-size: 14px;
  color: #555;

  .registered {
    padding: 12px 12px 8px;
    box-shadow: 0px 2px 4px rgba(51, 51, 51, 0.2);
    border-radius: 6px;

    .name {
      font-weight: bold;
    }
  }
}
</style>
