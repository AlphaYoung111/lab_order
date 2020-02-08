<template>
  <div>
    <el-card>
      <!-- 验证表单 -->
      <el-form
        :model="orderForm"
        :rules="orderFormRules"
        ref="orderFormRef"
        label-width="120px"
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
      </el-form>
    </el-card>
  </div>
</template>
<script>
export default {
  name: 'roomitem',
  data() {
    var termWeek = (rule, val, cb) => {
      if (val > this.totalWeek || val < this.totalWeek) {
        return cb(new Error(`请输入1 ~ ${this.totalWeek} 周`))
      } else {
        return cb()
      }
    }
    return {
      room_id: null,
      // 申请表单的数据
      orderForm: {
        week: 1,
        day: '',
        classBetween: null,
        isTeacher: false,
        num: null
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
        num: [{ required: true, message: '请选择人数', trigger: 'blur' }]
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
    getRoomItem() {
      this.room_id = this.$route.params.id
    },
    daySelect() {
      // console.log(this.orderForm.day)
    }
  }
}
</script>
<style scoped>
.el-card {
  margin: 30px;
}
.el-input {
  width: 300px;
}
</style>