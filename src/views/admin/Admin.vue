<template>
  <div class="admin">
    <!-- 头部区域 -->
    <nav-top></nav-top>
    <!-- 左边控制栏 -->
    <el-menu
      :default-active="currentIndex"
      class="el-menu-vertical-demo"
      background-color="#525f7f"
      text-color="#fff"
      active-text-color="#F9F900"
      unique-opened
      router
    >
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>实验申请</span>
        </template>
        <el-menu-item index="/approve_order">我的审批</el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-user"></i>
          <span>课表相关</span>
        </template>
        <el-menu-item index="/lesson_table">课表管理</el-menu-item>
      </el-submenu>
    </el-menu>
    <!-- 右边显示区域 -->
    <div class="router_place">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import NavTop from '@/components/NavTop'

export default {
  name: 'admin',
  components: {
    NavTop
  },
  data() {
    return {
      currentIndex: ''
    }
  },
  created() {
    this.getRoute()
  },
  methods: {
    getRoute() {
      this.currentIndex = this.$route.path
    }
  }
}
</script>
<style scoped>
.admin {
  width: 100%;
  height: 100%;
  background-color: #eee;
  overflow: hidden;
  /* display:flex; */
}
.el-menu {
  border-right: 0px;
  height: calc(100% - 100px);
  width: 300px;
  float: left;
}
.router_place {
  width: calc(100% - 300px);
  height: calc(100% - 100px);
  float: right;
}
</style>