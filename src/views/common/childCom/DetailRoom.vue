<template>
  <div class="detail_room">
    <el-row :gutter="10">
      <el-col :span="6" v-for="item in roomData" :key="item._id" >
       <div @click="goRoomItem(item.room_id)">
        <el-card shadow="hover" >
          <div class="building">{{item.building}}</div>
          <div class="room">{{item.room_place}}</div>
          <div class="number">剩余/总量 &nbsp;&nbsp; {{item.seat_left}}/{{item.total}}</div>
        </el-card>
        </div>
      </el-col>
    </el-row>
    
   
  </div>
</template>
<script>
export default {
  name:'detailroom',
  data() {
    return {
      cate_id:null,
      roomData:[]
    }
  },
  created(){
    this.cate_id = this.$route.params.id
    console.log(this.cate_id);
    
    this.getClassRoom()
  },
  methods:{
    getClassRoom(){
      this.$http.get(`/room/${this.cate_id}`).then(res=>{
        this.roomData = res.data
      })
      
    },
    //进入详情页
    goRoomItem(id){
      this.$router.push('/common/room_item/'+id)
    }
  }
}
</script>
<style scoped>
.detail_room{
  margin: 40px 40px; 
  overflow: hidden;
}
.el-card{
  height: 240px;
  text-align: center;
  /* width: 250px; */
  background-color: #a0cfff;
  display: flex;
  justify-content: center;
  color: #fff;
  border-radius: 10px;
  margin-bottom: 20px;
  margin-right: 20px;
  cursor: pointer;
}
.building{
  margin-top: 20px;
  font-size: 40px;
  font-weight: 500;
  user-select: none;
}
.room{
  margin-top: 35px;
  font-size: 25px;
  color: #303133;
  user-select: none;
}
.number{
  margin-top: 20px;
  font-size: 20px;
  color: #606266;
  user-select: none;
}
</style>