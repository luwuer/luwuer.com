<template>
  <box class="index-content">
    <div class="header">
      <avatar ref="head"
              class="head"
              :url="headshotUrl"></avatar>
      <div class="head-info"
           :style="{color: rc}">
        <div class="top">
          莫得盐
        </div>
        <div class="bottom">
          <a href="https://github.com/luwuer"
             target="_blank"
             title="GitHub"
             class="tag">
            GitHub
          </a>
          <a href="https://juejin.im/user/5a3780546fb9a0451f3109de"
             target="_blank"
             title="掘金"
             class="tag">
            掘金
          </a>
          <a href="https://blog.luwuer.com"
             target="_blank"
             title="Blog"
             class="tag">
            Blog
          </a>
        </div>
      </div>
    </div>
    <div class="apps">
      <app-list :apps="apps"></app-list>
    </div>
  </box>
</template>

<script>
import avatar from '@/components/avatar/main'
import box from '@/components/box/main'
import appList from './app-list'
import { randomColor } from '@/assets/js/utils'

export default {
  name: 'index-content',
  components: {
    avatar,
    box,
    appList
  },
  data() {
    return {
      headshotUrl:
        'https://mirror-gold-cdn.xitu.io/168e08c7af995a9e6ee?imageView2/1/w/180/h/180/q/85/format/webp/interlace/1',
      rc: this.$store.getters.themeColor,
      apps: [
        {
          name: '公司社区登录界面',
          des:
            '某周一发现公司社区改版后的登录界面十分难看，以至于早上九点半（上班半小时），论坛首页几乎都是吐槽。想着公司新 Logo 逻辑用数组能很容易实现，所以在之后的三个半小时自己做了一版，并把网址发到论坛，没想到帖子在两天内冲到了论坛热度排名前 40 （大概 2000 年开始运营）。',
          path: '/mod/demo/login'
        },
        {
          name: '像素绘版',
          des:
            '某个夏天看到 bilibili 夏日祭绘板玩的人很多，大家齐心协力画出了很多有趣的图像和标识，于是想着自己也写一个试试，2019 年暑假第二次优化。',
          path: '/mod/pixel/board'
        }
        // {
        //   name: 'PostLOS',
        //   des:
        //     'Post Little Order Sister ，邮差小姐姐，一个接口调试网站。通常我在本地部署该项目，后端通过 IP 和端口可以在这个网站上调试接口，相比 Postman 的优势在于可以验证 CORS 是否配置无误。',
        //   path: '/mod/demo/login'
        // }
      ]
    }
  }
}
</script>

<style lang="stylus">
.index-content {
  // position: relative;
  // top: -10px;
  display: inline-block;
  margin: auto;
  width: 600px;
  min-height: 300px;
  padding: 12px 18px 6px;
  // background: #eee5;
  border-radius: 12px;

  .header {
    height: 70px;
    border-bottom: 1px solid #fff8;

    .head {
      float: left;
    }

    .head-info {
      margin-left: 60px;
      height: 60px;
      padding-left: 1rem;

      .top {
        height: 30px;
        line-height: 40px;
        font-size: 18px;
        font-weight: 700;
        // background: url('~@/assets/imgs/3.min.jpg');
        // background-size: cover;
        background-clip: text;
        -webkit-text-fill-color: transparent;
      }

      .bottom {
        height: 30px;
        line-height: 36px;
        font-size: 14px;

        // color: #666;
        .tag {
          cursor: pointer;
          margin-right: 14px;

          &>svg {
            font-size: 16px;
          }
        }
      }
    }
  }
}
</style>
