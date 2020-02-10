<template>
  <div>
    <el-card>
      <el-alert title="提交成功后，会自动跳转实验室分类界面" type="info" center show-icon :closable="false"></el-alert>
      <!-- 验证表单 -->
      <el-form
        :model="orderForm"
        :rules="orderFormRules"
        ref="orderFormRef"
        label-width="160px"
        class="demo-ruleForm"
        label-position="right"
      >
        <!-- 周数 -->
        <el-form-item label="本学期第几周" prop="week">
          <el-input v-model.number="orderForm.week" clearable></el-input>
        </el-form-item>
        <!-- 星期 -->
        <el-form-item label="星期几" prop="day">
          <el-select v-model="orderForm.day" placeholder="请选择" @change="daySelect">
            <el-option
              v-for="(item,index) in options"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- 节数 -->
        <el-form-item label="具体节数" prop="classBetween">
          <el-select v-model="orderForm.classBetween" placeholder="请选择">
            <el-option
              v-for="(lesson,i1) in classOptions"
              :key="i1"
              :label="lesson.label"
              :value="lesson.value"
            ></el-option>
          </el-select>
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
import { mapActions } from 'vuex'
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
        room_id:null,
        create_date:''
      },
      totalWeek: 5,
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
      // 星期选项数据
      options: [
        { value: '01', label: '星期一' },
        { value: '02', label: '星期二' },
        { value: '03', label: '星期三' },
        { value: '04', label: '星期四' },
        { value: '05', label: '星期五' },
        { value: '06', label: '星期六' },
        { value: '07', label: '星期日' }
      ],
      //节数选项数据
      classOptions: [
        { value: '0102', label: '第 1 ~ 2 节课' },
        { value: '0304', label: '第 3 ~ 4 节课' },
        { value: '0506', label: '第 5 ~ 6 节课' },
        { value: '0708', label: '第 7 ~ 8 节课' },
        { value: '0911', label: '第 9 ~ 11 节课' }
      ],
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
      ]
    }
  },
  created() {
    this.getRoomItem()
  },
  methods: {
    ...mapActions,
    getRoomItem() {
      this.orderForm.room_id = this.$route.params.id
    },
    daySelect() {
      // console.log(this.orderForm.day)
    },
    // 提交申请
    sendOrder() {
      this.$refs.orderFormRef.validate(valid => {
        if (!valid) {
          return this.$message.error('请修改报错选项')
        }
        const item = this.orderForm
        this.$store.dispatch('addOrder', item)
        this.$message.success('申请成功！请等待审批。')
        const today = this.getCreateDate()
        this.orderForm.create_date = today
        setTimeout(() => {
          this.$router.push('/common/all_cate')
        }, 2000)
      })
    },
    // 重置表单
    resetForm() {
      this.$refs.orderFormRef.resetFields()
    },
    // 获取创建预约的时间
    getCreateDate(){
      let today = ''
      let date = new Date()
      let y = date.getFullYear()
      let m = (date.getMonth()+1+'').padStart(2,'0')
      let d = (date.getDay()+'').padStart(2,'0')
      return today = `${y}-${m}-${d}`
    }
  }
}
</script>
<style scoped>
.el-card {
  margin: 70px auto;
  width: 80%;
}
.el-input {
  width: 300px;
}
.el-form {
  width: 70%;
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
</style>