<template>
  <div class="page">
        <el-autocomplete v-if="optionArr" 
      class="inline-input"
      :fetch-suggestions="querySearch"
      placeholder="请输入内容"
      v-model="state1"
      :value="value"
      @select="handleSelect"
      @input="change($event)"
    ></el-autocomplete>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'ueditor',
  data() {
    return {
      state1: ''
    }
  },
  props: {
    optionArr: {
      type: String
    },
    value: String
  },
  mounted() {
  },
  methods: {
    querySearch(queryString, cb) {
      const restaurants = this.optionArr.split('|')
      const results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
      const arrs = []
      for (let i = 0; i < results.length; i++) {
        const node = {}
        node.value = restaurants[i]
        arrs.push(node)
      }
      return cb(arrs)
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (restaurant.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    handleSelect(item) {
      this.$emit('input', item.value)
    },
    change: function(val) {
      this.$emit('input', val)
    }
  }

}
</script>
