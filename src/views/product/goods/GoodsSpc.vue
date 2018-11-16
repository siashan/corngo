  <template>
  <div class="app-container">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item  
          v-for="(item,index) in csOptions"
              :key="item.id"
              :label="item.specName">
            <el-checkbox-group v-model="form.specs[index].checkList" @change="handleChange">
              <el-checkbox  v-for="val in item.vals"
              :key="val.id"
              :label="val.id">{{val.specValue}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
      </el-form>


    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>SKU列表</span>
      </div>
     <el-table
    :data="skus"
    highlight-current-row
    border
    stripe
    fit
    class="el-tb-edit"
    style="width: 100%">
      <el-table-column label="规格"  header-align="center">
           <template slot-scope="scope">
          <span >{{ scope.row.productSkuRemark }}</span>
        </template>
      </el-table-column>
    <el-table-column  label="图片">
         <template slot-scope="scope">
              <template>
                <el-upload
                  class="avatar-uploader"
                  :action="fs"
                  :show-file-list="false"
                  :on-success="(res,file)=>{return handleAvatarSuccess(res,file, scope.row)}">
                  <img v-if="scope.row.productImg" :src="showImg(scope.row.productImg)" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </template>
        </template>
      </el-table-column>
    <el-table-column  label="货号">
        <template slot-scope="scope">
          <template>
            <el-input class="edit-input" size="small" v-model="scope.row.productSn"></el-input>
          </template>
        </template>
      </el-table-column>
    <el-table-column  label="库存">
        <template slot-scope="scope">
          <template>
             <el-input-number size="small" v-model="scope.row.productStock" :min="0" :max="1000000" ></el-input-number>
          </template>
        </template>
      </el-table-column>
    <el-table-column  label="价格">
        <template slot-scope="scope">
          <template >
             <el-input-number size="small" v-model="scope.row.price" :precision="2" :step="0.1" :max="1000000"></el-input-number>
          </template>
        </template>
      </el-table-column>
     <el-table-column  label="成本价">
        <template slot-scope="scope">
          <template>
             <el-input-number size="small" v-model="scope.row.costPrice" :precision="2" :step="0.1" :max="1000000"></el-input-number>
          </template>
        </template>
      </el-table-column>
     <el-table-column align="center" label="操作" >
        <template slot-scope="scope">
          <el-button  type="primary" @click='handleDel(scope.row)' size="small" icon="el-icon-edit">删除</el-button>
        </template>
      </el-table-column>
  </el-table>
    </el-card>

    <el-button type="primary" @click="onSubmit">保存</el-button>

  </div>
</template>

<script type="text/ecmascript-6">
import { saveGoodsSpec, getGoodsSpec } from '@/api/product/goods'
import { Message } from 'element-ui'
import { PREVIEW_SERVICE, FILE_SERVICE } from '@/api/config'
export default {
  props: {
    goodsId: Number
  },
  data() {
    return {
      fs: FILE_SERVICE,
      ps: PREVIEW_SERVICE,
      show_file_list: true,
      file_limit: 5,
      dialogImageUrl: '',
      dialogVisible: false,
      checkList: [],
      products: [],
      result: [],
      results: [],
      skus: [],
      goodsSn: '',
      res: '',
      form: {
        goodsId: this.goodsId,
        specs: []
      },
      csOptions: {}
    }
  },
  components: {
  },
  created() {
    this._getGoodsSpec()
  },
  methods: {
    _getGoodsSpec() {
      getGoodsSpec(this.goodsId).then((res) => {
        this.csOptions = res.data.cs
        this.goodsSn = res.data.goodsSn
        this.skus = res.data.gs
        for (let i = 0; i < this.csOptions.length; i++) {
          const cps = this.csOptions[i].id
          const val = { id: cps, checkList: [] }
          for (let j = 0; j < this.skus.length; j++) {
            const sku = this.skus[j].productSku
            const skuList = sku.split(',')
            for (let k = 0; k < skuList.length; k++) {
              const skuoption = skuList[k].split(':')

              if (skuoption[0] + '' === cps + '') {
                val.checkList.push(skuoption[1])
              }
            }
          }
          this.form.specs.push(val)
        }
      })
    },
    handleClose() {
      this.$emit('handleBasic', this.form.catId)
    },
    handleChange(vals) {
      // console.log('formchange:' + JSON.stringify(this.form.specs))
      const specs = this.form.specs
      this.result = []
      this.results = []
      this.skus = []
      this.doExchange(specs, 0)
      // console.log(JSON.stringify(this.results))
      // 拼装sku
      if (this.results.length > 0) {
        for (let i = 0; i < this.results.length; i++) {
          const spec = this.results[i]
          const sps = spec.split(',')
          // var spcLabel
          var sku_remark = []
          for (let j = 0; j < sps.length; j++) {
            const sp = sps[j].split(':')
            // console.log('sp :' + JSON.stringify(sp))
            const item_sp = this.csOptions.filter((item) => {
              return item.id + '' === sp[0]
            })
            // 规格名称
            // spcLabel = item_sp[0].specName
            // console.log('spcLabel :' + JSON.stringify(spcLabel))
            // 规格值名称
            const spcValObj = item_sp[0].vals.filter((item) => {
              return item.id + '' === sp[1]
            })
            sku_remark.push(spcValObj[0].specValue)
            // console.log('spcLabel:' + spcLabel + '------------' + 'spcValObj:' + JSON.stringify(spcValObj))
          }
          const sku = { id: null, goodsId: this.goodsId, productStock: null, price: null, costPrice: null, productImg: null, productSn: this.goodsSn + '_' + (i + 1), productSku: spec, productSkuRemark: sku_remark.join() }
          this.skus.push(sku)
          // console.log(JSON.stringify(sku))
        }
      }
    },

    doExchange(arr, depth) {
      for (var i = 0; i < arr[depth].checkList.length; i++) {
        const valId = arr[depth].id
        this.result[depth] = valId + ':' + arr[depth].checkList[i]
        if (depth !== arr.length - 1) {
          this.doExchange(arr, depth + 1)
        } else {
          this.results.push(this.result.join())
        }
      }
    },
    handleDel(row) {
      this.skus.pop(row)
    },
    onSubmit() {
      const req = {}
      req.reqStr = JSON.stringify(this.skus)
      saveGoodsSpec(req).then((res) => {
        Message({
          message: res.msg,
          type: 'success',
          duration: 3 * 1000,
          onClose: this.handleClose
        })
      })
    },
    showImg(path) {
      return PREVIEW_SERVICE + path
    },
    handleAvatarSuccess(res, file, row) {
      this.$set(row, 'productImg', res.msg)
      console.log(JSON.stringify(row))
    }

  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.avatar-uploader {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
      width: 100px;
    height: 100px;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .avatar {
    width: 100px;
    height: 100px;
    display: block;
  }
</style>
