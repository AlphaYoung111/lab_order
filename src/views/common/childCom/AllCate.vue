<template>
  <div class="all_cate">
    <el-card class="cate_place">
      <div class="cate_title">实验室分类</div>
      <el-row>
        <el-col :span="6" v-for="item in all_cate" :key="item.cate_id">
          <el-card shadow="hover">
            <div @click="goDetailRoom(item.cate_id)" class="cate_name">{{item.cate_name}}</div>
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
      all_cate: []
    }
  },
  created() {
    this.getAllCate()
  },
  methods: {
    // 跳转指定教室的方法
    goDetailRoom(id) {
      this.$router.push('/common/detail_room/' + id)
    },
    // 获取所有分类数据
    getAllCate() {
      window.sessionStorage.removeItem('building')
      window.sessionStorage.removeItem('room_place')
      this.$http.get('/all_cate').then(res => {
        this.all_cate = res.data
      })
    }
  }
}
</script>
<style scoped>
.all_cate {
  text-align: center;
  margin: 60px 30px;
}
.el-row {
  margin-top: 20px;
}
.el-col .el-card {
  margin: 10px;
  height: 220px;
  background-color: #d9ecff;
  line-height: 40px;
  font-size: 30px;
  cursor: pointer;
  user-select: none;
  display: flex;
  align-items: center;
  justify-content: center;
}
.cate_place {
  background-color: #ebeef5;
  user-select: none;
}

.cate_title {
  font-size: 35px;
}
</style>