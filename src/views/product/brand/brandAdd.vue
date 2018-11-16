<template>
<div class="main-wrap">
<el-row :gutter="20">
  <el-col :span="14" :offset="1"><div class="grid-content bg-purple">
<el-form ref="form" :model="form" :rules="rules" label-width="80px">
  <el-form-item label="中文名称" prop="chName">
    <el-input v-model="form.chName"></el-input>
  </el-form-item>
   <el-form-item label="英文名称" prop="enName">
    <el-input v-model="form.enName"></el-input>
  </el-form-item>
   <el-form-item label="品牌描述" prop="desp">
    <el-input v-model="form.desp"></el-input>
  </el-form-item>
  
   <el-form-item label="状态" prop="status">
    <el-radio-group v-model="form.status">
      <el-radio v-for="item in dicts.user_status" :key="item.id" :label="item.dictCode">{{item.dictName}}</el-radio>
    </el-radio-group>
  </el-form-item>
   <el-form-item label="logo" prop="logo">
    <el-upload
          class="avatar-uploader"
          action="http://localhost:8081/upload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess">
          <img v-if="form.logo" :src="showImg(form.logo)" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit">立即创建</el-button>
    <el-button @click="goBack">取消</el-button>
  </el-form-item>
</el-form>
</div></el-col>
</el-row>
</div>
</template>

<script type="text/ecmascript-6">
import { saveBrand, getBrandById } from '@/api/product/brand'
import { getDict } from '@/api/public'
import { PREVIEW_SERVICE } from '@/api/config'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import treeselect from '@riophae/vue-treeselect'
export default {
  data() {
    return {
      form: {
        productItemsId: '',
        enName: '',
        chName: '',
        desp: '',
        logo: '',
        status: '1'
      },
      options: [],
      item1value: [],
      item2value: [],
      options2: [],
      dicts: {},
      brandId: null,
      queryParam: {
        usefor: '2'
      },
      rules: {
        // itemId: [
        //   { required: true, message: '请选择类别', trigger: 'blur' }
        // ],
        enName: [
          { required: true, message: '请输入英文名称', trigger: 'blur' }
        ],
        chName: [
          { required: true, message: '请输入中文名称', trigger: 'blur' }
        ],
        desp: [
          { required: true, trigger: 'blur', message: '请输入描述' }
        ],
        status: [
          { required: true, trigger: 'biur', message: '请选择状态' }
        ],
        logo: [
          { required: true, trigger: 'blur', message: '请上传logo' }
        ]
      }
    }
  },
  created() {
    this.brandId = this.$route.query.id
    if (this.brandId) {
      this._getBrand()
    }
    this._getDict()
  },
  components: {
    treeselect
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          console.log('query:' + JSON.stringify(this.form))
          saveBrand(this.form).then((res) => {
            this.$router.push({ path: '/product/brand' })
          })
        }
      })
    },
    goBack() {
      this.$router.go(-1)
    },
    _getDict() {
      getDict(['gender', 'user_status']).then((res) => {
        this.dicts = res.data
      })
    },
    _getBrand() {
      getBrandById(this.brandId).then((res) => {
        this.form = JSON.parse(res.data.brand)

        const iid = this.form.productItemsId
        this.item1value = res.data.fatherItems
        this.item2value.splice(0, this.item1value.length)
        this.item2value.push(iid)
        this.openChild(this.item1value)
        console.log(JSON.stringify(this.options))
        console.log(JSON.stringify(this.item1value))
      })
    },
    handleItems(value) {
      this.form.productItemsId = value[0]
    },
    showImg(path) {
      return PREVIEW_SERVICE + path
    },
    handleAvatarSuccess(res, file) {
      console.log(JSON.stringify(res))
      this.form.logo = res.msg
      this.imageUrl = PREVIEW_SERVICE + res.msg
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.custom-tree-container{
  display:flex;
  align-content:space-between;
  
}
.custom-tree-container .block{
  flex: 1;
  margin: 0 100px
}
.block:first-child{
 border-right: 1px solid #eff2f6;
}
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
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