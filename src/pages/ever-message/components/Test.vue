<template>
  <h1>{{msg}}</h1>
</template>

<script>
export default {
  name: 'ever-test',
  data () {
    return {
      msg: 'ever components test'
    }
  },
  created () {
    console.log('ever-test created ...')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style stylus scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
