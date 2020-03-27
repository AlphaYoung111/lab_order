<template>
  <div class="all_place">
    <el-tabs type="border-card" @tab-click="getCheckedData" v-model="active">
      <el-tab-pane label="待审批" name="check">
        <!-- 待审批 -->
        <el-table :data="orderData" style="width: 100%" border stripe max-height="700">
          <el-table-column type="index"></el-table-column>
          <el-table-column align="center" prop="create_date" label="申请时间"></el-table-column>
          <el-table-column align="center" prop="room_place" label="教室号"></el-table-column>
          <el-table-column align="center" prop="username" label="申请人"></el-table-column>
          <el-table-column align="center" prop="account" label="学号"></el-table-column>
          <el-table-column align="center" prop="week" label="周数"></el-table-column>
          <el-table-column align="center" label="星期数">
            <template slot-scope="scope">{{scope.row.day | dayForm}}</template>
          </el-table-column>
          <el-table-column align="center" prop="classBetween" label="时间段" min-width="120px">
            <template slot-scope="scope">{{scope.row.classBetween | lessonForm}}</template>
          </el-table-column>
          <el-table-column align="center" prop="num" label="人数"></el-table-column>
          <el-table-column align="center" prop="tel" label="联系电话" min-width="100px"></el-table-column>
          <el-table-column align="center" prop="isCheck" label="审核状态" min-width="90px">
            <template slot-scope="scope">
              <el-tag type="success" effect="dark" v-if="scope.row.isCheck=='true' || scope.row.isCheck == '1'">审批成功</el-tag>
              <el-tag type="warning" v-else>审批中</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="info" icon="el-icon-edit" @click="editOrder(scope.row.id)"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="审批完成" name="agree">
        <!-- 审批完成 -->
        <el-table :data="agreeData" style="width: 100%" border stripe max-height="700">
          <el-table-column type="index"></el-table-column>
          <el-table-column align="center" prop="create_date" label="申请时间"></el-table-column>
          <el-table-column align="center" prop="room_place" label="教室号"></el-table-column>
          <el-table-column align="center" prop="username" label="申请人"></el-table-column>
          <el-table-column align="center" prop="account" label="学号"></el-table-column>
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
              <el-tag type="success" effect="dark" v-if="scope.row.isCheck=='true' || scope.row.isCheck == '1'">审批成功</el-tag>
              <el-tag type="warning" v-else>审批中</el-tag>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  name: 'approveorder',
  data() {
    return {
      orderData: null,
      agreeData: [],
      active:'check'
    }
  },
  created() {
    this.getAllOrder()
  },
  methods: {
    // 修改
    editOrder(id) {
      this.$http.put(`/check_order/${id}`).then(res => {
        this.getAllOrder()
        this.debonce(this.$message.success('审批成功'))
      })
    },
    // 防抖
    debonce(func, wait) {
      let timeout
      return function() {
        let context = this
        let args = arguments
        if (timeout) clearTimeout(timeout)
        timeout = setTimeout(() => {
          func.apply(context, args)
        }, wait)
      }
    },
    getCheckedData(){
      if(this.active==="agree"){
        this.$http.get('/agree_order').then(res=>{
          this.agreeData = res.data
          
        })
      }
      if(this.active==="check"){
        this.getAllOrder()
      }
    },
    // 获取所有未审批的
    getAllOrder() {
      this.$http.get('/order_to_check').then(res => {
        this.orderData = res.data
      })
    },
    // 所有审批的
    getAgreeData(){

    }
  }
}
</script>
<style scoped>
.all_place {
  width: 100%;
}
.el-card {
  margin: 15px;
}
.el-tabs{
  margin: 10px;
}
.el-table {
  margin: 10px;
  /* border: 1px solid red; */
}
</style>