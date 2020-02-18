<template>
  <div>
    <el-card>
      
          <el-alert title="请选择下方时间，查看该天申请数据" type="info" show-icon center :closable="false"></el-alert>

          <!-- 时间选择 -->
          <el-date-picker
            v-model="date"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
            @change="dateChange"
          ></el-date-picker>
          <el-button type="primary" @click="resetDate">重置日期</el-button>
          <el-button type="info" @click="exportExl">导出表格</el-button>

          <!-- 表格位置 -->
          <el-table :data="dataToShow" style="width: 100%" border stripe max-height="550">
            <el-table-column type="index"></el-table-column>
            <el-table-column align="center" prop="create_date" label="申请时间"></el-table-column>
            <el-table-column align="center" prop="room_place" label="教室号"></el-table-column>
            <el-table-column align="center" prop="username" label="申请人"></el-table-column>
            <el-table-column align="center" prop="account" label="学号"></el-table-column>
            <el-table-column align="center" prop="week" label="周数" min-width="50px"></el-table-column>
            <el-table-column align="center" label="星期数">
              <template slot-scope="scope">{{scope.row.day | dayForm}}</template>
            </el-table-column>
            <el-table-column align="center" prop="classBetween" label="时间段" min-width="100px">
              <template slot-scope="scope">{{scope.row.classBetween | lessonForm}}</template>
            </el-table-column>
            <el-table-column align="center" prop="num" label="人数" min-width="50px"></el-table-column>
            <el-table-column align="center" prop="tel" label="联系电话" min-width="120px"></el-table-column>
            <el-table-column align="center" prop="isCheck" label="审核状态" min-width="100px">
              <template slot-scope="scope">
                <el-tag type="success" effect="dark" v-if="scope.row.isCheck">审批成功</el-tag>
                <el-tag type="warning" v-else>审批中</el-tag>
              </template>
            </el-table-column>
          </el-table>
    </el-card>
  </div>
</template>
<script>
export default {
  name: 'lessontable',
  data() {
    return {
      date: '',
      fileTemp: null,
      file: null,
      da: [],
      dalen: 0,
      activeName: 'first',
      test: '2020-02-10',
      // 假数据
      orderData: [],
      bridgeArr: [],
      dateArr: null
    }
  },
  computed: {
    // 展示的表格
    dataToShow() {
      if (this.date === '') {
        return this.orderData
      } else {
        return this.dateArr
      }
    },
    // 导出的表格名称
    exportName() {
      if (this.data === '') {
        return '本学期实验室预约情况表'
      } else {
        return `${this.date}  实验室预约情况表`
      }
    }
  },
  created() {
    this.getAgreeData()
  },
  methods: {
    dateChange() {
      this.$http.get(`/date_order/${this.date}`).then(res => {
        this.dateArr = res.data
      })
    },
    // 获取所有的订单
    getAgreeData() {
      this.$http.get('/all_order').then(res => {
        this.orderData = res.data
      })
    },
    // 读取方法
    importfxx(obj) {
      let _this = this
      let inputDOM = this.$refs.inputer
      // 通过DOM取文件数据

      this.file = event.currentTarget.files[0]

      var rABS = false //是否将文件读取为二进制字符串
      var f = this.file

      var reader = new FileReader()
      //if (!FileReader.prototype.readAsBinaryString) {
      FileReader.prototype.readAsBinaryString = function(f) {
        var binary = ''
        var rABS = false //是否将文件读取为二进制字符串
        var pt = this
        var wb //读取完成的数据
        var outdata
        var reader = new FileReader()
        reader.onload = function(e) {
          var bytes = new Uint8Array(reader.result)
          var length = bytes.byteLength
          for (var i = 0; i < length; i++) {
            binary += String.fromCharCode(bytes[i])
          }
          //此处引入，用于解析excel
          var XLSX = require('xlsx')
          if (rABS) {
            wb = XLSX.read(btoa(fixdata(binary)), {
              //手动转化
              type: 'base64'
            })
          } else {
            wb = XLSX.read(binary, {
              type: 'binary'
            })
          }
          outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]])
          // 注释
          //outdata就是读取的数据（不包含标题行即表头，表头会作为对象的下标）
          //此处可对数据进行处理
          let arr = []
          outdata.map(v => {
            let obj = {}
            obj.code = v['Code']
            obj.name = v['Name']
            obj.pro = v['province']
            obj.cit = v['city']
            obj.dis = v['district']
            arr.push(obj)
          })
          _this.da = arr
          _this.dalen = arr.length
          // 注释
          return arr
        }
        reader.readAsArrayBuffer(f)
      }
      if (rABS) {
        reader.readAsArrayBuffer(f)
      } else {
        reader.readAsBinaryString(f)
      }
    },
    // 重置时间
    resetDate() {
      this.date = ''
    },
    // 导出表格
    exportExl() {
      require.ensure([], () => {
        const { export_json_to_excel } = require('@/excel/Export2Excel')
        const tHeader = [
          '申请时间',
          '教室号',
          '申请人',
          '学号',
          '周数',
          '星期数',
          '时间段',
          '人数',
          '联系电话',
          '审核状态'
        ] // 设置Excel的表格第一行的标题
        const filterVal = [
          'create_date',
          'room_place',
          'username',
          'account',
          'week',
          'day',
          'classBetween',
          'num',
          'tel',
          'isCheck'
        ] // index、nickName、name是tableData里对象的属性
        const list = this.dataToShow //把data里的tableData存到list
        const data = this.formatJson(filterVal, list)
        export_json_to_excel(tHeader, data, this.exportName) //导出Excel 文件名
      })
    },
    // 导出表格子方法
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    }
  }
}
</script>
<style scoped>
.el-tab-pane {
  text-align: center;
}
.el-alert {
  margin: 20px;
}
.el-table {
  margin: 15px 0px;
}
.el-button {
  margin-left: 15px;
}
</style>