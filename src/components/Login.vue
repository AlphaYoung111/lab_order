<template>
  <div class="login">
    <div class="bg_img">
      <img src="https://ae01.alicdn.com/kf/Hb256065b233c46a4b55a4dc9a42749f5n.jpg" alt />
      <el-card class="login_place">
        <!-- 表单 -->
        <el-form
          :model="loginForm"
          :rules="loginFormRules"
          ref="loginFormRef"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="用户名" prop="account" label-width="120px" label-position="right">
            <el-input v-model.number="loginForm.account" clearable></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password" label-width="120px" label-position="right">
            <el-input type="password" v-model="loginForm.password" clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="loginUp">登录</el-button>
            <el-button type="info" @click="resetForm">重置</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>
<script>
export default {
  name: 'login',
  data() {
    return {
      loginForm: {
        account: null,
        password: ''
      },
      loginFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    }
  },
  created(){
    window.sessionStorage.clear()
  },
  methods: {
    loginUp() {
      this.$refs.loginFormRef.validate(valid => {
        if (!valid) {
          return this.$message.error('请正确填写登录信息')
        }
        this.$http.post('/login', this.loginForm).then(res => {
          if (res.data.login_status === false)
            return this.$message.error('账号或密码不正确')
          const token = res.data._id
          const username = res.data.username
          const isAdmin = res.data.isAdmin
          window.sessionStorage.setItem('token', token)
          window.sessionStorage.setItem('username', username)
          window.sessionStorage.setItem('isAdmin', isAdmin)
          this.$message.success('登录成功')
          if (isAdmin === true) {
            this.$router.push('/admin')
          } else {
            this.$router.push('/common')
          }
        })
      })
    },
    resetForm() {
      this.$refs.loginFormRef.resetFields()
    }
  }
}
</script>
<style scoped>
.login {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  /* flex-direction: column; */
  display: flex;
  justify-content: center;
  background-color: rgb(194, 227, 247);
  align-items: center;
}
.bg_img {
  width: 100vw;
  height: auto;
  margin-top: 20px;
  position: relative;
}
.bg_img img {
  width: 100%;
  height: auto;
  opacity: 0.7;
}
.el-form {
  width: 80%;
  margin: 20px auto;
}
.el-input {
  width: 90%;
}
.el-card {
  position: absolute;
  top: 90%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgb(243, 109, 109);
  width: 50%;
  margin: 15px auto;
  border-radius: 25px;
}
.el-form-item {
  text-align: center;
}
.el-button {
  margin-right: 20px;
}

</style>