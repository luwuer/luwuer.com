<template>
  <div class="test-group-tree">
    <h1 draggable="true"
        ondragstart="dragStartHandle1">分组树测试</h1>
    <h2 draggable>...</h2>

    <p id="p1"
       draggable="true"
       @ondragstart="dragstart_handler">This element is draggable.</p>
    <h-tree :data="baseData"
            show-checkbox></h-tree>
  </div>
</template>

<script>
import Vue from 'vue'
import hui from 'h_ui'
import 'h_ui/dist/h_ui.min.css'

Vue.use(hui)

export default {
  name: 'test-group-tree',
  data() {
    return {
      baseData: [
        {
          expand: true,
          checked: true,
          title: 'parent 1',
          children: [
            {
              title: 'parent 1-0',
              expand: true,
              disabled: true,
              children: [
                {
                  expand: true,
                  checked: true,
                  disabled: true,
                  title: 'leaf',
                  disableCheckbox: true
                },
                {
                  title: 'leaf'
                }
              ]
            },
            {
              title: 'parent 1-1',
              expand: true,
              checked: true,
              children: [
                {
                  title: '<span style="color: red">leaf</span>'
                },
                {
                  title: 'leaf2'
                }
              ]
            }
          ]
        }
      ]
    }
  },
  methods: {
    dragStartHandle1(e) {
      console.log(e)
      // 添加拖拽数据
      e.dataTransfer.setData('text/plain', e.target.id)
      e.dataTransfer.setData('text/html', '<p>Example paragraph</p>')
      e.dataTransfer.setData('text/uri-list', 'http://developer.mozilla.org')
    },
    dragstart_handler(ev) {
      console.log(ev)
      console.log('dragStart')
      // Add the target element's id to the data transfer object
      ev.dataTransfer.setData('text/plain', ev.target.id)
    }
  }
}
</script>

<style lang="stylus" scoped>
.test-group-tree {
  text-align left
}
</style>
