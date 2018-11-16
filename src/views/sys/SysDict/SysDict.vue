<template>
  <div class="app-container">

 <div class="filter-container">
    <el-input  style="width: 200px;" class="filter-item" v-model="queryParam.dictGroup" placeholder="请输入分组">
      </el-input>
      
   <el-button-group class="filter-item">
   <el-button  type="primary"  icon="el-icon-search" @click="handleSearch">搜索</el-button>
      <el-button  type="primary"  icon="el-icon-close" @click="resetForm">重置</el-button>
</el-button-group>
   <el-button-group class="filter-item">
  <el-button type="success" icon="el-icon-plus" @click.prevent="addDict">新增</el-button>
</el-button-group>
 
     </div>
<el-table
    :data="tableData"
    highlight-current-row
    border
    stripe
    fit
    v-loading="listLoading"
    class="el-tb-edit"
    style="width: 100%">
   
      <el-table-column align="center" label="ID" width="80">
        <template slot-scope="scope">
          <span>{{scope.row.id}}</span>
        </template>
      </el-table-column>
      <el-table-column  label="分组">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-input class="edit-input" size="small" v-model="scope.row.dictGroup"></el-input>
          </template>
          <span v-else>{{ scope.row.dictGroup }}</span>
        </template>
      </el-table-column>
    <el-table-column  label="值">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-input class="edit-input" size="small" v-model="scope.row.dictCode"></el-input>
          </template>
          <span v-else>{{ scope.row.dictCode }}</span>
        </template>
      </el-table-column>
 <el-table-column  label="名称">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-input class="edit-input" size="small" v-model="scope.row.dictName"></el-input>
          </template>
          <span v-else>{{ scope.row.dictName }}</span>
        </template>
      </el-table-column>
    <el-table-column  label="描述">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-input class="edit-input" size="small" v-model="scope.row.dictDesp"></el-input>
          </template>
          <span v-else>{{ scope.row.dictDesp }}</span>
        </template>
      </el-table-column>
 <el-table-column  label="排序">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-input class="edit-input" size="small" v-model="scope.row.orderBy"></el-input>
          </template>
          <span v-else>{{ scope.row.orderBy }}</span>
        </template>
      </el-table-column>


      <!-- <el-table-column :key='item.value' v-for='item in options' :label="item.label" v-if="item.show">
         <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-input class="edit-input" size="small" v-model="scope.row.value"></el-input>
          </template>
          <span v-else>{{ scope.row.value }}</span>
        </template>
      </el-table-column> -->

     <el-table-column align="center" label="操作" >
        <template slot-scope="scope">
          <el-button v-if="scope.row.edit" type="success" @click="confirmEdit(scope.row)" size="small" icon="el-icon-circle-check-outline">保存</el-button>
          <el-button class='cancel-btn' v-if="scope.row.edit" type="success" @click="cancelEdit(scope.row)" size="small" icon="el-icon-refresh">取消</el-button>
          <el-button v-if="!scope.row.edit" type="primary" @click='scope.row.edit = !scope.row.edit' size="small" icon="el-icon-edit">编辑</el-button>
          <el-button v-if="!scope.row.edit" type="primary" @click='_delDict(scope.row)' size="small" icon="el-icon-edit">删除</el-button>
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
import { getDictList, saveDict, delDict } from '@/api/sys/SysDict'
import { Message, MessageBox } from 'element-ui'
export default {
  data() {
    return {
      tableData: [],
      totalSize: 400,
      queryParam: {
        currentPage: 1,
        pageSize: 10,
        dictGroup: ''
      },
      editRow: null,
      listLoading: true,
      options: [{
        value: 'dictGroup',
        label: '分组',
        show: true
      }, {
        value: 'dictCode',
        label: '值',
        show: true
      }, {
        value: 'dictDesp',
        label: '描述',
        show: true
      }, {
        value: 'orderBy',
        label: '排序',
        show: true
      }],
      values: []
    }
  },
  components: {

  },
  created() {
    this._getDictList(this.queryParam)
  },
  methods: {
    _getDictList(params) {
      this.listLoading = true
      getDictList(params).then((res) => {
        const items = res.data.rows
        this.totalSize = res.data.total
        this.tableData = items.map(v => {
          this.$set(v, 'edit', false) // https://vuejs.org/v2/guide/reactivity.html
          v.originalGroup = v.dictGroup //  will be used when user click the cancel botton
          v.originalCode = v.dictCode //  will be used when user click the cancel botton
          v.originalName = v.dictName //  will be used when user click the cancel botton
          v.originalDesp = v.dictDesp //  will be used when user click the cancel botton
          v.originalOrderBy = v.orderBy //  will be used when user click the cancel botton
          return v
        })
        this.listLoading = false
      })
    },
    handleSizeChange(val) {
      this.queryParam.pageSize = val
      this._getDictList(this.queryParam)
    },
    handleCurrentChange(val) {
      this.queryParam.currentPage = val
      this._getDictList(this.queryParam)
    },
    handleSearch() {
      this._getDictList(this.queryParam)
    },
    _delDict(row) {
      MessageBox.confirm('您确定要删除该记录吗', '提示', {
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delDict(row.id).then((res) => {
          Message({
            message: res.msg,
            type: 'success',
            duration: 3 * 1000
          })
          this._getDictList(this.queryParam)
        })
      })
    },
    addDict() {
      const dict = {
        dictGroup: '',
        dictCode: '',
        dictName: '',
        dictDesp: '',
        orderBy: '',
        edit: true
      }
      this.tableData.push(dict)
      // this.$refs.datatable.setCurrentRow(dict)
    },
    cancelEdit(row) {
      row.dictGroup = row.originalGroup //  will be used when user click the cancel botton
      row.dictCode = row.originalCode //  will be used when user click the cancel botton
      row.dictName = row.originalName //  will be used when user click the cancel botton
      row.dictDesp = row.originalDesp //  will be used when user click the cancel botton
      row.orderBy = row.originalOrderBy //  will be used when user click the cancel botton
      row.edit = false
      if (!row.id) {
        this.tableData.pop(row)
      }
      this.$message({
        message: '数据已还原',
        type: 'warning'
      })
    },
    confirmEdit(row) {
      row.edit = false
      saveDict(row).then((res) => {
        this._getDictList(this.queryParam)
      })
      this.$message({
        message: '数据已修改',
        type: 'success'
      })
    },
    resetForm() {
      this.queryParam.dictGroup = ''
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
