  <template>
  <div class="app-container">
    
  
    <el-button type="primary" @click="onSubmit">保存</el-button>

  </div>
</template>

<script type="text/ecmascript-6">
import { save } from '@/api/product/goods'
import { Message } from 'element-ui'
export default {
  props: {
    goodsId: Number
  },
  data() {
    return {
      form: {
        goodsId: this.goodsId
      }
    }
  },
  components: {
  },
  created() {
  },
  methods: {
    onSubmit() {
      save(this.form).then((res) => {
        Message({
          message: res.msg,
          type: 'success',
          duration: 3 * 1000,
          onClose: this.handleClose
        })
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
