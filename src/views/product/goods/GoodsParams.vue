  <template>
  <div class="app-container">
      <el-form ref="form" :model="form" label-width="80px">
  <el-form-item label="商品类别">
    <el-cascader placeholder="请选择商品类目" 
        :options="catOptions"
        @change="_loadBrand"
        v-model="catVal">
    </el-cascader>
  </el-form-item>
  <el-form-item label="商品品牌">
    <el-select v-model="form.brandId" filterable placeholder="请选择">
    <el-option
      v-for="item in brandOptions"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
  </el-form-item>
  <el-form-item label="商品名称">
    <el-input v-model="form.goodsName" placeholder="请填写商品名称(2~25个字)" minlength="2" maxlength="25"></el-input>
  </el-form-item>
  <el-form-item label="商品编号">
    <el-input v-model="form.goodsSn" placeholder="请填写商品编号(2~25个字)" minlength="2" maxlength="25"></el-input>
  </el-form-item>
   <el-form-item label="市场价格">
     <el-input-number v-model="form.mkPrice" :precision="2" :step="0.1" :max="100000000"></el-input-number>
  </el-form-item>
  <!-- <el-form-item>
    <el-button type="primary" @click="onSubmit">保存，下一步</el-button>
    <el-button @click="handleClose">直接，下一步</el-button>
  </el-form-item> -->
</el-form>
  </div>
</template>

<script type="text/ecmascript-6">
import { saveBasic, getGoodsProps } from '@/api/product/goods'
import { Message } from 'element-ui'
import { PREVIEW_SERVICE, FILE_SERVICE } from '@/api/config'
export default {
  props: {
    goodsId: Number
  },
  data() {
    return {
      catVal: [],
      catOptions: [],
      brandOptions: [],
      imgList: [],
      fs: FILE_SERVICE,
      ps: PREVIEW_SERVICE,
      show_file_list: true,
      file_limit: 5,
      dialogImageUrl: '',
      dialogVisible: false,
      form: {
        catId: null,
        brandId: null,
        goodsName: '',
        goodsSn: '',
        mkPrice: 0,
        goodsIntro: '',
        imgs: []
      }
    }
  },
  components: {

  },
  created() {
    this._getGoodsProps()
  },
  methods: {
    _getGoodsProps() {
      getGoodsProps(this.goodsId).then((res) => {
        this.form = res.data.goods
        this.catVal = res.data.catVal
        this._loadBrandByCatId(this.form.catId)
      })
    },
    handleClose() {
      this.$emit('handleBasic', this.form.catId)
    },
    onSubmit() {
      const len = this.catVal.length
      const id = this.catVal[len - 1]
      this.form.catId = id
      saveBasic(this.form).then((res) => {
        Message({
          message: res.msg,
          type: 'success',
          duration: 3 * 1000,
          onClose: this.handleClose
        })
      })
    },
    submitUpload() {
      this.$refs.upload.submit()
    },
    handleExceed() {
      Message({
        message: '最多只能上传5张图片哦',
        type: 'success',
        duration: 3 * 1000,
        onClose: this.handleClose
      })
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleSuccess(response, file, fileList) {
      const insex = fileList.indexOf(file)
      this.form.imgs.push(response.msg + '_' + insex)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
