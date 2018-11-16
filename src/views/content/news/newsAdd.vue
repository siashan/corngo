<template>
<div class="main-wrap">
<el-row :gutter="20">
  <el-col :span="23" ><div class="grid-content bg-purple">
<el-form ref="form" :model="form" :rules="rules" label-width="10%">
  <el-form-item label="标题" prop="title">
    <el-input v-model="form.title" value=""></el-input>
  </el-form-item>
  <el-form-item  label="副标题" prop="subTitle">
    <el-input  v-model="form.subTitle"></el-input>
  </el-form-item>
   <el-form-item  label="作者" prop="author">
    <el-input  v-model="form.author"></el-input>
  </el-form-item>
  <el-form-item label="类型" prop="type">
    <el-select v-model="form.type" placeholder="请选择">
            <el-option
              v-for="item in dicts.news_type"
              :key="item.dictCode"
              :label="item.dictName"
              :value="item.dictCode">
            </el-option>
            </el-select>
  </el-form-item>
   <el-form-item label="状态">
    <el-select v-model="form.status" placeholder="请选择">
            <el-option
              v-for="item in dicts.news_status"
              :key="item.dictCode"
              :label="item.dictName"
              :value="item.dictCode">
            </el-option>
            </el-select>
  </el-form-item>
   <el-form-item  label="SEO关键字" prop="seoWord">
    <el-input  v-model="form.seoWord"></el-input>
  </el-form-item>
   <el-form-item  label="摘要" prop="summary">
    <el-input
      type="textarea"
      :rows="2"
      placeholder="请输入内容"
      v-model="form.summary">
    </el-input>
  </el-form-item>
   <el-form-item  label="内容" prop="content">
   <u-meditor v-model="form.content"></u-meditor>
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
import { saveNews, getNewsById } from '@/api/admin/news'
import { getDict } from '@/api/public'
import UMeditor from '@/components/UM'
export default {
  data() {
    return {
      form: {
        title: '',
        subTitle: '',
        author: '',
        type: '',
        status: '',
        seoWord: '',
        summary: '1',
        content: 'test'
      },
      roles: [],
      roleList: [],
      dicts: {},
      newsId: null,
      rules: {
        title: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.newsId = this.$route.query.id
    if (this.newsId) {
      this._getNews()
    }
    this._getDict()
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          console.log('query:' + JSON.stringify(this.form))
          saveNews(this.form).then((res) => {
            this.$router.push({ path: '/admin/news' })
          })
        }
      })
    },
    goBack() {
      this.$router.go(-1)
    },
    _getNews() {
      getNewsById(this.newsId).then((res) => {
        this.form = res.data
        console.log(this.form)
      })
    },
    _getDict() {
      getDict(['news_status', 'news_type']).then((res) => {
        this.dicts = res.data
      })
    }
  },
  components: {
    UMeditor
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
   