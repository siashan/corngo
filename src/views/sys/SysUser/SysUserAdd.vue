<template>
<div class="main-wrap">
<el-row :gutter="20">
  <el-col :span="14" :offset="5"><div class="grid-content bg-purple">
<el-form ref="form" :model="form" :rules="rules" label-width="80px">
  <el-form-item label="用户名" prop="name">
    <el-input v-model="form.name" value=""></el-input>
  </el-form-item>
  <el-form-item v-if="!form.id" label="密码" prop="password">
    <el-input type="password" v-model="form.password"></el-input>
  </el-form-item>
   <el-form-item  v-if="!form.id" label="确认密码" prop="rePassword">
    <el-input type="password" v-model="form.rePassword"></el-input>
  </el-form-item>
  <el-form-item label="手机号" >
    <el-input v-model="form.phoneNo"></el-input>
  </el-form-item>
   <el-form-item label="邮箱">
    <el-input v-model="form.email"></el-input>
  </el-form-item>
  <el-form-item label="性别">
    <el-radio-group v-model="form.gender">
      <el-radio v-for="item in dicts.gender" :key="item.id" :label="item.dictCode">{{item.dictName}}</el-radio>
    </el-radio-group>
  </el-form-item>
   <el-form-item label="状态">
    <el-radio-group v-model="form.status">
      <el-radio v-for="item in dicts.user_status" :key="item.id" :label="item.dictCode">{{item.dictName}}</el-radio>
    </el-radio-group>
  </el-form-item>
   <el-form-item label="角色" prop="roleList">
    <el-checkbox-group  v-model="form.roleList">
    <el-checkbox  v-for="item in roles" :key="item.id + ''" :label="item.id">{{item.name}}</el-checkbox>
  </el-checkbox-group>
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
import { saveUser, getUserById } from '@/api/sys/SysUser'
import { getDict } from '@/api/public'
import { getRoleList } from '@/api/sys/SysRole'
export default {
  data() {
    const validateRePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码不少于6位'))
      } else if (value !== this.form.password) {
        callback(new Error('两次密码不一致'))
      } else {
        callback()
      }
    }
    return {
      form: {
        name: '',
        password: '',
        rePassword: '',
        phoneNo: '',
        email: '',
        gender: '1',
        status: '1',
        roleList: []
      },
      roles: [],
      roleList: [],
      dicts: {},
      userId: null,
      rules: {
        name: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, message: '最少6位', trigger: 'blur' }
        ],
        rePassword: [
          { required: true, trigger: 'blur', validator: validateRePassword }
        ],
        roleList: [
          { required: true, trigger: 'blur', message: '至少选择一个角色' }
        ]
      }
    }
  },
  created() {
    this.userId = this.$route.query.id
    if (this.userId) {
      this._getUser()
    }
    this._getDict()
    this._getRoleList()
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          console.log('query:' + JSON.stringify(this.form))
          saveUser(this.form).then((res) => {
            this.$router.push({ path: '/sys/user' })
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
    _getUser() {
      getUserById(this.userId).then((res) => {
        this.form = res.data
        console.log(this.form)
        if (!this.form.roleList) {
          this.$set(this.form, 'roleList', [])
        }
      })
    },
    _getRoleList() {
      getRoleList().then((res) => {
        this.roles = res.data.rows
      })
    }
  },
  components: {

  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
   