
<template slot-scope="props" v-if="props.row.id">
<div class="app-container">
<el-button type="primary" @click="addParam">添加参数</el-button>
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
            label="参数">
             <template slot-scope="scope">
              <template v-if="scope.row.edit">
                <el-input class="edit-input" size="small" v-model="scope.row.paramName"></el-input>
              </template>
              <span v-else>{{ scope.row.paramName }}</span>
            </template>
        </el-table-column>
        <el-table-column
            label="排序">
             <template slot-scope="scope">
              <template v-if="scope.row.edit">
                <el-input class="edit-input" size="small" v-model="scope.row.orderBy"></el-input>
              </template>
              <span v-else>{{ scope.row.orderBy }}</span>
            </template>
        </el-table-column>
         <el-table-column align="center" label="操作" >
        <template slot-scope="scope">
          <el-button v-if="scope.row.edit" type="success" @click="confirmEdit(scope.row)" size="small" icon="el-icon-circle-check-outline">保存</el-button>
          <el-button class='cancel-btn' v-if="scope.row.edit" type="success" @click="cancelEdit(scope.row)" size="small" icon="el-icon-refresh">取消</el-button>
          <el-button v-if="!scope.row.edit" type="primary" @click='scope.row.edit = !scope.row.edit' size="small" icon="el-icon-edit">编辑</el-button>
          <el-button v-if="!scope.row.edit" type="primary" @click='handleDel(scope.row)' size="small" icon="el-icon-edit">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
</div>
</template>
  
<script type="text/ecmascript-6">
import { getCatParamsValList, saveCatParam, delCatParam } from '@/api/product/category'
import { Message, MessageBox } from 'element-ui'
export default {
  props: {
    groupId: Number,
    categoryId: Number
  },
  data() {
    return {
      tableData: [],
      queryParam: {
        id: this.groupId
      },
      listLoading: true,
      values: []
    }
  },
  components: {},
  created() {
    this._listValues()
  },
  methods: {
    _listValues() {
      getCatParamsValList(this.queryParam).then((res) => {
        const items = res.data
        this.tableData = res.data
        this.tableData = items.map(v => {
          this.$set(v, 'edit', false) // https://vuejs.org/v2/guide/reactivity.html
          v.ori_paramName = v.paramName //  will be used when user click the cancel botton
          v.ori_orderBy = v.orderBy //  will be used when user click the cancel botton
          return v
        })
        this.listLoading = false
      })
    },
    handleDel(row) {
      MessageBox.confirm('您确定要删除该记录吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delCatParam(row.id).then((res) => {
          Message({
            message: res.msg,
            type: 'success',
            duration: 3 * 1000
          })
          this._listValues(this.queryParam)
        })
      })
    },
    addParam() {
      const specValue = {
        id: null,
        categoryId: this.categoryId,
        paramName: '',
        parentId: this.groupId,
        orderBy: '',
        edit: true
      }
      this.tableData.push(specValue)
    },
    confirmEdit(row) {
      row.edit = false
      saveCatParam(row).then((res) => {
        this._listValues(this.queryParam)
      })
      this.$message({
        message: '数据已修改',
        type: 'success'
      })
    },
    cancelEdit(row) {
      row.paramName = row.ori_paramName //  will be used when user click the cancel botton
      row.orderBy = row.ori_orderBy //  will be used when user click the cancel botton
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
