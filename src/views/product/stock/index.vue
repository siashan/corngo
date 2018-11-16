<template>
  <div class="app-container">
     <div class="filter-container">
       
    <el-input  style="width: 200px;" class="filter-item" v-model="queryParam.name" placeholder="请输入品牌名称">
      </el-input>
      
   <el-button-group class="filter-item">
   <el-button  type="primary"  icon="el-icon-search" @click="handleSearch">搜索</el-button>
      <el-button  type="primary"  icon="el-icon-close" @click="resetForm">重置</el-button>
</el-button-group>
     </div>
<el-table
    :data="tableData"
    stripe
    highlight-current-row
    border
    @row-click="clickRow"
    style="width: 100%">
       <el-table-column
      label="ID"
      prop="id"
      type="expand">
      <stock-detail slot-scope="props" :goodsId="props.row.id"></stock-detail>
    </el-table-column>
    <el-table-column
      label="商品编号"
      prop="goodsSn">
    </el-table-column>
    <el-table-column
      label="名称"
      prop="goodsName">
    </el-table-column>
    <el-table-column
      label="库存"
      prop="stock">
    </el-table-column>
  </el-table>
   <div class="block page-wrap">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryParam.currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="queryParam.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalSize">
    </el-pagination>
  </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { getGoodsList } from '@/api/product/stock'
import { Message, MessageBox } from 'element-ui'
import StockDetail from '@/views/product/stock/StockDetail'
export default {
  data() {
    return {
      tableData: [],
      totalSize: 0,
      queryParam: {
        currentPage: 1,
        pageSize: 10,
        name: ''
      },
      currentRow: null,
      values: [],
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '修改',
        create: '创建'
      }
    }
  },
  components: {
    StockDetail
  },
  created() {
    this._getGoodsList(this.queryParam)
  },
  methods: {
    _getGoodsList(params) {
      getGoodsList(params).then(res => {
        this.tableData = res.data.rows
        this.totalSize = res.data.total
        console.log(JSON.stringify(res.data.rows))
      })
    },
    handleSizeChange(val) {
      this.queryParam.pageSize = val
      this._getGoodsList(this.queryParam)
    },
    handleCurrentChange(val) {
      this.queryParam.currentPage = val
      this._getGoodsList(this.queryParam)
    },
    handleSearch() {
      this._getGoodsList(this.queryParam)
    },
    _editRole() {
      if (this.currentRow === null) {
        Message({
          message: '请选择要修改的记录',
          type: 'warning',
          duration: 3 * 1000
        })
      } else {
        MessageBox.confirm('您确定要修改该记录吗', '提示', {
          confirmButtonText: '修改',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$router.push({
            path: '/sys/role/add',
            query: { id: this.currentRow.id }
          })
        })
      }
    },
    resetForm() {
      this.queryParam.name = ''
    },
    handleCreate() {
      this.$router.push({ path: '/product/goods/add' })
    },
    handleUpdate() {
      if (this.currentRow === null) {
        Message({
          message: '请选择要修改的记录',
          type: 'warning',
          duration: 3 * 1000
        })
      } else {
        MessageBox.confirm('您确定要修改该记录吗', '提示', {
          confirmButtonText: '修改',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$router.push({ path: '/product/goods/add', query: { id: this.currentRow.id }})
        })
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
