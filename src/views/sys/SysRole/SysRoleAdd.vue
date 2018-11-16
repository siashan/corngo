<template>
<div class="main-wrap">
<el-row :gutter="20">
  <el-col :span="14" :offset="5"><div class="grid-content bg-purple">
<el-form ref="form" :model="form" :rules="rules" label-width="80px">
  <el-form-item label="角色名" prop="name">
    <el-input v-model="form.name" value=""></el-input>
  </el-form-item>

  <el-form-item label="备注" >
    <el-input v-model="form.remark"></el-input>
  </el-form-item>
  <el-form-item label="权限" >
    <el-tree
    ref="tree"
  :data="treeData"
  show-checkbox
  node-key="id"
  check-strictly
  :default-checked-keys="form.menus"
  :props="defaultProps">
</el-tree>
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
import { getMenuList } from '@/api/sys/SysMenu'
import { saveRole, getRoleById } from '@/api/sys/SysRole'
import { Message } from 'element-ui'
// import { getDict } from '@/api/public'
export default {
  data() {
    return {
      form: {
        name: '',
        remark: '',
        menus: []
      },
      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      roleId: null,
      rules: {
        name: [
          { required: true, message: '请输入角色名', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.roleId = this.$route.query.id
    if (this.roleId) {
      this._getRole()
    }
    this._getMenuTree()
  },
  mounted() {

  },
  methods: {
    onSubmit() {
      const checkNotes = this.$refs.tree.getCheckedNodes()
      const halfcheckNotes = this.$refs.tree.getHalfCheckedNodes()

      this.form.menus = []
      for (let i = 0; i < checkNotes.length; i++) {
        const note = checkNotes[i]
        this.form.menus.push(note.id)
      }
      for (let i = 0; i < halfcheckNotes.length; i++) {
        const note = halfcheckNotes[i]
        this.form.menus.push(note.id)
      }
      if (this.form.menus.length < 1) {
        Message({
          message: '请至少选择一个权限',
          type: 'warning',
          duration: 3 * 1000
        })
      } else {
        this.$refs.form.validate((valid) => {
          console.log(this.menus)
          if (valid) {
            saveRole(this.form).then((res) => {
              console.log(res)
              this.$router.push({ path: '/sys/role' })
            })
          }
        })
      }
    },
    goBack() {
      this.$router.go(-1)
    },
    _getMenuTree() {
      getMenuList().then((res) => {
        this.treeData = res.data
      })
    },
    _getRole() {
      getRoleById(this.roleId).then((res) => {
        console.log(res.data)
        this.form = res.data
        console.log('menus:' + JSON.stringify(this.form))
      })
    }
  },
  components: {

  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
   