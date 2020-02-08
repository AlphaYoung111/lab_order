<template>
  <div class="all_cate">
    <el-card class="cate_place">
      <div class="cate_title">实验室分类</div>
      <el-row>
        <el-col :span="colLength" v-for="item in all_cate" :key="item.id">
          <el-card shadow="hover">
            <div @click="goDetailRoom(item.id)">{{item.name}}</div>
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
        { id: 12, name: '实验室三' }
      ]
    }
  },
  computed: {
    colLength() {
      return 24 / this.all_cate.length
    }
  },
  methods: {
    // 跳转指定教室的方法
    goDetailRoom(id) { 
      this.$router.push('/detail_room/' + id)
    }
  }
}
</script>
<style scoped>
.all_cate {
  text-align: center;
  margin: 150px 40px;
}
.el-row {
  margin-top: 20px;
}
.el-col .el-card {
  margin: 10px;
  height: 300px;
  background-color: #d9ecff;
  line-height: 250px;
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