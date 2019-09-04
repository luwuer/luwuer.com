import Vue from 'vue'

Vue.directive('scrollBottom', {
  componentUpdated: function (el) {
    el.scrollTop = el.scrollHeight
  }
})
