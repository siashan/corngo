
<template slot-scope="props" v-if="props.row.id">
<div class="app-container">
    <el-table
        :data="tableData"
        highlight-current-row
        border
        stripe
        fit
        v-loading="listLoading"
        class="el-tb-edit"
        style="width: 100%">
        <el-table-column
            label="商品编号">
             <template slot-scope="scope">
              <span >{{ scope.row.productSn }}</span>
            </template>
        </el-table-column>
        <el-table-column
            label="商品名称"
            >
             <template slot-scope="scope">
              <span >
                {{ scope.row.productName }}
              </span>
            </template>
        </el-table-column>
        <el-table-column
            label="价格(/元)"
            >
             <template slot-scope="scope">
              <span >
                {{ scope.row.price }}
              </span>
            </template>
        </el-table-column>
        <el-table-column
            label="库存">
             <template slot-scope="scope">
              <template v-if="scope.row.edit">
                <el-input class="edit-input" size="small" v-model="scope.row.productStock"></el-input>
              </template>
              <span v-else>{{ scope.row.productStock }}</span>
            </template>
        </el-table-column>
         <el-table-column align="center" label="操作" >
        <template slot-scope="scope">
          <el-button v-if="scope.row.edit" type="success" @click="confirmEdit(scope.row)" size="small" icon="el-icon-circle-check-outline">保存</el-button>
          <el-button class='cancel-btn' v-if="scope.row.edit" type="success" @click="cancelEdit(scope.row)" size="small" icon="el-icon-refresh">取消</el-button>
          <el-button v-if="!scope.row.edit" type="primary" @click='scope.row.edit = !scope.row.edit' size="small" icon="el-icon-edit">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
</div>
</template>
  
<script type="text/ecmascript-6">
import { getProducts, saveStock } from '@/api/product/stock'
import { PREVIEW_SERVICE, FILE_SERVICE } from '@/api/config'
export default {
  props: {
    goodsId: Number
  },
  data() {
    return {
      tableData: [],
      listLoading: true,
      values: [],
      fs: FILE_SERVICE
    }
  },
  components: {},
  created() {
    this._listValues()
  },
  methods: {
    _listValues() {
      getProducts(this.goodsId).then((res) => {
        const items = res.data
        console.log(JSON.stringify(res.data))
        this.tableData = res.data
        this.tableData = items.map(v => {
          this.$set(v, 'edit', false) // https://vuejs.org/v2/guide/reactivity.html
          v.ori_productStock = v.productStock //  will be used when user click the cancel botton
          return v
        })
        this.listLoading = false
      })
    },
    showImg(path) {
      return PREVIEW_SERVICE + path
    },
    confirmEdit(row) {
      row.edit = false
      saveStock(row).then((res) => {
        this._listValues()
      })
      this.$message({
        message: '数据已修改',
        type: 'success'
      })
    },
    cancelEdit(row) {
      row.productStock = row.ori_productStock //  will be used when user click the cancel botton
      row.edit = false
      if (!row.id) {
        this.tableData.pop(row)
      }
      this.$message({
        message: '数据已还原',
        type: 'warning'
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
