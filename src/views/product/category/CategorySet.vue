<template>
  <div class="app-container">
    <el-tabs :tab-position="tabPosition" style="height: 100%">
    <el-tab-pane label="属性设置">
      <category-props :catId="leafId"></category-props>
    </el-tab-pane>
    <el-tab-pane :lazy="tabPaneLazy" label="参数设置">
      <category-params :catId="leafId"></category-params>
    </el-tab-pane>
    <el-tab-pane :lazy="tabPaneLazy" label="规格设置">
      <category-spac :catId="leafId"></category-spac>
    </el-tab-pane>
    <el-tab-pane :lazy="tabPaneLazy" label="品牌设置">
      <category-brands :catId="leafId"></category-brands>
    </el-tab-pane>
  </el-tabs>
  </div>
</template>

<script type="text/ecmascript-6">
import CategoryProps from '@/views/product/category/CategoryProps'
import CategoryParams from '@/views/product/category/CategoryParams'
import CategorySpac from '@/views/product/category/CategorySpac'
import CategoryBrands from '@/views/product/category/CategoryBrands'
export default {
  props: {
    leafId: Number
  },
  data() {
    return {
      tabPosition: 'left',
      tabPaneLazy: true
    }
  },
  components: {
    CategoryProps,
    CategoryParams,
    CategoryBrands,
    CategorySpac
  },
  created() {
  },
  methods: {
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
