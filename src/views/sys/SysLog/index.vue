<template>
  <div class="app-container">
    <div class="filter-container">
    <el-input  style="width: 200px;" class="filter-item" v-model="queryParam.name" placeholder="请输入用户名">
      </el-input>
      
   <el-button-group class="filter-item">
   <el-button  type="primary"  icon="el-icon-search" @click="handleSearch">搜索</el-button>
      <el-button  type="primary"  icon="el-icon-close" @click="resetForm">重置</el-button>
</el-button-group>
   <el-button-group class="filter-item">
</el-button-group>
 
     </div>
<el-table
    :data="tableData"
    stripe
    highlight-current-row
    border
    @row-click="clickRow"
    style="width: 100%">
    <el-table-column type="expand">
      
    </el-table-column>
    <el-table-column
      label="ID"
      prop="id">
    </el-table-column>
    <el-table-column
      label="操作人"
      prop="operator">
    </el-table-column>
    <el-table-column
      label="访问链接"
      prop="url">
    </el-table-column>
     <el-table-column
      label="创建时间"
      prop="createTime"
      :formatter="fmtTime">
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
import { getLogList } from '@/api/sys/SysLog'
import { parseTime } from '@/utils'
export default {
  data() {
    return {
      tableData: [],
      totalSize: 0,
      queryParam: {
        currentPage: 1,
        pageSize: 10
      },
      currentRow: null
    }
  },
  components: {

  },
  created() {
    this._getLogList(this.queryParam)
  },
  methods: {
    _getLogList(params) {
      getLogList(params).then((res) => {
        this.tableData = res.data.rows
        this.totalSize = res.data.total
      })
    },
    handleSizeChange(val) {
      this.queryParam.pageSize = val
      this._getUserList(this.queryParam)
    },
    handleCurrentChange(val) {
      this.queryParam.currentPage = val
      this._getUserList(this.queryParam)
    },
    fmtTime(row, column, cellValue, index) {
      return parseTime(row.createTime, '')
    },
    clickRow(row, event, column) {
      this.currentRow = row
    },
    handleSearch() {
      this._getUserList(this.queryParam)
    },
    resetForm() {
      this.queryParam.name = ''
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
