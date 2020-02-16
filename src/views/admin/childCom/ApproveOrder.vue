<template>
  <div class="all_place">
      <el-tabs type="border-card">
        <el-tab-pane label="待审批">
          <!-- 待审批 -->
          <el-table :data="orderData" style="width: 100%" border stripe>
            <el-table-column type="index"></el-table-column>
            <el-table-column align="center" prop="create_date" label="申请时间"></el-table-column>
            <el-table-column align="center" prop="room_id" label="教室号"></el-table-column>
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
                <el-tag type="success" effect="dark" v-if="scope.row.isCheck">审批成功</el-tag>
                <el-tag type="warning" v-else>审批中</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button type="info" icon="el-icon-edit" @click="editOrder(scope.row.order_id)"></el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="审批完成">
          <!-- 审批完成 -->
          <el-table :data="agreeData" style="width: 100%" border stripe>
            <el-table-column type="index"></el-table-column>
            <el-table-column align="center" prop="create_date" label="申请时间"></el-table-column>
            <el-table-column align="center" prop="room_id" label="教室号"></el-table-column>
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
      orderData: [
        {
          week: 1,
          day: '01',
          classBetween: '0102',
          tel: '13888888888',
          num: '1',
          isCheck: false,
          room_id: '10401',
          order_id: '10401001',
          create_date:'2020-02-10'
        },
        {
          week: 1,
          day: '02',
          classBetween: '0102',
          tel: '13888888888',
          num: '1',
          isCheck: false,
          room_id: '10401',
          order_id: '10401002',
          create_date:'2020-02-11'
        },
        {
          week: 1,
          day: '03',
          classBetween: '0102',
          tel: '13888888888',
          num: '1',
          isCheck: false,
          room_id: '10401',
          order_id: '10401003',
          create_date:'2020-02-12'
        }
      ],
      agreeData: []
    }
  },
  methods: {
    // 修改
    editOrder(id) {
      const obj = this.orderData.find(item => {
        return item.order_id === id
      })
      const index = this.orderData.findIndex(item => {
        return item.order_id === id
      })
      if (index === 0) {
        this.orderData.shift()
      } else {
        this.orderData.splice(1, index)
      }
      obj.isCheck = true
      this.agreeData.push(obj)
    }
  }
}
</script>
<style scoped>
.all_place {
  width: 100%;
}
.el-card{
  margin: 15px;
}
.el-table {
  margin: 10px;
  /* border: 1px solid red; */
}
</style>