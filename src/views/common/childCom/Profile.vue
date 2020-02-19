<template>
  <div>
    <!-- 选项卡 -->
    <el-tabs type="border-card">
      <el-tab-pane>
        <span slot="label">
          <i class="el-icon-key"></i> 修改密码
        </span>
        <!-- 修改密码的表单 -->
        <el-form
          :model="accountForm"
          :rules="accountFormRule"
          ref="accountFormRef"
          label-position="right"
          label-width="200px"
        >
          <el-form-item label="当前账户:">
            <div class="account">{{accountForm.account}}</div>
          </el-form-item>
          <el-form-item label="新的密码" prop="password">
            <el-input v-model="accountForm.password" type="password" placeholder="请输入新的密码"></el-input>
          </el-form-item>
          <el-form-item label="再次输入新密码" prop="confirmPw">
            <el-input v-model="accountForm.confirmPw" type="password" placeholder="请再次输入密码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="checkChange">确定</el-button>
            <el-button type="info" @click="resetForm">重置</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label">
          <i class="el-icon-bell"></i> 我的预约
        </span>
        <!-- 我的预约 -->
        <el-table :data="myOrderData" style="width: 100%" border stripe max-height="600">
          <el-table-column align="center" prop="create_date" label="申请时间" min-width="120px"></el-table-column>
          <el-table-column align="center" prop="room_place" label="教室号"></el-table-column>
          <el-table-column align="center" prop="week" label="周数"></el-table-column>
          <el-table-column align="center" label="星期数">
            <template slot-scope="scope">{{scope.row.day | dayForm}}</template>
          </el-table-column>
          <el-table-column align="center" prop="classBetween" label="时间段" min-width="150px">
            <template slot-scope="scope">{{scope.row.classBetween | lessonForm}}</template>
          </el-table-column>
          <el-table-column align="center" prop="num" label="人数"></el-table-column>
          <el-table-column align="center" prop="tel" label="联系电话" min-width="150px"></el-table-column>
          <el-table-column align="center" prop="isCheck" label="审核状态" min-width="150px">
            <template slot-scope="scope">
              <el-tag type="success" effect="dark" v-if="scope.row.isCheck">审批成功</el-tag>
              <el-tag type="warning" effect="dark" v-else>审批中</el-tag>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'profile',
  data() {
    var confirmRul = (rule, val, cb) => {
      if (
        this.$data.accountForm.password === this.$data.accountForm.confirmPw
      ) {
        return cb()
      } else {
        return cb(new Error('两次密码输入不一致'))
      }
    }
    return {
      // 个人信息
      accountForm: {
        account: '1111111',
        password: '',
        confirmPw: ''
      },
      myOrderData: null,
      // 修改密码验证规则
      accountFormRule: {
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur' }
        ],
        confirmPw: [
          {
            validator: confirmRul,
            required: true,
            message: '请再次输入密码',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  created() {
    const account = window.sessionStorage.getItem('account')
    this.accountForm.account = account
    console.log(account)

    this.getMyOrder()
  },
  methods: {
    // 确认修改密码
    checkChange() {
      this.$refs.accountFormRef.validate(valid => {
        if (!valid) {
          return this.$message.error('请修改错误项')
        }
        this.$http.put('/reset_pw', this.accountForm)
        this.$message.success('修改密码成功')
      })
    },
    // 重置表单
    resetForm() {
      this.$refs.accountFormRef.resetFields()
    },
    // 获取个人的预定信息
    getMyOrder() {
      this.$http.get(`/order/${Number(this.accountForm.account)}`).then(res => {
        this.myOrderData = res.data
      })
    }
  }
}
</script>
<style scoped>
.el-tabs {
  margin: 20px 30px;
  font-size: 20px;
}
.el-tabs__item {
  font-size: 20px;
}
.el-form {
  /* border: 1px solid red; */
  width:600px;
  margin: 10px auto;
  font-size: 20px;
}
.account {
  font-size: 20px;
}
.el-input {
  width: 90%;
}
.el-table-column {
  min-height: 60px;
}
.el-table {
  font-size: 16px;
}
.el-switch {
  font-size: 18px;
}
</style>