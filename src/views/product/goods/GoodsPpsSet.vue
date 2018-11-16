  <template>
  <div class="app-container">
    <el-tabs :tab-position="tabPosition" style="height: 100%">
    <el-tab-pane label="属性设置">
      <goods-props :goodsId="goodsId"></goods-props>
    </el-tab-pane>
    <!-- <el-tab-pane :lazy="tabPaneLazy" label="参数设置">
      <goods-params :goodsId="goodsId"></goods-params>
    </el-tab-pane> -->
    <el-tab-pane :lazy="tabPaneLazy" label="规格设置">
      <goods-spac :goodsId="goodsId"></goods-spac>
    </el-tab-pane>
     <el-button @click="handlePre">上一步</el-button>
      <el-button @click="handleNext">下一步</el-button>
  </el-tabs>
  </div>
</template>

<script type="text/ecmascript-6">
import GoodsProps from '@/views/product/goods/GoodsProps'
// import GoodsParams from '@/views/product/goods/GoodsParams'
import GoodsSpac from '@/views/product/goods/GoodsSpc'
export default {
  props: {
    goodsId: Number
  },
  data() {
    return {
      tabPosition: 'left',
      tabPaneLazy: false
    }
  },
  components: {
    GoodsProps,
    // GoodsParams,
    GoodsSpac
  },
  created() {

  },
  methods: {
    handleClose() {
      this.$emit('handleBasic', 0)
    },
    handleNext() {
      this.$emit('handleNext')
    },
    handlePre() {
      this.$emit('handlePre')
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
