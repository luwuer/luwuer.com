import Vue from 'vue'
import Vuex from 'vuex'
import main from './modules/main'
import user from './modules/user'
import permission from './modules/permission'
import getters from './getter'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    main,
    user,
    permission
  },
  getters
})
