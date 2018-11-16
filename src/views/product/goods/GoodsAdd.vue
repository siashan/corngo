  <template>
  <div class="app-container">
     <el-steps :active="active" finish-status="success" simple >
  <el-step title="完善基本信息"></el-step>
  <el-step title="完善图片信息"></el-step>
  <el-step title="完善参数/属性/规格信息"></el-step>
  <el-step title="提交"></el-step>
</el-steps>
  <goods-basic v-if="active===0" v-on:handleBasic="handleBasic" :goodsId="goodsId"></goods-basic>
  <goods-img v-if="active===1" v-on:handlePre="handlePre" v-on:handleNext="handleNext" v-on:handleImg="handleImg" :goodsId="goodsId"></goods-img>
  <goods-pps-set v-if="active===2" v-on:handlePre="handlePre" v-on:handleNext="handleNext" v-on:handleBasic="handleBasic" :goodsId="goodsId"></goods-pps-set>
  <goods-finish v-if="active===3" v-on:handlePre="handlePre" v-on:handleNext="handleNext" v-on:handleBasic="handleBasic" :goodsId="goodsId"></goods-finish>
</div>
</template>

<script type="text/ecmascript-6">
import GoodsBasic from '@/views/product/goods/GoodsBasic'
import GoodsImg from '@/views/product/goods/GoodsImg'
import GoodsPpsSet from '@/views/product/goods/GoodsPpsSet'
import GoodsFinish from '@/views/product/goods/GoodsFinish'
export default {
  data() {
    return {
      active: 0,
      goodsId: null,
      catId: null,
      catOptions: []
    }
  },
  components: {
    GoodsBasic,
    GoodsPpsSet,
    GoodsImg,
    GoodsFinish
  },
  created() {
    this.goodsId = this.$route.query.id
  },
  methods: {
    handleBasic(catId) {
      this.catId = catId
      this.next()
    },
    handleImg() {
      this.next()
    },
    handlePre() {
      this.pre()
    },
    handleNext() {
      this.next()
    },
    next() {
      if (this.active++ > 3) this.active = 0
    },
    pre() {
      if (this.active-- < 0) this.active = 0
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
