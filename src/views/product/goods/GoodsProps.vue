  <template>
  <div class="app-container">
      <el-form ref="form" :model="form" label-width="80px">
  <el-form-item  
   v-for="item in cpOptions"
      :key="item.id"
       :label="item.propName">
     <my-autocomplate v-model="form[item.id].value" :value="form[item.id].value" v-if="item.optionArr" :optionArr="item.optionArr"></my-autocomplate>
     <el-input  v-else v-model="form[item.id].value" placeholder="" minlength="2" maxlength="25"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit">保存</el-button>
  </el-form-item>
</el-form>
  </div>
</template>

<script type="text/ecmascript-6">
import { getGoodsProps, saveGoodProps } from '@/api/product/goods'
import { Message } from 'element-ui'
import MyAutocomplate from '@/components/MyAutocomplate'
export default {
  props: {
    goodsId: Number
  },
  data() {
    return {
      cpOptions: [],
      form: {
        goodsId: this.goodsId
      },
      state1: ''
    }
  },
  components: {
    MyAutocomplate
  },
  created() {
    this._getGoodsProps()
  },
  methods: {
    _getGoodsProps() {
      getGoodsProps(this.goodsId).then((res) => {
        this.cpOptions = res.data.cp
        const gpOps = res.data.gp
        console.log(JSON.stringify(res.data))
        for (let i = 0; i < this.cpOptions.length; i++) {
          let val = { id: '', value: '' }
          const cps = this.cpOptions[i].id
          for (let j = 0; j < gpOps.length; j++) {
            if (gpOps[j].propId + '' === cps + '') {
              val = { id: gpOps[j].id, value: gpOps[j].propValue }
              continue
            }
          }
          this.$set(this.form, cps, val)
        }
      })
    },
    handleClose() {
      this.$emit('handleBasic', this.form.catId)
    },
    onSubmit() {
      console.log(JSON.stringify(this.form))
      const req = {}
      req.reqStr = JSON.stringify(this.form)
      saveGoodProps(req).then((res) => {
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
