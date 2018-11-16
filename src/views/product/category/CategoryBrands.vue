<template>
  <div class="app-container">
     <el-transfer
      style="text-align: left; display: inline-block"
      v-model="catBrand.brandIds"
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
import { loadCatBrand, saveCatBrand } from '@/api/product/brand'
import { Message } from 'element-ui'
export default {
  props: {
    catId: Number
  },
  data() {
    return {
      tableData: [],
      catBrand: {
        categoryId: this.catId,
        brandIds: []
      }
    }
  },
  created() {
    this._getBrandList(this.catId)
  },
  methods: {
    handleSave() {
      saveCatBrand(this.catBrand).then((res) => {
        Message({
          message: res.msg,
          type: 'success',
          duration: 3 * 1000
        })
      })
    },
    _getBrandList(params) {
      loadCatBrand(params).then(res => {
        this.tableData = res.data.allBrands
        this.catBrand.brandIds = res.data.ownBrands
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
