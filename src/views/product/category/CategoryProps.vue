<template>
  <div class="app-container">
     <div class="filter-container">
   <el-button-group class="filter-item">
  <el-button  type="success" icon="el-icon-plus" @click="addProp">新增</el-button>
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
    <el-table-column width="100"
      label="ID"
      prop="id">
    </el-table-column>
    <el-table-column
      label="属性名">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-input class="edit-input" size="small" v-model="scope.row.propName"></el-input>
          </template>
          <span v-else>{{ scope.row.propName }}</span>
        </template>
    </el-table-column>
    <el-table-column
      label="选项值（|分割）">
       <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-input class="edit-input" size="small" v-model="scope.row.optionArr"></el-input>
          </template>
          <span v-else>{{ scope.row.optionArr }}</span>
        </template>
    </el-table-column>
    <el-table-column
      label="是否可搜索">
       <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-select v-model="scope.row.isSearchable" placeholder="请选择" >
            <el-option
              v-for="item in dicts.is_searchable"
              :key="item.dictCode"
              :label="item.dictName"
              :value="item.dictCode">
            </el-option>
          </el-select>
          </template>
          <span v-else>{{ fmtShowType(scope.row.isSearchable) }}</span>
        </template>
    </el-table-column>
    <el-table-column
      label="是否必选">
       <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-select v-model="scope.row.isRequired" placeholder="请选择" >
            <el-option
              v-for="item in dicts.is_required"
              :key="item.dictCode"
              :label="item.dictName"
              :value="item.dictCode">
            </el-option>
          </el-select>
          </template>
          <span v-else>{{ fmtStatus(scope.row.isRequired) }}</span>
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
     <el-table-column align="center" fixed="right" width="200" label="操作" >
        <template slot-scope="scope">
          <el-button v-if="scope.row.edit" type="success" @click="confirmEdit(scope.row)" size="small" icon="el-icon-circle-check-outline">保存</el-button>
          <el-button class='cancel-btn' v-if="scope.row.edit" type="success" @click="cancelEdit(scope.row)" size="small" icon="el-icon-refresh">取消</el-button>
          <el-button v-if="!scope.row.edit" type="primary" @click='scope.row.edit = !scope.row.edit' size="small" icon="el-icon-edit">编辑</el-button>
          <el-button v-if="!scope.row.edit" type="primary" @click='handleDel(scope.row)' size="small" icon="el-icon-edit">删除</el-button>
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
import { getCatPropsList, delCatProps, saveCatProps } from '@/api/product/category'
import { Message, MessageBox } from 'element-ui'
import { getDictMap, getDict } from '@/api/public'
export default {
  props: {
    catId: Number
  },
  data() {
    return {
      tableData: [],
      totalSize: 0,
      queryParam: {
        currentPage: 1,
        pageSize: 10,
        id: this.catId
      },
      listLoading: true,
      values: [],
      dictMaps: {},
      dicts: []
    }
  },
  created() {
    this._getDictMap()
    this._getDict()
    this._getSpecList(this.queryParam)
  },
  methods: {
    _getSpecList(params) {
      getCatPropsList(params).then(res => {
        const items = res.data.rows
        this.tableData = res.data.rows
        this.totalSize = res.data.total
        this.tableData = items.map(v => {
          this.$set(v, 'edit', false) // https://vuejs.org/v2/guide/reactivity.html
          v.ori_categoryId = v.categoryId //  will be used when user click the cancel botton
          v.ori_propName = v.propName //  will be used when user click the cancel botton
          v.ori_isSearchable = v.isSearchable //  will be used when user click the cancel botton
          v.ori_optionArr = v.optionArr //  will be used when user click the cancel botton
          v.ori_isRequired = v.isRequired //  will be used when user click the cancel botton
          v.ori_orderBy = v.orderBy //  will be used when user click the cancel botton
          return v
        })
        this.listLoading = false
      })
    },
    _getDictMap() {
      getDictMap(['is_searchable', 'is_required']).then((res) => {
        this.dictMaps = res.data
      })
    },
    _getDict() {
      getDict(['is_searchable', 'is_required']).then((res) => {
        this.dicts = res.data
      })
    },
    handleSizeChange(val) {
      this.queryParam.pageSize = val
      this._getSpecList(this.queryParam)
    },
    handleCurrentChange(val) {
      this.queryParam.currentPage = val
      this._getSpecList(this.queryParam)
    },
    fmtShowType(type) {
      return this.dictMaps.is_searchable['d_' + type]
    },
    fmtStatus(status) {
      return this.dictMaps.is_required['d_' + status]
    },
    handleDel(row) {
      MessageBox.confirm('您确定要删除该记录吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delCatProps(row.id).then((res) => {
          Message({
            message: res.msg,
            type: 'success',
            duration: 3 * 1000
          })
          this._getSpecList(this.queryParam)
        })
      })
    },
    addProp() {
      const prop = {
        id: null,
        categoryId: this.catId,
        propName: '',
        isSearchable: '',
        orderBy: '',
        optionArr: '',
        isRequired: '',
        edit: true
      }
      this.tableData.push(prop)
    },
    confirmEdit(row) {
      row.edit = false
      saveCatProps(row).then((res) => {
        this._getSpecList(this.queryParam)
      })
      this.$message({
        message: '数据已修改',
        type: 'success'
      })
    },
    cancelEdit(row) {
      row.categoryId = row.ori_categoryId
      row.propName = row.ori_propName
      row.isSearchable = row.ori_isSearchable
      row.optionArr = row.ori_optionArr
      row.isRequired = row.ori_isRequired
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
