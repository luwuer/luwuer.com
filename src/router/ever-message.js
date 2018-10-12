import Vue from 'vue'
import Router from 'vue-router'
import EverTest from '@/pages/ever-message/components/Test'
import EverTest1 from '@/pages/ever-message/components/Test1'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'test',
      component: EverTest
    },
    {
      path: '/test2',
      name: 'test2',
      component: EverTest1
    }
  ]
})
