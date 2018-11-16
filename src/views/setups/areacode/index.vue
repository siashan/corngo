<template>
  <div class="app-container">
<div class="custom-tree-container">
  <div class="block">


    <p>大分类</p>
    <el-tree
      :data="data4"
      show-checkbox
      node-key="id"
      default-expand-all
      @node-click="openChild"
      >
       <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <span>
          <el-button
            type="text"
            size="mini"
            @click="() => append(data,node)">
            新增
          </el-button>
           <el-button
            type="text"
            size="mini"
            @click="() => update(data,node)">
            修改
          </el-button>
        </span>
       </span>
    </el-tree>
  </div>
  <div class="block">
    <p>小分类</p>
    <el-tree
      :data="data5"
      show-checkbox
      node-key="id"
      default-expand-all
      :expand-on-click-node="false">
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <span>
           <el-button
            type="text"
            size="mini"
            @click="() => update(data,node)">
            修改
          </el-button>
        </span>
       </span>
    </el-tree>
    
  </div>
</div>
<!-- 弹窗 -->
<el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form :rules="rules" ref="dataForm" :model="temp" label-position="left" label-width="70px" style='width: 90%; margin-left:50px;'>
        <el-row>
          <el-col :span="11">
             <el-form-item label="名称" prop="itemName">
          <el-input v-model="temp.itemName"></el-input>
        </el-form-item>
          </el-col>
          <el-col :span="11" :offset="1">
             <el-form-item label="排序" prop="orderBy">
           <el-input v-model="temp.orderBy"></el-input>
        </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button  type="primary" @click="createData">保存</el-button>
      </div>
    </el-dialog>

</div>
</template>
  


<script>
import { getItemsList, saveItems, getItemsById, getChild } from '@/api/product/items/productItems'
// const id = 1000

export default {
  data() {
    return {
      data4: [],
      data5: [],
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '修改',
        create: '创建'
      },
      temp: {
        id: null,
        itemName: '',
        orderBy: '',
        parentId: null
      },
      rules: {
        itemName: [{ required: true, message: 'itemName is required', trigger: 'change' }],
        orderBy: [{ required: true, message: 'orderBy is required', trigger: 'blur' }]
      }
    }
  },
  created() {
    this._getItemsList()
  },

  methods: {
    _getItemsList() {
      getItemsList().then((res) => {
        this.data4 = res.data
      })
    },
    resetTemp() {
      this.temp = {
        id: null,
        itemName: '',
        orderBy: '',
        parentId: null
      }
    },
    copyTemp(data) {
      this.temp = {
        id: data.id,
        itemName: data.label,
        orderBy: data.orderBy,
        parentId: data.parentId,
        version: data.version
      }
    },
    append(data, node) {
      // console.log(JSON.stringify(data))
      // console.log(node)
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.resetTemp()
      this.temp.parentId = data.id
      // console.log(JSON.stringify(this.temp))
    },
    update(data, node) {
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      // this.copyTemp(data)
      getItemsById(data.id).then((res) => {
        this.temp = res.data
      })
    },
    openChild(data, node) {
      if (node.level === 3) {
        getChild(data.id).then((res) => {
          this.data5 = res.data
        })
      } else {
        this.data5 = []
      }
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          console.log(JSON.stringify(this.temp))
          saveItems(this.temp).then(() => {
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '操作成功',
              type: 'success',
              duration: 2000
            })
            this._getItemsList()
          })
        }
      })
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
</style>