  <template>
  <div class="app-container">
      <el-form ref="form" :model="form" label-width="80px">
  <el-form-item  label="商品图片" prop="content">
   <el-upload
      ref="upload"
      :action="fs"
      list-type="picture-card"
      :show-file-list="show_file_list"
      :limit="file_limit"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :on-success="handleSuccess"
      :auto-upload="false"
      :on-exceed="handleExceed"
      :file-list="imgList">
      <i class="el-icon-plus"></i>
    </el-upload>
 <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
<el-dialog :visible.sync="dialogVisible">
  <img width="100%" :src="dialogImageUrl" alt="">
</el-dialog>
  </el-form-item>
  <el-form-item>
      <el-button @click="handlePre">上一步</el-button>
    <el-button type="primary" @click="onSubmit">保存，下一步</el-button>
    <el-button  @click="handleNext">下一步</el-button>
  </el-form-item>
</el-form>
  </div>
</template>

<script type="text/ecmascript-6">
import { saveGoodsImg, getGoodsImg } from '@/api/product/goods'
import { Message } from 'element-ui'
import { PREVIEW_SERVICE, FILE_SERVICE } from '@/api/config'
export default {
  props: {
    goodsId: Number
  },
  data() {
    return {
      imgList: [],
      fs: FILE_SERVICE,
      ps: PREVIEW_SERVICE,
      show_file_list: true,
      file_limit: 5,
      dialogImageUrl: '',
      dialogVisible: false,
      form: {
        goodsId: this.goodsId,
        imgs: []
      }
    }
  },
  components: {
  },
  created() {
    if (this.goodsId) {
      this._getGoodsImg()
    }
  },
  methods: {
    _getGoodsImg() {
      getGoodsImg(this.goodsId).then((res) => {
        const imgs = res.data
        for (let i = 0; i < imgs.length; i++) {
          const img = {}
          const name = imgs[i].goodsImg
          img.name = name
          img.url = PREVIEW_SERVICE + name
          this.imgList.push(img)
        }
      })
    },
    handleClose() {
      this.$emit('handleImg')
    },
    handleNext() {
      this.$emit('handleNext')
    },
    handlePre() {
      this.$emit('handlePre')
    },
    onSubmit() {
      saveGoodsImg(this.form).then((res) => {
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
