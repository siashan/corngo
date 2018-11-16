<template>
  <div class="app-container">
     <div class="filter-container">
   <el-button-group class="filter-item">
  <el-button  type="success" icon="el-icon-plus" @click="addParam">新增参数组</el-button>
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
       <el-table-column
      label="ID"
      prop="id"
      type="expand">
    <category-params-val slot-scope="props" :groupId="props.row.id" :categoryId="props.row.categoryId"  v-if="props.row.id"></category-params-val>
    </el-table-column>
    <el-table-column
      label="参数组名">
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
import { getCatParamsList, delCatParam, saveCatParam } from '@/api/product/category'
import { Message, MessageBox } from 'element-ui'
import { getDictMap, getDict } from '@/api/public'
import CategoryParamsVal from '@/views/product/category/CategoryParamsVal'
export default {
  props: {
    catId: Number
  },
  data() {
    return {
      tableData: [],
      queryParam: {
        id: this.catId
      },
      listLoading: true,
      values: [],
      dictMaps: {},
      dicts: []
    }
  },
  components: {
    CategoryParamsVal
  },
  created() {
    this._getDictMap()
    this._getDict()
    this._getSpecList(this.queryParam)
  },
  methods: {
    _getSpecList(params) {
      getCatParamsList(params).then(res => {
        const items = res.data
        this.tableData = items.filter((item) => {
          return item.parentId === 0
        })
        this.tableData = items.map(v => {
          this.$set(v, 'edit', false) // https://vuejs.org/v2/guide/reactivity.html
          v.ori_paramName = v.paramName //  will be used when user click the cancel botton
          v.ori_orderBy = v.orderBy //  will be used when user click the cancel botton
          return v
        })
        this.listLoading = false
      })
    },
    _getDictMap() {
      getDictMap(['spec_showtype', 'spec_status']).then((res) => {
        this.dictMaps = res.data
      })
    },
    _getDict() {
      getDict(['spec_showtype', 'spec_status']).then((res) => {
        this.dicts = res.data
      })
    },
    fmtShowType(type) {
      return this.dictMaps.spec_showtype['d_' + type]
    },
    fmtStatus(status) {
      return this.dictMaps.spec_status['d_' + status]
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
          this._getSpecList(this.queryParam)
        })
      })
    },
    addParam() {
      const param = {
        id: null,
        categoryId: this.catId,
        paramName: '',
        parentId: 0,
        orderBy: '',
        edit: true
      }
      this.tableData.push(param)
    },
    confirmEdit(row) {
      row.edit = false
      saveCatParam(row).then((res) => {
        this._getSpecList(this.queryParam)
      })
      this.$message({
        message: '数据已修改',
        type: 'success'
      })
    },
    cancelEdit(row) {
      row.paramName = row.ori_paramName
      row.orderBy = row.ori_orderBy
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
