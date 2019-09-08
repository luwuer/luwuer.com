<template>
  <div class="box">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'box'
}
</script>

<style lang="stylus">
.box {
  box-shadow: 0 0 10px 0px #fff;
}
</style>
