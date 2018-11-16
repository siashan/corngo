<template>
  <div class="app-container">
     <div class="filter-container">
       
 <div class="custom-tree-container">
  <div class="block">
    <el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>一级分类</span>
    <el-button style="float: right; padding: 3px 0" type="text" @click.stop="handleCreate(1)">添加</el-button>
  </div>
  <div v-for="(o,index) in dataCard1" :key="o.id" class="text item" @click="loadChild(o.areaLevel,o.areaCode,index)" ref="level1">
  {{o.areaName + '--' + o.areaCode}}
  <el-button-group style="float:right" v-if="Btnshow1 === ('Btnshow1' + index)">
  <el-button  icon="el-icon-edit" size="mini" @click.stop="handlerEdit(o)"></el-button>
  <el-button  icon="el-icon-delete" size="mini" @click.stop="handlerDel(o.id)"></el-button>
</el-button-group>
  </div>
</el-card>
  </div>
  <div class="block">
    <el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>二级分类</span>
    <el-button style="float: right; padding: 3px 0" type="text" @click.stop="handleCreate(2)">添加</el-button>
  </div>
  <div v-for="(o,index) in dataCard2" :key="o.id" class="text item" @click="loadChild(o.areaLevel,o.areaCode,index)" ref="level2">
    {{o.areaName + '--' + o.areaCode }}
    <el-button-group style="float:right" v-if="Btnshow2 === ('Btnshow2' + index)">
  <el-button  icon="el-icon-edit" size="mini" @click.stop="handlerEdit(o)"></el-button>
  <el-button  icon="el-icon-delete" size="mini" @click.stop="handlerDel(o.id)"></el-button>
</el-button-group>
  </div>
</el-card>
  </div>
  <div class="block">
    <el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>三级分类</span>
    <el-button style="float: right; padding: 3px 0" type="text" @click.stop="handleCreate(3)">添加</el-button>
  </div>
  <div v-for="(o,index) in dataCard3" :key="o.id" class="text item" @click="loadChild(o.areaLevel,o.areaCode,index)" ref="level3">
    {{o.areaName + '--' + o.areaCode}}
    <el-button-group style="float:right" v-if="Btnshow3 === ('Btnshow3' + index)">
  <el-button  icon="el-icon-edit" size="mini" @click.stop="handlerEdit(o)"></el-button>
  <el-button  icon="el-icon-delete" size="mini" @click.stop="handlerDel(o.id)"></el-button>
</el-button-group>
  </div>
</el-card>
  </div>
  <div class="block">
    <el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>四级分类</span>
    <el-button style="float: right; padding: 3px 0" type="text" @click.stop="handleCreate(4)">添加</el-button>
  </div>
  <div v-for="(o,index) in dataCard4" :key="o.id" class="text item" @click="loadChild(o.areaLevel,o.areaCode,index)" ref="level4">
    {{o.areaName + '--' + o.areaCode}}
    <el-button-group style="float:right" v-if="Btnshow4 === ('Btnshow4' + index)">
  <el-button  icon="el-icon-edit" size="mini" @click.stop="handlerEdit(o)"></el-button>
  <el-button  icon="el-icon-delete" size="mini" @click.stop="handlerDel(o.id)"></el-button>
</el-button-group>
  </div>
</el-card>
  </div>
</div>

</div>


<!-- 弹窗 -->
<el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form :rules="rules" ref="dataForm" :model="temp" label-position="left" label-width="70px" style='width: 90%; margin-left:50px;'>
        <el-row>
          <el-col :span="11">
             <el-form-item label="名称" prop="areaName">
          <el-input v-model="temp.areaName"></el-input>
        </el-form-item>
          </el-col>
          <el-col :span="11" :offset="1">
             <el-form-item label="代码" prop="areaCode">
           <el-input v-model="temp.areaCode"></el-input>
        </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
             <el-form-item label="邮编" prop="zipCode">
          <el-input v-model="temp.zipCode"></el-input>
        </el-form-item>
          </el-col>
          <el-col :span="11" :offset="1">
             <el-form-item label="级别" prop="areaLevel">
           <el-input v-model="temp.areaLevel"></el-input>
        </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
             <el-form-item label="父类" prop="parentCode">
          <el-input v-model="temp.parentCode"></el-input>
        </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button  type="primary" @click="saveData">保存</el-button>
      </div>
    </el-dialog>


  </div>
</template>

<script type="text/ecmascript-6">
import { getAreaList, delArea, saveArea } from '@/api/admin/cityarea'
import { Message, MessageBox } from 'element-ui'
export default {
  data() {
    return {
      tableData: [],
      dataLevel2: [],
      dataLevel3: [],
      dataLevel4: [],
      dataCard1: [],
      dataCard2: [],
      dataCard3: [],
      dataCard4: [],
      Btnshow1: '',
      Btnshow2: '',
      Btnshow3: '',
      Btnshow4: '',
      levelPCode1: '0',
      levelPCode2: '',
      levelPCode3: '',
      levelPCode4: '',
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '修改',
        create: '创建'
      },
      temp: {
        id: null,
        areaName: '',
        areaCode: '',
        areaLevel: '',
        zipCode: '',
        parentCode: '',
        version: 0
      },
      rules: {
        areaName: [{ required: true, message: '名称不能为空', trigger: 'change' }],
        areaCode: [{ required: true, message: '行政区划代码不能为空', trigger: 'blur' }]
      }
    }
  },
  components: {},
  created() {
    this._getAreaList(this.queryParam)
  },
  methods: {
    _getAreaList(params) {
      getAreaList(params).then(res => {
        this.tableData = res.data
        this.dataCard1 = res.data.filter((item) => {
          return item.areaLevel === '1'
        })
        this.dataLevel2 = res.data.filter((item) => {
          return item.areaLevel === '2'
        })
        this.dataLevel3 = res.data.filter((item) => {
          return item.areaLevel === '3'
        })
        this.dataLevel4 = res.data.filter((item) => {
          return item.areaLevel === '4'
        })

        this.loadChild('1', this.dataCard1[0].areaCode, 0)
      })
    },
    loadChild(level, code, index) {
      const _this = this
      switch (level) {
        case '1':
          this.dataCard2 = this.dataLevel2.filter((item) => {
            return item.parentCode === code
          })
          this.dataCard3 = this.dataLevel3.filter((item) => {
            return item.parentCode === this.dataCard2[0].areaCode
          })
          this.dataCard4 = this.dataLevel4.filter((item) => {
            return item.parentCode === this.dataCard3[0].areaCode
          })
          break
        case '2':
          this.dataCard3 = this.dataLevel3.filter((item) => {
            return item.parentCode === code
          })
          this.dataCard4 = this.dataLevel4.filter((item) => {
            return item.parentCode === this.dataCard3[0].areaCode
          })
          break
        case '3':
          this.dataCard4 = this.dataLevel4.filter((item) => {
            return item.parentCode === code
          })
          break
      }
      this.$nextTick(() => {
        _this._changeActive(level, index)
      })
    },
    _changeActive(level, index) {
      const cnt = parseInt(level)
      for (let i = cnt; i <= 4; i++) {
        // 设置高亮
        const l = 'level' + i
        if (this.$refs[l]) {
          this.$refs[l].forEach((item) => {
            item.classList.remove('active')
          })
          if (i === cnt) {
            this.$refs[l][index].classList.add('active')
          } else {
            this.$refs[l][0].classList.add('active')
          }
        }
        // 设置按钮显示
        const btn = 'Btnshow' + i
        if (i === cnt) {
          this[btn] = 'Btnshow' + i + index
        } else {
          this[btn] = 'Btnshow' + i + 0
        }
        // 设置PCode
        const lv = 'levelPCode' + i
        if (i > 1) {
          const dc = 'dataCard' + (i - 1)
          if (i - 1 === cnt) {
            this[lv] = this[dc][index].areaCode
          } else {
            this[lv] = this[dc][0].areaCode
          }
        }
      }
    },
    handlerEdit(item) {
      MessageBox.confirm('您确定要修改该记录吗', '提示', {
        confirmButtonText: '修改',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.copyTemp(item)
        this.dialogStatus = 'update'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      })
    },
    handlerDel(id) {
      MessageBox.confirm('您确定要删除该记录吗', '提示', {
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delArea(id).then((res) => {
          Message({
            message: res.msg,
            type: 'success',
            duration: 3 * 1000
          })
          this._getAreaList(this.queryParam)
        })
      })
    },
    handleCreate(level) {
      const lv = 'levelPCode' + level
      const PCode = this[lv]
      console.log('pcode' + level + ':' + PCode)
      this.resetTemp(level, PCode)
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    resetTemp(level, PCode) {
      this.temp = {
        id: null,
        areaName: '',
        areaCode: '',
        areaLevel: level,
        zipCode: '',
        parentCode: PCode,
        version: 0
      }
    },
    copyTemp(item) {
      this.temp = {
        id: item.id,
        areaName: item.areaName,
        areaCode: item.areaCode,
        areaLevel: item.areaLevel,
        zipCode: item.zipCode,
        parentCode: item.parentCode,
        version: item.version
      }
    },
    saveData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          console.log(JSON.stringify(this.temp))
          saveArea(this.temp).then((res) => {
            this.dialogFormVisible = false
            Message({
              message: res.msg,
              type: 'success',
              duration: 3 * 1000
            })

            this._getAreaList()
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
  margin: 0 10px
}
.box-card {
    width: 98%;
}
.text {
    font-size: 16px;
    line-height: 32px;
    height: 40px;
    padding: 4px;
}

.item {
    cursor: pointer;
    border-bottom: 1px dashed #f0f0f0;
    vertical-align:middle;
}
.item.active {
   background-color: #f0f0f0
}
.item:hover {
   background-color: #f0f0f0
}
.clearfix:after {
    clear: both
  }
</style>
