<template>
  <ul class="app-list">
    <li v-if="apps.length === 0"></li>
    <li v-else
        v-for="(app, index) in apps"
        :key="app.name"
        @click="changeRoute(app.path)"
        class="list">
      <p class="name"># {{app.name}}</p>
      <p class="des">{{app.des}}</p>
      <p class="underline"
         v-if="index !== apps.length - 1">--------------------------------------------------------------------------------------</p>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'app-list',
  props: {
    /**
     * name
     * des
     * path 需要访问的路由路径
     */
    apps: {
      type: Array,
      default: []
    }
  },
  methods: {
    changeRoute(path) {
      this.$router.push(path)
    }
  }
}
</script>

<style lang="stylus">
.app-list {
  padding-top: 6px;

  .list {
    margin-top: 12px;
    margin-bottom: 12px;
    cursor: pointer;

    .name {
      margin-top: 0.5rem;
      margin-bottom: 0.5rem;
      font-size: 16px;
      font-weight: bold;
    }

    .des {
      font-size: 14px;
      line-height: 16px;
    }
  }
}
</style>
