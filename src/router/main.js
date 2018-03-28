import Vue from 'vue'
import Router from 'vue-router'
import Homepage from '@/components/Homepage'
import Test from '@/components/Test'

Vue.use(Router)

export default new Router({
  // 不能使用history模式，否则路由不生效
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Homepage',
      component: Homepage
    },
    {
      path: '/test',
      name: 'Test',
      component: Test
    }
  ]
})
