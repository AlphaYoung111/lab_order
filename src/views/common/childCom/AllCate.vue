<template>
  <div class="all_cate">
    <el-card class="cate_place">
      <div class="cate_title">实验室分类</div>
      <el-row>
        <el-col :span="6" v-for="item in all_cate" :key="item.id">
          <el-card shadow="hover">
            <div @click="goDetailRoom(item.id,item.name)">{{item.name}}</div>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>
<script>
export default {
  name: 'allcate',
  data() {
    return {
      all_cate: [
        { id: 10, name: '实验室一' },
        { id: 11, name: '实验室二' },
        { id: 12, name: '实验室三' },
        { id: 13, name: '实验室四' },
        { id: 14, name: '实验室五' },
      ]
    }
  },
  methods: {
    // 跳转指定教室的方法
    goDetailRoom(id) { 
      this.$router.push('/common/detail_room/' + id)
    }
  }
}
</script>
<style scoped>
.all_cate {
  text-align: center;
  margin: 60px 100px;
}
.el-row {
  margin-top: 20px;
}
.el-col .el-card {
  margin: 10px;
  height: 220px;
  background-color: #d9ecff;
  line-height: 140px;
  font-size: 30px;
  cursor: pointer;
  user-select: none;
}
.cate_place {
  background-color: #ebeef5;
  user-select: none;
}

.cate_title {
  font-size: 35px;
}
</style>