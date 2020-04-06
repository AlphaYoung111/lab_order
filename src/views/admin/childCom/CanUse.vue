<template>
  <div>
    <el-card>
      <el-alert title="请选择具体的实验室教室后在上传表格" type="info" show-icon center :closable="false"></el-alert>
      <el-form :model="freetime" ref="form">
        <el-form-item label="实验室种类" placeholder="请选择实验室种类">
          <el-select v-model="freetime.cate_id" @change="getRoom">
            <el-option
              v-for="item in optionsCate"
              :key="item.cate_id"
              :label="item.cate_name"
              :value="item.cate_id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="实验室" placeholder="请选择实验室">
          <el-select v-model="freetime.room_id">
            <el-option
              v-for="item in optionsRoom"
              :key="item.room_id"
              :label="item.building + item.room_place"
              :value="item.room_id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label>
          <el-upload
            class="upload-demo"
            action="http://localhost:33301"
            :on-change="handleStudentChange"
            :on-remove="handleStudentRemove"
            :on-exceed="handleStudentExceed"
            :limit="1"
            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            :auto-upload="false"
            ref="stdUploadRef"
          >
            <el-button type="info" style="margin-top:20px;">选择文件</el-button>
          </el-upload>
          <el-button type="primary" size="medium" style="margin-top:20px;" class="upload_btn" @click="uploadStd">上传文件</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      freetime: {
        cate_id: null,
        room_id: null
      },
      optionsCate: [],
      optionsRoom: [],
      stdArr: null,
      stdLen: null
    }
  },
  created() {
    this.getCate()
  },
  methods: {
    async getCate() {
      const { data } = await this.$http.get('/all_cate')
      this.optionsCate = data
    },
    async getRoom() {
      const { data } = await this.$http.get('/room/' + this.freetime.cate_id)
      this.optionsRoom = [...data]
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
    handleStudentRemove(file, fileList) {
      this.fileTemp = null
    },
    handleStudentExceed() {
      this.$message({
        type: 'warning',
        message: '超出最大上传文件数量的限制！'
      })
      return
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
    uploadStd() {
      this.$http.post('/free_time/' + this.freetime.room_id, this.stdArr)
      this.freetime.cate_id = null
      this.freetime.room_id =null
       this.$message({
        type:'success',
        message:'提交成功'
      })
    },
    stdOptions(item) {
      let arr = []
      item.map(v => {
        let obj = {}
        obj.week = v['周数']
        obj.day = v['星期']
        obj.classBetween = v['节数']
        arr.push(obj)
      })
      this.stdArr = arr
      this.stdLen = arr.length
      return arr
    }
  }
}
</script>
<style scoped>
.el-card {
  margin: 20px;
}
.el-form {
  margin: 25px auto;
  width: 70%;
  border: 1px solid #eee;
  box-shadow: 0 0 18px #ccc;
  text-align: center;
  display: flex;
  flex-direction: column;
}
.el-form-item {
  margin: 10px auto;
}
</style>