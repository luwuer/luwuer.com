import Vue from 'vue'
import Router from 'vue-router'
import Homepage from '@/pages/index/components/homepage'
import Test from '@/pages/index/pages/test'
import TestGroupTree from '@/pages/index/pages/test/test-group-tree'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'homepage',
      component: Homepage
    },
    {
      path: '/test',
      name: 'test',
      component: Test
    },
    {
      path: '/test/group-tree',
      name: 'testGroupTree',
      component: TestGroupTree
    }
  ]
})
