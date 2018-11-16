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
  <el-button v-if="perms.indexOf('add') > -1" type="primary" icon="el-icon-plus" @click.prevent="addUser">新增</el-button>
  <el-button v-if="perms.indexOf('edit') > -1" type="warning" icon="el-icon-edit" @click="_editUser">修改</el-button>
  <el-button v-if="perms.indexOf('del') > -1" type="danger" icon="el-icon-delete" @click="_delUser">删除</el-button>
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
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="用户名">
            <span>{{ props.row.name }}</span>
          </el-form-item>
          <el-form-item label="真实姓名">
            <span>{{ props.row.shop }}</span>
          </el-form-item>
          <el-form-item label="商品 ID">
            <span>{{ props.row.id }}</span>
          </el-form-item>
          <el-form-item label="店铺 ID">
            <span>{{ props.row.shopId }}</span>
          </el-form-item>
          <el-form-item label="商品分类">
            <span>{{ props.row.category }}</span>
          </el-form-item>
          <el-form-item label="店铺地址">
            <span>{{ props.row.address }}</span>
          </el-form-item>
          <el-form-item label="商品描述">
            <span>{{ props.row.desc }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column
      label="ID"
      prop="id">
    </el-table-column>
    <el-table-column
      label="用户名"
      prop="name">
    </el-table-column>
    <el-table-column
      label="真实姓名"
      prop="realName">
    </el-table-column>
     <el-table-column
      label="手机号"
      prop="phoneNo">
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
import { getUserList, delUser } from '@/api/sys/SysUser'
import { Message, MessageBox } from 'element-ui'
import { parseTime } from '@/utils'
export default {
  data() {
    return {
      tableData: [],
      totalSize: 400,
      queryParam: {
        currentPage: 1,
        pageSize: 10
      },
      currentRow: null,
      perms: []
    }
  },
  components: {

  },
  created() {
    this.perms = this.$route.meta.perms
    this._getUserList(this.queryParam)
  },
  methods: {
    _getUserList(params) {
      getUserList(params).then((res) => {
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
    addUser() {
      this.$router.push({ path: '/sys/user/add' })
    },
    _editUser() {
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
          this.$router.push({ path: '/sys/user/add', query: { id: this.currentRow.id }})
        })
      }
    },
    _delUser() {
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
          delUser(this.currentRow.id).then((res) => {
            Message({
              message: res.msg,
              type: 'success',
              duration: 3 * 1000
            })
            this._getUserList(this.queryParam)
          })
        })
      }
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
