<template>
  <div class="test">
ssssssssssssssssssssssssssssss
<a @click="backto">返回</a>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {

    }
  },
  components: {

  },
  methods: {
    backto() {
      this.$router.push({ path: '/documentation/index' })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.test{
    position: relative;
    z-index: 100;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ffffff
}
</style>
