
<template slot-scope="props" v-if="props.row.id">
<div class="app-container">
<el-button type="primary" @click="addSpecValue">添加规格值</el-button>
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
            label="规格值">
             <template slot-scope="scope">
              <template v-if="scope.row.edit">
                <el-input class="edit-input" size="small" v-model="scope.row.specValue"></el-input>
              </template>
              <span v-else>{{ scope.row.specValue }}</span>
            </template>
        </el-table-column>
        <el-table-column
            label="图片"
            v-if="specType === '2'"
            >
             <template slot-scope="scope">
              <template v-if="scope.row.edit">
                <el-upload
                  class="avatar-uploader"
                  :action="fs"
                  :show-file-list="false"
                  :on-success="(res,file)=>{return handleAvatarSuccess(res,file, scope.row)}">
                  <img v-if="scope.row.specImg" :src="showImg(scope.row.specImg)" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </template>
              <span v-else>
                <img v-if="scope.row.specImg" :src="showImg(scope.row.specImg)" class="avatar">
              </span>
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
import { loadSpecValues, saveSpecValue, delSpecValue } from '@/api/product/spec'
import { PREVIEW_SERVICE, FILE_SERVICE } from '@/api/config'
import { Message, MessageBox } from 'element-ui'
export default {
  props: {
    specId: Number,
    specType: String
  },
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
      fs: FILE_SERVICE
    }
  },
  components: {},
  created() {
    this._listValues()
  },
  methods: {
    _listValues() {
      loadSpecValues(this.specId).then((res) => {
        const items = res.data
        this.tableData = res.data
        this.tableData = items.map(v => {
          this.$set(v, 'edit', false) // https://vuejs.org/v2/guide/reactivity.html
          v.ori_specValue = v.specValue //  will be used when user click the cancel botton
          v.ori_specImg = v.specImg //  will be used when user click the cancel botton
          v.ori_orderBy = v.orderBy //  will be used when user click the cancel botton
          return v
        })
        this.listLoading = false
      })
    },
    showImg(path) {
      return PREVIEW_SERVICE + path
    },
    handleAvatarSuccess(res, file, row) {
      this.$set(row, 'specImg', res.msg)
      console.log(JSON.stringify(row))
    },
    handleDel(row) {
      MessageBox.confirm('您确定要删除该记录吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delSpecValue(row.id).then((res) => {
          Message({
            message: res.msg,
            type: 'success',
            duration: 3 * 1000
          })
          this._listValues(this.queryParam)
        })
      })
    },
    addSpecValue() {
      const specValue = {
        id: null,
        specId: this.specId,
        specValue: '',
        showImg: '',
        orderBy: '',
        edit: true
      }
      this.tableData.push(specValue)
    },
    confirmEdit(row) {
      row.edit = false
      saveSpecValue(row).then((res) => {
        this._listValues(this.queryParam)
      })
      this.$message({
        message: '数据已修改',
        type: 'success'
      })
    },
    cancelEdit(row) {
      row.specValue = row.ori_specValue //  will be used when user click the cancel botton
      row.specImg = row.ori_specImg //  will be used when user click the cancel botton
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
.avatar-uploader {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
      width: 100px;
    height: 100px;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .avatar {
    width: 100px;
    height: 100px;
    display: block;
  }
</style>
