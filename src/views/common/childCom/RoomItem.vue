<template>
  <div>
    <el-card>
      <el-alert title="提交成功后，会自动跳转实验室分类界面" type="info" center show-icon :closable="false"></el-alert>
      <el-alert title="为了保证数据准确，请按照表格顺序进行填写" type="warning" center show-icon :closable="false"></el-alert>
      <!-- 验证表单 -->
      <el-form
        :model="orderForm"
        :rules="orderFormRules"
        ref="orderFormRef"
        label-width="160px"
        class="demo-ruleForm"
        label-position="left"
      >
        <!-- 周数 -->
        <el-form-item label="本学期第几周" prop="week">
          <el-input v-model.number="orderForm.week" clearable @change="weekTypeIn"></el-input>
        </el-form-item>
        <!-- 星期 -->
        <el-form-item label="星期几" prop="day">
          <el-select v-model="orderForm.day" placeholder="请选择" @change="daySelect">
            <el-option v-for="(item,index) in dayOptions" :key="index" :label="item" :value="item">
              <span style="float: left">{{item | dayForm}}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <!-- 节数 -->
        <el-form-item label="具体节数" prop="classBetween">
          <el-select v-model="orderForm.classBetween" placeholder="请选择" @change="classSelect">
            <el-option
              v-for="(lesson,i1) in classOptions"
              :key="i1"
              :label="lesson"
              :value="lesson"
            >
              <span style="float: left">{{lesson | lessonForm}}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <!-- 实验室剩余空位 -->
        <el-form-item label="剩余空位" label-width="120" v-show="orderForm.classBetween!==null">
          <div class="left_num">{{canOrderNum + '/' + total}}</div>
        </el-form-item>
        <!-- 教师选择人数 -->
        <el-form-item label="申请人数" prop="num" v-if="orderForm.isTeacher">
          <el-select v-model="orderForm.num" placeholder="请选择">
            <el-option
              v-for="(tea,i2) in teaChoice"
              :key="i2"
              :label="tea.label"
              :value="tea.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- 学生选择人数 -->
        <el-form-item label="申请人数" prop="num" v-else>
          <el-select v-model="orderForm.num" placeholder="请选择">
            <el-option
              v-for="(stu,i3) in stuChoice"
              :key="i3"
              :label="stu.label"
              :value="stu.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- 手机号码 -->
        <el-form-item label="手机号码" prop="tel">
          <el-input v-model="orderForm.tel" placeholder="请输入用于通知的手机号码" clearable></el-input>
        </el-form-item>
        <!-- 提交 重置 -->
        <el-form-item>
          <el-button type="primary" @click="sendOrder">提交</el-button>
          <el-button type="info" @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
// import { mapActions } from 'vuex'
export default {
  name: 'roomitem',
  data() {
    //周数验证规则
    var termWeek = (rule, val, cb) => {
      if (val <= this.$data.totalWeek && val >= 1) {
        return cb()
      } else {
        return cb(new Error(`请输入1 ~ ${this.$data.totalWeek} 周`))
      }
    }
    // 手机号码验证
    var telRule = (rule, val, cb) => {
      const telReg = /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/
      if (telReg.test(val)) {
        return cb()
      } else {
        return cb(new Error('请输入正确的手机号码'))
      }
    }
    return {
      // room_id: null,
      // 申请表单的数据
      orderForm: {
        week: null,
        day: '',
        classBetween: null,
        isTeacher: false,
        num: null,
        tel: null,
        isCheck: false,
        room_id: null,
        create_date: '',
        username: null,
        account: null,
        room_place: null
      },
      total: null,
      totalWeek: 20,
      orderFormRules: {
        week: [
          {
            required: true,
            // message: '请输入周数',
            trigger: 'blur',
            validator: termWeek
          }
        ],
        day: [{ required: true, message: '请选择星期', trigger: 'blur' }],
        classBetween: [
          { required: true, message: '请选择具体节数', trigger: 'blur' }
        ],
        num: [{ required: true, message: '请选择人数', trigger: 'blur' }],
        tel: [
          {
            required: true,
            trigger: 'blur',
            validator: telRule
          }
        ]
      },
      // 学生人数选项
      stuChoice: [
        { value: '1', label: '1' },
        { value: '2', label: '2' },
        { value: '3', label: '3' }
      ],
      // 老师人数选项
      teaChoice: [
        { value: '5', label: '5' },
        { value: '99', label: '全班' }
      ],
      // 具体周数的详细数据
      dayOptions: [],
      // 选择周数后的所有时间
      classData: null,
      // 选择天数后的实践
      classOptions: null,
      // 实验室已使用的订单
      leftData: null,
      // 已使用的数量
      canOrderNum: 0
    }
  },
  created() {
    this.getRoomItem()
    this.total = this.$route.params.total
    const account = window.sessionStorage.getItem('account')
    this.orderForm.account = account
    this.orderForm.create_date = this.getCreateDate()
    const username = window.sessionStorage.getItem('username')
    this.orderForm.username = username
    const building = window.sessionStorage.getItem('building')
    const room_place = window.sessionStorage.getItem('room_place')
    this.orderForm.room_place = building + room_place
  },
  methods: {
    // ...mapActions,
    getRoomItem() {
      this.orderForm.room_id = this.$route.params.id
      const isTeacher = window.sessionStorage.getItem('isTeacher')
      if (isTeacher === 'false' || isTeacher == '0') return
      this.orderForm.isTeacher = true
    },
    // 数组去重
    arrayUnique(arr) {
      return Array.from(new Set(arr))
    },
    // 输入具体周数后
    weekTypeIn() {
      this.$http.get(`/free_time/${this.orderForm.week}/${this.orderForm.room_id}` ).then(res => {
        // this.dayOptions = res.data[0].day_options
        // this.classData = res.data[0].class_options
        this.classData = res.data
        const arr = res.data.map(item => item.day)
        const op = this.arrayUnique(arr)
        this.dayOptions = op
      })
    },
    // 选择星期几
    daySelect() {
      const day = this.orderForm.day
      let orderDay = this.classData.filter(item => item.day == day)
      const arr = orderDay.map(item => item.classBetween)
      this.classOptions = arr
    },
    // 周数选择好后
    classSelect() {
      this.$http.post('/check_seat', this.orderForm).then(res => {
        if (res.data.length == 0) {
          this.canOrderNum = this.total
        } else {
          this.leftData = res.data
          let used_num = this.leftData.reduce((acc, cur) => {
            return acc + Number(cur.num)
          }, 0)
          if (used_num >= this.total) {
            this.canOrderNum = 0
          } else {
            this.canOrderNum = this.total - used_num
          }
        }
      })
    },
    // 提交申请
    sendOrder() {
      this.$refs.orderFormRef.validate(valid => {
        if (!valid) {
          return this.$message.error('请修改报错选项')
        }
        this.$http.post('/order', this.orderForm).then(res => {
          if (res.status !== 200) {
            return this.$message.error('预约失败')
          }
          this.$message.success('申请成功！请等待审批。')
          window.sessionStorage.removeItem('building')
          window.sessionStorage.removeItem('room_place')
          setTimeout(() => {
            this.$router.push('/common/all_cate')
          }, 2000)
        })
      })
    },
    // 重置表单
    resetForm() {
      this.$refs.orderFormRef.resetFields()
    },
    // 获取创建预约的时间
    getCreateDate() {
      let today = ''
      let date = new Date()
      let y = date.getFullYear()
      let m = (date.getMonth() + 1 + '').padStart(2, '0')
      let d = (date.getDate() + '').padStart(2, '0')
      today = `${y}-${m}-${d}`
      return today
    }
  }
}
</script>
<style scoped>
.el-card {
  margin: 70px auto;
  width: 95%;
}
.el-input {
  width: 300px;
}
.el-form {
  width: 500px;
  height: auto;
  margin: 20px auto;
  /* border: 1px solid red; */
}
.el-form-item {
  margin-bottom: 30px;
}
.el-button {
  margin-right: 20px;
}
.el-dialog div {
  text-align: center;
}
.el-alert {
  margin-bottom: 15px;
}
.left_num {
  padding-left: 250px;
  font-size: 20px;
}
</style>