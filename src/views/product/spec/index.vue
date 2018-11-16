<template>
  <div class="app-container">
     <div class="filter-container">
       
    <el-input  style="width: 200px;" class="filter-item" v-model="queryParam.name" placeholder="请输入品牌名称">
      </el-input>
      
   <el-button-group class="filter-item">
   <el-button  type="primary"  icon="el-icon-search" @click="handleSearch">搜索</el-button>
      <el-button  type="primary"  icon="el-icon-close" @click="resetForm">重置</el-button>
</el-button-group>
   <el-button-group class="filter-item">
  <el-button  type="success" icon="el-icon-plus" @click="addSpec">新增</el-button>
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
      <spec-value slot-scope="props" :specId="props.row.id" :specType="props.row.showType" v-if="props.row.id"></spec-value>
    </el-table-column>
    <el-table-column
      label="名称">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-input class="edit-input" size="small" v-model="scope.row.specName"></el-input>
          </template>
          <span v-else>{{ scope.row.specName }}</span>
        </template>
    </el-table-column>
    <el-table-column
      label="展示类型">
       <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-select v-model="scope.row.showType" placeholder="请选择" >
            <el-option
              v-for="item in dicts.spec_showtype"
              :key="item.dictCode"
              :label="item.dictName"
              :value="item.dictCode">
            </el-option>
          </el-select>
          </template>
          <span v-else>{{ fmtShowType(scope.row.showType) }}</span>
        </template>
    </el-table-column>
    
    <el-table-column
      label="描述">
       <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-input class="edit-input" size="small" v-model="scope.row.specMeno"></el-input>
          </template>
          <span v-else>{{ scope.row.specMeno }}</span>
        </template>
    </el-table-column>
     <el-table-column
      label="状态">
      <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-select v-model="scope.row.showStatus" placeholder="请选择" >
            <el-option
              v-for="item in dicts.spec_status"
              :key="item.dictCode"
              :label="item.dictName"
              :value="item.dictCode">
            </el-option>
          </el-select>
          </template>
          <span v-else>{{ fmtStatus(scope.row.showType) }}</span>
        </template>
    </el-table-column>
    <el-table-column
      label="创建时间">
      <template slot-scope="scope">
          <span >{{ scope.row.createTime }}</span>
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
import { getSpecList, delSpec, saveSpec } from '@/api/product/spec'
import { Message, MessageBox } from 'element-ui'
import { PREVIEW_SERVICE } from '@/api/config'
import { getDictMap, getDict } from '@/api/public'
import SpecValue from '@/views/product/spec/specValue'
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
      listLoading: true,
      values: [],
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '修改',
        create: '创建'
      },
      dictMaps: {},
      dicts: [],
      spec: {
        id: null,
        specName: '',
        showType: '',
        orderBy: '',
        showStatus: '',
        specMeno: '',
        edit: true
      },
      imageUrl: ''
    }
  },
  components: {
    SpecValue
  },
  created() {
    this._getDictMap()
    this._getDict()
    this._getSpecList(this.queryParam)
  },
  methods: {
    _getSpecList(params) {
      getSpecList(params).then(res => {
        const items = res.data.rows
        this.tableData = res.data.rows
        this.totalSize = res.data.total
        this.tableData = items.map(v => {
          this.$set(v, 'edit', false) // https://vuejs.org/v2/guide/reactivity.html
          v.ori_specName = v.specName //  will be used when user click the cancel botton
          v.ori_showType = v.showType //  will be used when user click the cancel botton
          v.ori_orderBy = v.orderBy //  will be used when user click the cancel botton
          v.ori_showStatus = v.showStatus //  will be used when user click the cancel botton
          v.ori_specMeno = v.specMeno //  will be used when user click the cancel botton
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
    clickRow(row, event, column) {
      this.currentRow = row
    },
    fmtShowType(type) {
      return this.dictMaps.spec_showtype['d_' + type]
    },
    fmtStatus(status) {
      return this.dictMaps.spec_status['d_' + status]
    },
    showImg(path) {
      return PREVIEW_SERVICE + path
    },
    resetForm() {
      this.queryParam.name = ''
    },
    handleDel(row) {
      MessageBox.confirm('您确定要删除该记录吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delSpec(row.id).then((res) => {
          Message({
            message: res.msg,
            type: 'success',
            duration: 3 * 1000
          })
          this._getSpecList(this.queryParam)
        })
      })
    },
    handleAvatarSuccess(res, file) {
      console.log(JSON.stringify(res))
      this.temp.imgPath = res.filePath
      this.imageUrl = PREVIEW_SERVICE + res.filePath
    },
    addSpec() {
      const spec = {
        id: null,
        specName: '',
        showType: '',
        orderBy: '',
        showStatus: '',
        specMeno: '',
        edit: true
      }
      this.tableData.push(spec)
    },
    confirmEdit(row) {
      row.edit = false
      saveSpec(row).then((res) => {
        this._getSpecList(this.queryParam)
      })
      this.$message({
        message: '数据已修改',
        type: 'success'
      })
    },
    cancelEdit(row) {
      row.specName = row.ori_specName //  will be used when user click the cancel botton
      row.specName = row.ori_showType //  will be used when user click the cancel botton
      row.orderBy = row.ori_orderBy //  will be used when user click the cancel botton
      row.showStatus = row.ori_showStatus //  will be used when user click the cancel botton
      row.specMeno = row.ori_specMeno //  will be used when user click the cancel botton
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
.avatar-uploader {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
