<template>
  <div class="app-container">
     <div class="filter-container">
       
    <el-input  style="width: 200px;" class="filter-item" v-model="queryParam.name" placeholder="请输入角色名称">
      </el-input>
      
   <el-button-group class="filter-item">
   <el-button  type="primary"  icon="el-icon-search" @click="handleSearch">搜索</el-button>
      <el-button  type="primary"  icon="el-icon-close" @click="resetForm">重置</el-button>
</el-button-group>
   <el-button-group class="filter-item">
  <el-button  type="success" icon="el-icon-plus" @click.prevent="addRole">新增</el-button>
  <el-button type="warning" icon="el-icon-edit" @click="_editRole">修改</el-button>
  <el-button type="danger" icon="el-icon-delete" @click="_delRole">删除</el-button>
</el-button-group>
 <el-select class="filter-item" style="float:right" v-model="values" collapse-tags multiple placeholder="筛选" @change="headerChange">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
     </div>
<el-table
    :data="tableData"
    stripe
    highlight-current-row
    border
    @row-click="clickRow"
    style="width: 100%">
   

 <el-table-column :key='item.value' v-for='item in options' :label="item.label" v-if="item.show">
        <template slot-scope="scope" >
          {{scope.row[item.value]}}
        </template>
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
import { getRoleList, delRole } from '@/api/sys/SysRole'
import { Message, MessageBox } from 'element-ui'
import { parseTime, isInArray } from '@/utils'
export default {
  data() {
    return {
      tableData: [],
      totalSize: 400,
      queryParam: {
        currentPage: 1,
        pageSize: 10,
        name: ''
      },
      currentRow: null,
      options: [{
        value: 'id',
        label: 'ID',
        show: true
      }, {
        value: 'name',
        label: '名称',
        show: true
      }, {
        value: 'remark',
        label: '备注',
        show: true
      }],
      values: []
    }
  },
  components: {

  },
  created() {
    this._getRoleList(this.queryParam)
  },
  methods: {
    _getRoleList(params) {
      getRoleList(params).then((res) => {
        this.tableData = res.data.rows
        this.totalSize = res.data.total
      })
    },
    handleSizeChange(val) {
      this.queryParam.pageSize = val
      this._getRoleList(this.queryParam)
    },
    handleCurrentChange(val) {
      this.queryParam.currentPage = val
      this._getRoleList(this.queryParam)
    },
    handleSearch() {
      this._getRoleList(this.queryParam)
    },
    fmtTime(row, column, cellValue, index) {
      return parseTime(row.createTime, '')
    },
    clickRow(row, event, column) {
      this.currentRow = row
    },
    addRole() {
      this.$router.push({ path: '/sys/role/add' })
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
          this.$router.push({ path: '/sys/role/add', query: { id: this.currentRow.id }})
        })
      }
    },
    _delRole() {
      if (this.currentRow === null) {
        Message({
          message: '请选择要删除的记录',
          type: 'warning',
          duration: 3 * 1000
        })
      } else {
        MessageBox.confirm('您确定要删除该记录吗', '提示', {
          confirmButtonText: '删除',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delRole(this.currentRow.id).then((res) => {
            Message({
              message: res.msg,
              type: 'success',
              duration: 3 * 1000
            })
            this._getRoleList(this.queryParam)
          })
        })
      }
    },
    headerChange(val) {
      this.options.forEach((ops) => {
        if (isInArray(val, ops.value)) {
          ops.show = false
        } else {
          ops.show = true
        }
      })
      console.log(this.options)
    },
    resetForm() {
      this.queryParam.name = ''
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
