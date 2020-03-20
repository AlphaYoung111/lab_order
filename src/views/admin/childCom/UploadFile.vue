<template>
  <div class="upload_file">
    <el-tabs v-model="activeName" type="card">
      <!-- 学生数据添加 -->
      <el-tab-pane label="学生数据" name="student">
        <el-alert
          title="请根据下方表格的格式来上传文件"
          type="info"
          center
          show-icon
        ></el-alert>

        <el-upload
          class="upload-demo"
          action="http://localhost:33301"
          :on-change="handleStudentChange"
          :on-remove="handleStudentRemove"
          :on-exceed="handleStudentExceed"
          :limit="limitUpload"
          accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
          :auto-upload="false"
          ref="stdUploadRef"
        >
          <el-button type="info" style="margin-top:20px;">选择文件</el-button>
        </el-upload>
        <el-button type="primary" size="medium" class="upload_btn" @click="uploadStd"
          >上传文件</el-button
        >
        <el-main>
          <el-table border stripe :data="stdArr" max-height="700">
            <el-table-column type="index"></el-table-column>
            <el-table-column prop="account" label="学号"></el-table-column>
            <el-table-column prop="username" label="用户名"></el-table-column>
            <el-table-column prop="password" label="密码"></el-table-column>
            <el-table-column
              prop="isAdmin"
              label="是否为管理员"
            ></el-table-column>
            <el-table-column
              prop="isTeacher"
              label="是否为老师"
            ></el-table-column>
          </el-table>
        </el-main>
      </el-tab-pane>
      <el-tab-pane label="实验室数据" name="new_lab" class="lab">
        <el-select v-model="labValue" placeholder="请选择" @change="selectCate">
          <el-option
            v-for="item in options"
            :key="item.cate_name"
            :label="item.cate_name"
            :value="item.cate_id"
          >
          </el-option>
        </el-select>
        <el-input
          v-model="cateObj.cate_name"
          placeholder="请输入新的实验室分类"
          v-show="labValue == 0"
        ></el-input>
        <el-form
          :model="roomObj"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="教学楼" prop="building">
            <el-input v-model="roomObj.building"></el-input>
          </el-form-item>
          <el-form-item label="教室" prop="room_place">
            <el-input v-model="roomObj.room_place"></el-input>
          </el-form-item>
          <el-form-item label="总容量" prop="total">
            <el-input v-model.number="roomObj.total"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary" @click="uploadLab">点击上传</el-button>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  data() {
    return {
      limitUpload: 1,
      fileTemp: null,
      file: null,
      stdArr: [],
      stdLen: 0,
      activeName: 'student',
      labValue: null,
      options: [],
      // 选择其他后填写的实验室名
      // 房间提交对象
      roomObj: {
        cate_id: null,
        room_id: null,
        building: null,
        room_place: null,
        total: null,
        seat_left: null
      },
      cateObj: {
        cate_id: null,
        cate_name: null
      },
      // 校验规则
      rules: {
        building: [
          { required: true, message: '请输入教学楼名称', trigger: 'blur' }
        ],
        room_place: [
          { required: true, message: '请输入教室名称', trigger: 'blur' }
        ],
        total: [
          { required: true, message: '请输入教室总容量', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getAllCate()
  },
  updated() {
    // console.log(this.options)
  },
  methods: {
    async getAllCate() {
      let res = await this.$http.get('/all_cate')
      this.options = [...res.data, { cate_name: '其他', cate_id: 0 }]
    },
    selectCate() {
      if (this.labValue != 0) {
        this.$http.get('/room/' + this.labValue).then(res => {
          this.roomObj.cate_id = this.labValue
          this.roomObj.room_id =
            this.labValue + (res.data.length + 100).toString()
        })
      } else {
        this.roomObj.cate_id = (this.options.length + 9).toString()
        this.cateObj.cate_id = (this.options.length + 9).toString()
        this.roomObj.room_id = (this.options.length + 9).toString() + '100'
      }
    },
    uploadLab() {
      this.roomObj.seat_left = this.roomObj.total
      if(this.labValue!=0){
        this.$http.post('/add_room',this.roomObj)
      }else{
        this.$http.post('/add_room',this.roomObj)
        this.$http.post('/add_cate',this.cateObj)
      }
    },
    uploadStd(){
      this.$http.post('/add_account',this.stdArr)
    },
    handleStudentChange(file, fileList) {
      this.fileTemp = file.raw
      if (this.fileTemp) {
        if (
          this.fileTemp.type ==
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
          this.fileTemp.type == 'application/vnd.ms-excel'
        ) {
          this.importStd(this.fileTemp)
        } else {
          this.$message({
            type: 'warning',
            message: '附件格式错误，请删除后重新上传！'
          })
        }
      } else {
        this.$message({
          type: 'warning',
          message: '请上传附件！'
        })
      }
    },
    handleStudentExceed() {
      this.$message({
        type: 'warning',
        message: '超出最大上传文件数量的限制！'
      })
      return
    },
    handleStudentRemove(file, fileList) {
      this.fileTemp = null
    },
    importStd(obj) {
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
          outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]) //outdata就是你想要的东西

          console.log(outdata)
          //此处可对数据进行处理
          // let arr = [];
          // outdata.map(v => {
          //     let obj = {}
          //     obj.account = v['学号']
          //     obj.username = v['用户名']
          //     obj.password = v['密码']
          //     obj.isAdmin = v['是否为管理员']
          //     obj.isTeacher = v['是否为老师']
          //     arr.push(obj)
          // });
          // _this.stdArr=arr;
          // _this.stdLen=arr.length;
          // return arr;
          _this.stdOptions(outdata)
        }
        reader.readAsArrayBuffer(f)
      }
      if (rABS) {
        reader.readAsArrayBuffer(f)
      } else {
        reader.readAsBinaryString(f)
      }
    },
    stdOptions(item) {
      let arr = []
      item.map(v => {
        let obj = {}
        obj.account = v['学号']
        obj.username = v['用户名']
        obj.password = v['密码']
        obj.isAdmin = v['是否为管理员']
        obj.isTeacher = v['是否为老师']
        arr.push(obj)
      })
      this.stdArr = arr
      this.stdLen = arr.length
      return arr
    },
    
  }
}
</script>
<style scoped>
.el-tabs {
  margin: 10px;
  background-color: #fff;
  padding: 10px;
}
.el-alert {
  margin-top: 20px;
}

.upload_btn {
  float: right;
  margin-bottom: 20px;
  margin-top: 20px;
}
.lab {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.el-form {
  margin: 0 auto;
}
.el-form .el-input {
  width: 300px;
}
.el-select,
.el-input {
  width: 50%;
  margin-bottom: 20px;
}
</style>
