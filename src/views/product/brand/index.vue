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
  <el-button  type="success" icon="el-icon-plus" @click="handleCreate">新增</el-button>
  <el-button type="warning" icon="el-icon-edit" @click="handleUpdate">修改</el-button>
  <el-button type="danger" icon="el-icon-delete" @click="handleDel">删除</el-button>
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
      prop="id">
    </el-table-column>
    <el-table-column
      label="图片">
       <template slot-scope="scope">
         <img :src="showImg(scope.row.logo)"  width="50" height="25" />
        </template>
    </el-table-column>
    <el-table-column
      label="名称"
      prop="chName">
    </el-table-column>
    
    <el-table-column
      label="描述"
      prop="desp">
    </el-table-column>
     <el-table-column
      label="状态"
      prop="status"
      :formatter="fmtStatus">
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
import { getBrandList, delBrand } from '@/api/product/brand'
import { Message, MessageBox } from 'element-ui'
import { parseTime } from '@/utils'
import { PREVIEW_SERVICE } from '@/api/config'
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
      statusOptions: [
        {
          value: '0',
          label: '禁用'
        },
        {
          value: '1',
          label: '可用'
        }
      ],
      platOptions: [
        {
          value: '1',
          label: 'PC端'
        },
        {
          value: '2',
          label: '移动端'
        }
      ],
      values: [],
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '修改',
        create: '创建'
      },
      temp: {
        id: null,
        title: '',
        imgSrc: '',
        imgPath: '',
        imgAlt: '',
        status: '',
        showPlat: ''
      },
      imageUrl: ''
    }
  },
  components: {},
  created() {
    this._getBrandList(this.queryParam)
  },
  methods: {
    _getBrandList(params) {
      getBrandList(params).then(res => {
        this.tableData = res.data.rows
        this.totalSize = res.data.total
      })
    },
    handleSizeChange(val) {
      this.queryParam.pageSize = val
      this._getBrandList(this.queryParam)
    },
    handleCurrentChange(val) {
      this.queryParam.currentPage = val
      this._getBrandList(this.queryParam)
    },
    handleSearch() {
      this._getBrandList(this.queryParam)
    },
    fmtTime(row, column, cellValue, index) {
      return parseTime(row.createTime, '')
    },
    clickRow(row, event, column) {
      this.currentRow = row
    },
    fmtStatus(row, column, cellValue, index) {
      if (row.status === '0') {
        return '禁用'
      } else {
        return '可用'
      }
    },
    showImg(path) {
      return PREVIEW_SERVICE + path
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
      this.$router.push({ path: '/product/brand/add' })
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
          this.$router.push({ path: '/product/brand/add', query: { id: this.currentRow.id }})
        })
      }
    },
    handleDel() {
      if (this.currentRow === null) {
        Message({
          message: '请选择要删除的记录',
          type: 'warning',
          duration: 3 * 1000
        })
      } else {
        MessageBox.confirm('您确定要删除该记录吗', '提示', {
          confirmButtonText: '修改',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delBrand(this.currentRow.id).then((res) => {
            Message({
              message: res.msg,
              type: 'success',
              duration: 3 * 1000
            })
            this._getBrandList(this.queryParam)
          })
        })
      }
    },
    handleAvatarSuccess(res, file) {
      console.log(JSON.stringify(res))
      this.temp.imgPath = res.filePath
      this.imageUrl = PREVIEW_SERVICE + res.filePath
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
