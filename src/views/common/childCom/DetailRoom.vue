<template>
  <div class="detail_room">
    <el-row :gutter="10">
      <el-col :span="8" v-for="item in roomData" :key="item.id" >
       <div @click="goRoomItem(item.id)">
        <el-card shadow="hover" >
          <div class="building">{{item.building}}</div>
          <div class="room">{{item.room}}</div>
          <div class="number">剩余/总量 &nbsp;&nbsp; {{item.remaing}}/{{item.total}}</div>
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
      roomData:[
        {id:10100,building:'正新大厦',room:'401',total:30,remaing:10},
        {id:10101,building:'厚德大厦',room:'402',total:30,remaing:20},
        {id:10102,building:'日新大厦',room:'403',total:30,remaing:30},
        {id:10103,building:'明德大厦',room:'404',total:30,remaing:10},
        {id:10104,building:'正新大厦',room:'405',total:30,remaing:5}
      ]
    }
  },
  created(){
    this.cate_id = this.$route.params.id
    this.getClassRoom()
  },
  methods:{
    getClassRoom(){
      // console.log(this.$route);
      
    },
    //进入详情页
    goRoomItem(id){
      this.$router.push('/room_item/'+id)
    }
  }
}
</script>
<style scoped>
.detail_room{
  margin: 50px 40px; 
}
.el-card{
  height: 320px;
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
  margin-top: 40px;
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