<template>
  <div ref="wrapper"
       class="notice-box"
       v-if="content">
    <svg class="icon"
         aria-hidden="true">
      <use xlink:href="#icon-tixing"></use>
    </svg>
    <span class="content">{{renderContent[0]}}</span>
    <p class="content-expand"
       v-for="(c, index) in renderContent.slice(1)"
       :key="index">{{c}}</p>
  </div>
</template>

<script>
export default {
  name: 'notice-box',
  computed: {
    content() {
      return this.$store.getters.pixelNotice
    },
    renderContent() {
      return this.content.split('\n')
    }
  },
  watch: {
    content(val) {
      if (val) {
        this.$nextTick(() => {
          this.$store.commit(
            'pixelSetNoticeHeight',
            this.$refs.wrapper.offsetHeight
          )
        })
      }
    }
  }
}
</script>

<style lang="stylus">
.notice-box {
  font-size: 14px;
  padding: 6px 12px;
  background-color: #f4f4f5;
  color: #909399;
  margin-bottom: 12px;
  border-radius: 4px;

  .icon {
    font-size: 18px;
    color: #ff3333;
  }

  .content-expand {
    padding-left: 22px;
    padding-top: 6px;
  }
}
</style>
