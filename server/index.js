const express = require('express')
const app = express()
const mongoose = require('mongoose')

app.use(require('cors')())
app.use(express.json())

// 连接数据库
mongoose.connect('mongodb://localhost:27017/lab-order', {
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: true
})

app.get('/', (req, res) => {
  res.send('ok')
})

// 用户数据表
const AccountData = mongoose.model('AccountData', new mongoose.Schema({
  account: {
    type: Number
  },
  username: {
    type: String
  },
  password: {
    type: String
  },
  isAdmin: {
    type: Boolean
  }
}))

const AllCate = mongoose.model('AllCate', new mongoose.Schema({
  cate_id: { type: String },
  cate_name:{type:String}
}))

const Room = mongoose.model('Room', new mongoose.Schema({
  room_id: { type: String },
  cate_id: { type: String },
  building: { type: String },
  room_place: { type: String },
  total: { type: Number },
  seat_left:{type:Number}
}))


// AccountData.insertMany([{
//   account: 1902120138,
//   username: '章长浩',
//   password: '123456',
//   isAdmin: false
// }, ])

// AllCate.insertMany([
//   {cate_id:'10',cate_name:'单片机/EDA实验室'},
//   {cate_id:'11',cate_name:'数字电路实验室'},
//   {cate_id:'12',cate_name:'嵌入式/DSP实验室'},
// ])

// Room.insertMany([
//   {cate_id:'10',room_id:'10100',building:'明德大厦',room_place:'330',total:21,seat_left:21},
//   {cate_id:'11',room_id:'11100',building:'明德大厦',room_place:'323',total:50,seat_left:50},
//   {cate_id:'12',room_id:'12100',building:'明德大厦',room_place:'420',total:21,seat_left:21},
// ])

app.get('/account', async (req, res) => {
  res.send(await AccountData.find())
})

// 用户登录数据接口
app.post('/api/login', async (req, res) => {
  const acc = req.body.account
  const pw = req.body.password
  const user = await AccountData.findOne({ account: acc, password: pw })
  if (user) {
     res.send(user)
  } else {
    res.send({login_status:false})
  }
})

// 实验室分类数据接口
app.get('/api/all_cate', async (req, res) => {
  const data = await AllCate.find()
  res.send(data)
})

// 具体教室数据接口
app.get('/api/room/:id', async (req, res) => {
  const data = await Room.find({cate_id:req.params.id})
  res.send(data)
})














app.listen(3330, () => {
  console.log("http://localhost:3330");

})