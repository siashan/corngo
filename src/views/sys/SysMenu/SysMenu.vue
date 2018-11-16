<template>
  <div class="app-container">

  
    <tree-table :data="data" :evalFunc="func" :columns="columns" :evalArgs="args" :expandAll="expandAll" border>
      <el-table-column label="类型">
        <template slot-scope="scope">
          <el-tag>{{fmtMenuType(scope.row.type)}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="后台权限">
        <template slot-scope="scope">
         {{scope.row.permissions}}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="text" @click="handleCreate(scope.row.id)">新增</el-button>
          <el-button type="text" @click="handleUpdate(scope.row)">修改</el-button>
          <el-button type="text" @click="_delMenu(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </tree-table>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form :rules="rules" ref="dataForm" :model="temp" label-position="left" label-width="70px" style='width: 90%; margin-left:50px;'>
        <el-row>
          <el-col :span="11">
             <el-form-item label="名称" prop="name">
          <el-input v-model="temp.name"></el-input>
        </el-form-item>
          </el-col>
          <el-col :span="11" :offset="1">
             <el-form-item label="URL" prop="url">
           <el-input v-model="temp.url"></el-input>
        </el-form-item>
          </el-col>
        </el-row>
         <el-row>
          <el-col :span="11">
             <el-form-item label="类型" prop="type">
          <el-select v-model="temp.type" placeholder="请选择">
            <el-option
              v-for="item in dicts.menu_type"
              :key="item.dictCode"
              :label="item.dictName"
              :value="item.dictCode">
            </el-option>
            </el-select>
        </el-form-item>
          </el-col>
          <el-col :span="11" :offset="1">
             <el-form-item label="权限" prop="permissions">
           <el-input v-model="temp.permissions"></el-input>
        </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
             <el-form-item label="图标" prop="icon">
          <el-select v-model="temp.icon" placeholder="请选择">
            <el-option
            v-for="item in cons"
            :key="item"
            :label="item"
            :value="item">
            <span style="float: left">{{ item }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px" :class="item"></span>
          </el-option>
            </el-select>
        </el-form-item>
          </el-col>
          <el-col :span="11" :offset="1">
             <el-form-item label="排序" prop="orderBy">
           <el-input v-model="temp.orderBy"></el-input>
        </el-form-item>
        </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
             <el-form-item label="路由path" prop="path">
          <el-input v-model="temp.path"></el-input>
        </el-form-item>
          </el-col>
          <el-col :span="11" :offset="1">
             <el-form-item label="组件" prop="component">
           <el-input v-model="temp.component"></el-input>
        </el-form-item>
        </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
             <el-form-item label="重定向path" prop="redirectPath">
          <el-input v-model="temp.redirectPath"></el-input>
        </el-form-item>
          </el-col>
          <el-col :span="11" :offset="1">
             <el-form-item label="是否隐藏" prop="isHidden">
           <el-radio-group v-model="temp.isHiddren" size="small">
             <el-radio v-for="item in dicts.is_hidden" :key="item.id" :label="item.dictCode" border >{{item.dictName}}</el-radio>
          </el-radio-group>
        </el-form-item>
        </el-col>
        </el-row>
         <el-row>
          <el-col :span="11">
             <el-form-item label="是否最后一级" prop="isLastLevel">
           <el-radio-group v-model="temp.isLastLevel" size="small">
             <el-radio v-for="item in dicts.is_lastlevel" :key="item.id" :label="item.dictCode" border >{{item.dictName}}</el-radio>
          </el-radio-group>
        </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button  type="primary" @click="createData">保存</el-button>
        <!-- <el-button  type="primary" @click="updateData">保存</el-button> -->
      </div>
    </el-dialog>
  </div>
</template>

<script>
/**
  Auth: Lei.j1ang
  Created: 2018/1/19-14:54
*/
import treeTable from '@/components/TreeTable'
import treeToArray from './customEval'
import { getMenuList, delMenu, saveMenu } from '@/api/sys/SysMenu'
import { getDictMap, getDict } from '@/api/public'
import { ICONS } from '@/api/config'
import { Message, MessageBox } from 'element-ui'
export default {
  name: 'customTreeTableDemo',
  components: { treeTable },
  data() {
    return {
      func: treeToArray,
      expandAll: false,
      columns: [
        {
          text: '名称',
          value: 'name',
          width: 200
        }
      ],
      data: {},
      dicts: {},
      dictMaps: {},
      cons: {},
      args: [null, null, 'timeLine'],
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '修改',
        create: '创建'
      },
      rules: {
        type: [{ required: true, message: 'type is required', trigger: 'change' }],
        timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        title: [{ required: true, message: 'title is required', trigger: 'blur' }],
        orderBy: [{ required: true, message: 'orderBy is required', trigger: 'blur' }]
      },
      temp: {
        id: null,
        name: '',
        type: '',
        url: '',
        icon: '',
        permissions: '',
        path: '',
        component: '',
        redirectPath: '',
        isHiddren: '1',
        isLastLevel: '0',
        orderBy: '',
        parentId: null
      }
    }
  },
  created() {
    console.log('meta:' + JSON.stringify(this.$route.meta))
    this._getDict()
    this._getDictMap()
    this._getMenuList()
    this.cons = ICONS
  },
  methods: {
    message(row) {
      this.$message.info(row.type)
    },
    _getMenuList() {
      getMenuList().then((res) => {
        this.data = res.data
        // console.log(JSON.stringify(this.data))
      })
    },
    _getDictMap() {
      getDictMap(['menu_type']).then((res) => {
        this.dictMaps = res.data
      })
    },
    _getDict() {
      getDict(['menu_type', 'is_hidden', 'is_lastlevel']).then((res) => {
        this.dicts = res.data
      })
    },
    fmtMenuType(t) {
      if (t !== undefined) {
        return this.dictMaps.menu_type['d_' + t]
      }
    },
    _delMenu(id) {
      MessageBox.confirm('您确定要删除该记录吗', '提示', {
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delMenu(id).then((res) => {
          Message({
            message: res.msg,
            type: 'success',
            duration: 3 * 1000
          })
          this._getMenuList(this.queryParam)
        })
      })
    },
    resetTemp() {
      this.temp = {
        id: null,
        name: '',
        type: '',
        url: '',
        icon: '',
        permissions: '',
        path: '',
        component: '',
        redirectPath: '',
        isHiddren: '1',
        isLastLevel: '0',
        orderBy: '',
        parentId: null
      }
    },
    copyTemp(row) {
      this.temp = {
        id: row.id,
        name: row.name,
        type: row.type,
        url: row.url,
        icon: row.icon,
        permissions: row.permissions,
        path: row.path,
        component: row.component,
        redirectPath: row.redirectPath,
        isHiddren: row.isHiddren ? row.isHiddren : '1',
        isLastLevel: row.isLastLevel ? row.isLastLevel : '0',
        orderBy: row.orderBy,
        parentId: row.parentId
      }
    },
    handleCreate(id) {
      this.resetTemp()
      this.temp.parentId = id
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleUpdate(row) {
      // this.temp = Object.assign({}, row) // copy obj
      this.copyTemp(row)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          saveMenu(this.temp).then(() => {
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '操作成功',
              type: 'success',
              duration: 2000
            })
            this._getMenuList()
          })
        }
      })
    }
  }
}
</script>
