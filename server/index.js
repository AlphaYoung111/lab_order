const express = require('express')
const app = express()
const mongoose = require('mongoose')

app.use(require('cors')())
app.use(express.json())

// 连接数据库
const c1 = 'mongodb://localhost:27017/lab-order'
const c2 = 'mongodb://root:labOrder2020@s-bp1c4dd8955e5714-pub.mongodb.rds.aliyuncs.com:3717/lab-order'
mongoose.connect(
  c1,
  {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true
  }
)

app.get('/', async (req, res) => {
  res.send('ok')
})

// 用户数据表
const AccountData = mongoose.model(
  'AccountData',
  new mongoose.Schema({
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
    },
    isTeacher: {
      type: Boolean
    }
  })
)

// 分类数据
const AllCate = mongoose.model(
  'AllCate',
  new mongoose.Schema({
    cate_id: {
      type: String
    },
    cate_name: {
      type: String
    }
  })
)

// 实验室信息数据
const Room = mongoose.model(
  'Room',
  new mongoose.Schema({
    room_id: {
      type: String
    },
    cate_id: {
      type: String
    },
    building: {
      type: String
    },
    room_place: {
      type: String
    },
    total: {
      type: Number
    },
    seat_left: {
      type: Number
    }
  })
)

// 预约时间
const FreeTime = mongoose.model(
  'FreeTime',
  new mongoose.Schema({
    week: {
      type: String
    },
    day_options: {
      type: Array
    },
    class_options: {
      type: Object
    }
  })
)

// 预约信息
const Order = mongoose.model(
  'Order',
  new mongoose.Schema({
    week: {
      type: String
    },
    day: {
      type: String
    },
    classBetween: {
      type: String
    },
    num: {
      type: String
    },
    tel: {
      type: String
    },
    isCheck: {
      type: Boolean
    },
    room_id: {
      type: String
    },
    create_date: {
      type: String
    },
    isTeacher: {
      type: Boolean
    },
    username: {
      type: String
    },
    account: {
      type: Number
    },
    room_place: {
      type: String
    }
  })
)

app.get('/api/account', async (req, res) => {
  res.send(await AccountData.find())
})

// 用户登录数据接口 1
app.post('/api/login', async (req, res) => {
  const acc = req.body.account
  const pw = req.body.password
  const user = await AccountData.findOne({
    account: acc,
    password: pw
  })
  if (user) {
    res.send(user)
  } else {
    res.send({
      login_status: false
    })
  }
})

// 用户修改密码 1
app.put('/api/reset_pw', async (req, res) => {
  const acc = Number(req.body.account)
  const pw = req.body.password
  const user = await AccountData.findOne({
    account: acc
  })
  user.password = pw
  user.save()
  res.send(user)
})

// 实验室分类数据接口 1
app.get('/api/all_cate', async (req, res) => {
  const data = await AllCate.find()
  res.send(data)
})

// 具体教室数据接口 1
app.get('/api/room/:id', async (req, res) => {
  const data = await Room.find({
    cate_id: req.params.id
  })
  res.send(data)
})

// 具体预约时间接口 1
app.get('/api/free_time/:week', async (req, res) => {
  const data = await FreeTime.find({
    week: req.params.week
  })

  res.send(data)
})

// 创建预约订单接口 1
app.post('/api/order', async (req, res) => {
  const data = req.body
  await Order.create(data)
  res.send(data)
})

// 学生获取订单数据的接口 1
app.get('/api/order/:id', async (req, res) => {
  const data = await Order.find({
    account: req.params.id
  })
  res.send(data)
})

// 管理员获取未审批订单 1
app.get('/api/order_to_check', async (req, res) => {
  const data = await Order.find({
    isCheck: false
  })
  res.send(data)
})

// 管理员通过订单id审批接口 1
app.put('/api/check_order/:id', async (req, res) => {
  const item = await Order.findOne({
    _id: req.params.id
  })
  item.isCheck = true
  await item.save()
  res.send(item)
})

// 管理员获取所有审批后的接口 1
app.get('/api/agree_order', async (req, res) => {
  const item = await Order.find({
    isCheck: true
  })
  res.send(item)
})

// 获取指定日期的订单的接口
app.get('/api/date_order/:date', async (req, res) => {
  const item = await Order.find({
    create_date: req.params.date
  })
  res.send(item)
})

// 获取全部订单 1
app.get('/api/all_order', async (req, res) => {
  const item = await Order.find()
  res.send(item)
})

// 教室容量确认的接口 1
app.post('/api/check_seat', async (req, res) => {
  const week = req.body.week
  const classBetween = req.body.classBetween
  const day = req.body.day
  const item = await Order.find({
    week: week,
    classBetween: classBetween,
    day: day
  })
  res.send(item)
})

// 添加新教室的接口 1
app.post('/api/add_room', async (req, res) => {
  await Room.create(req.body)
  res.send()
})

// 添加新实验种类的接口 1
app.post('/api/add_cate', async (req, res) => {
  await AllCate.create(req.body)
  res.send()
})

// 添加新的名表 1
app.post('/api/add_account', async (req, res) => {
  await AccountData.insertMany(req.body)
  res.send()
})

// 取消申请的接口 1
app.delete('/api/cancel_order/:id', async (req, res) => {
  await Order.findByIdAndDelete(req.params.id)
  res.send()
})

app.listen(33301, () => {
  console.log('http://localhost:33301')
})
