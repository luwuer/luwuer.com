import Vue from 'vue'
import Router from 'vue-router'
import Homepage from '@/components/Homepage'
import Test from '@/components/Test'

Vue.use(Router)

export default new Router({
  mode: 'history',
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
