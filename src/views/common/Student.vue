<template>
  <div class="student">
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
          <span>实验室</span>
        </template>
        <el-menu-item index="/common/all_cate">实验室分类</el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-user"></i>
          <span>个人中心</span>
        </template>
        <el-menu-item index="/common/profile">我的账户</el-menu-item>
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
  name: 'student',
  components: {
    NavTop
  },
  data() {
    return {
      currentIndex:'',
    }
  },
  created(){
    this.getRoute()
  },
  methods:{
    getRoute(){
      this.currentIndex = this.$route.path
    }
  }
}
</script>
<style scoped>
.student {
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