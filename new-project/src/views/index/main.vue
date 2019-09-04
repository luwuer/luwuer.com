<template>
  <div class="index">
    <!-- <background class="bg"></background> -->
    <div class="cover"></div>
    <div class="content-wrapper">
      <i-content></i-content>
    </div>
  </div>
</template>

<script>
import background from '@/components/background/main'
import iContent from './content'
export default {
  name: 'index',
  components: {
    background,
    iContent
  }
}
</script>

<style lang="stylus" scoped>
.index {
  text-align: left;

  .bg {
    filter: blur(64px);
  }

  .cover {
    position: fixed;
    top: 0;
    left: 0;
    // width: calc(100% - 20px);
    // height: calc(100% - 20px);
    // border: 10px solid #fff;
    // filter: blur(6px);
    // background: url('~@/assets/imgs/3.min.jpg');
    // background-size: cover;
    // filter: blur(64px);
    width: 100%;
    height: 100%;
    background: #000;
  }

  .content-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    padding: 10px;
    width: 100%;
    height: 100%;
    background: url('~@/assets/imgs/3.min.jpg');
    background-size: cover;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: hue-rotate 90s infinite linear;
  }
}
</style>
