<template>
  <div class="app-container">
     <div class="filter-container">
       
 <div class="custom-tree-container">
  <div class="block">
    <el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>一级分类</span>
  </div>
  <div v-for="(o,index) in dataCard1" :key="o.id" class="text item" @click="loadChild(o.catLevel,o.id,index)" ref="level1">
  {{o.catName}}
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
  </div>
  <div v-for="(o,index) in dataCard2" :key="o.id" class="text item" @click="loadChild(o.catLevel,o.id,index)" ref="level2">
    {{o.catName }}
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
  </div>
  <div v-for="(o,index) in dataCard3" :key="o.id" class="text item" @click="loadChild(o.catLevel,o.id,index)"  ref="level3">
    {{o.catName}}
  </div>
</el-card>
  </div>
</div>

</div>
  </div>
</template>

<script type="text/ecmascript-6">
import { getCatList, delCat } from '@/api/product/category'
import { Message, MessageBox } from 'element-ui'
import CategorySet from '@/views/product/category/CategorySet'
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
      Btnshow1: '',
      Btnshow2: '',
      Btnshow3: '',
      levelPCode1: '0',
      levelPCode2: '',
      levelPCode3: '',
      leafId: null,
      dialogFormVisible: false,
      dialogSetVisible: false,
      dialogStatus: '',
      textMap: {
        update: '修改',
        create: '创建'
      },
      temp: {
        id: null,
        catName: '',
        catLevel: '',
        parentId: ''
      },
      rules: {
        catName: [{ required: true, message: '名称不能为空', trigger: 'change' }],
        orderBy: [{ required: true, message: '排序字段不能为空', trigger: 'blur' }]
      }
    }
  },
  components: {
    CategorySet
  },
  created() {
    this._getCatList(this.queryParam)
  },
  methods: {
    _getCatList(params) {
      getCatList(params).then(res => {
        this.tableData = res.data
        this.dataCard1 = res.data.filter((item) => {
          return item.catLevel === '1'
        })
        this.dataLevel2 = res.data.filter((item) => {
          return item.catLevel === '2'
        })
        this.dataLevel3 = res.data.filter((item) => {
          return item.catLevel === '3'
        })
        this.loadChild('1', this.dataCard1[0].id, 0)
      })
    },
    loadChild(level, code, index) {
      const _this = this
      switch (level) {
        case '1':
          this.dataCard2 = this.dataLevel2.filter((item) => {
            return item.parentId === code
          })
          if (this.dataCard2.length > 0) {
            this.dataCard3 = this.dataLevel3.filter((item) => {
              return item.parentId === this.dataCard2[0].id
            })
          } else {
            this.dataCard3 = []
          }
          break
        case '2':
          this.dataCard3 = this.dataLevel3.filter((item) => {
            return item.parentId === code
          })
          break
      }
      this.$nextTick(() => {
        _this._changeActive(level, index)
      })
    },
    _changeActive(level, index) {
      const cnt = parseInt(level)
      for (let i = cnt; i <= 3; i++) {
        // 设置高亮
        const l = 'level' + i
        if (this.$refs[l]) {
          this.$refs[l].forEach((item) => {
            item.classList.remove('active')
          })
          if (i === cnt) {
            this.$refs[l][index].classList.add('active')
          } else {
            if (this.$refs[l][0]) {
              this.$refs[l][0].classList.add('active')
            }
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
            this[lv] = this[dc][index].id
          } else {
            if (this[dc] && this[dc].length > 0) {
              this[lv] = this[dc][0].id
            } else {
              this[lv] = ''
            }
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
    handlerSet(item) {
      this.leafId = item.id
      this.dialogSetVisible = true
    },
    handlerDel(id) {
      MessageBox.confirm('您确定要删除该记录吗', '提示', {
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delCat(id).then((res) => {
          Message({
            message: res.msg,
            type: 'success',
            duration: 3 * 1000
          })
          this._getCatList(this.queryParam)
        })
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
.cus-dialog{
  overflow: auto;
  height: 700px;
}
</style>
