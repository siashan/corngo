<template>
  <div class="app-container">
     <el-transfer
      style="text-align: left; display: inline-block"
      v-model="catSpec.specIds"
      filterable
      :render-content="renderFunc"
      :titles="['选择项', '目标项']"
      :button-texts="['到左边', '到右边']"
      :format="{
        noChecked: '${total}',
        hasChecked: '${checked}/${total}'
      }"
      :data="tableData">
       <el-button class="transfer-footer" slot="right-footer" size="small" @click="handleSave">保存</el-button>
    </el-transfer>
  </div>
</template>

<script type="text/ecmascript-6">
import { loadCatSpec, saveCatSpec } from '@/api/product/spec'
import { Message } from 'element-ui'
export default {
  props: {
    catId: Number
  },
  data() {
    return {
      tableData: [],
      catSpec: {
        categoryId: this.catId,
        specIds: []
      }
    }
  },
  created() {
    this._getSpecList(this.catId)
  },
  methods: {
    handleSave() {
      saveCatSpec(this.catSpec).then((res) => {
        Message({
          message: res.msg,
          type: 'success',
          duration: 3 * 1000
        })
      })
    },
    _getSpecList(params) {
      loadCatSpec(params).then(res => {
        this.tableData = res.data.allSpec
        this.catSpec.specIds = res.data.ownSpec
      })
    },
    renderFunc(h, option) {
      return <span>{ option.key } - { option.label }</span>
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
