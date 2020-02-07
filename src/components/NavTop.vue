<template>
  <div id="nav_top">
    <el-row class="nav_place">
      <el-col style="margin-left:80px">
        <div class="title">
          <img src="@/assets/img/logo.png" alt />
          <div class="title_text">实验室预约系统</div>
        </div>
      </el-col>
      <el-col class="exit_button" :span="3">
        <el-button type="danger">退出登录</el-button>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: "navtop"
};
</script>
<style scoped>
.nav_place {
  height: 100px;
  width: 100vw;
  background-color: rgba(201, 10, 20, 0.877);
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.nav_place img {
  width: 85px;
  height: 70px;
}
.title {
  display: flex;
  align-items: center;
}
.title_text {
  font-size: 30px;
  color: #eee;
  margin-left: 20px;
  font-weight: 500;
}
</style>