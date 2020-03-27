const { sqlQuery } = require('./utils')
const express = require('express')
const app = express()
app.use(require('cors')())
app.use(express.json())
app.get('/', async (req, res) => {
  const data = await sqlQuery('select * from accountdata ')
  res.send(data)
})

// 用户登录
app.post('/api/login', async (req, res) => {
  const acc = req.body.account
  const pw = req.body.password
  const str = `select * from accountdata where account = ${acc} and password = ${pw}`
  const data = await sqlQuery(str)
  if (data) {
    res.send(data)
  } else {
    res.send('false')
  }
})

// 用户修改密码
app.put('/api/reset_pw', async (req, res) => {
  const acc = Number(req.body.account)
  const pw = req.body.password
  const str = `update accountdata set password= ${pw} where account = ${acc}`
  await sqlQuery(str)
  const data = `select * from accountdata where account = ${acc}`
  res.send(data)
})

// 实验室分类数据接口
app.get('/api/all_cate', async (req, res) => {
  const str = `select * from allcates`
  const data = await sqlQuery(str)
  res.send(data)
})

// 具体教室数据接口
app.get('/api/room/:id', async (req, res) => {
  const cate_id = req.params.id
  const str = `select * from rooms where cate_id = ${cate_id}`
  const data = await sqlQuery(str)
  res.send(data)
})

// 添加新的名表
app.post('/api/add_account', async (req, res) => {
  const query = req.body
  query.forEach(async item => {
    const { account, username, password, isAdmin, isTeacher } = item
    const str = `insert into accountdata(account, username, password, isAdmin, isTeacher) values(?,?,?,?,?)`
    const arr = [account, username, password, isAdmin, isTeacher]
    await sqlQuery(str, arr)
  })
  res.send()
})

// 添加新实验种类的接口
app.post('/api/add_cate', async (req, res) => {
  const obj = req.body
  const { cate_id, cate_name } = obj
  const str = `insert into allcates(cate_id,cate_name) values(?,?)`
  const arr = [cate_id, cate_name]
  await sqlQuery(str,arr)
  res.send()
})

// 添加新教室的接口
app.post('/api/add_room', async (req, res) => {
  const obj = req.body
  const { cate_id, room_id, building, room_place, total, seat_left } = obj
  const str = `insert into rooms(cate_id, room_id, building, room_place, total, seat_left) values(?,?,?,?,?,?)`
  const arr = [cate_id, room_id, building, room_place, total, seat_left]
  await sqlQuery(str,arr)
  res.send()
})

// 上传空闲时间课表的接口
app.post('/api/free_time/:id', async (req, res) => {
  const query = req.body
  const id = req.params.id
  query.forEach(async item => {
    const str = `insert into freetime(week,day,classBetween,room_id) values(?,?,?,?)`
    const { week, day, classBetween } = item
    const arr = [week, day, classBetween, id]
    await sqlQuery(str,arr)
  })
  res.send()
})

// 具体预约时间确定周数后的接口
app.get('/api/free_time/:week/:id', async (req, res) => {
  const week = req.params.week
  const id = req.params.id
  const str = `select * from freetime where week = ${week} and room_id = ${id} `
  const data = await sqlQuery(str)
  res.send(data)
})

// 教室容量确认的接口
app.post('/api/check_seat', async (req, res) => {
  const week = req.body.week
  const classBetween = req.body.classBetween
  const day = req.body.day
  const str = `select * from orders where week =${week} and classBetween = ${classBetween} and day = ${day}`
  const item = await sqlQuery(str)
  res.send(item)
})

// 创建预约订单接口
app.post('/api/order', async (req, res) => {
  const data = req.body
  const { week, day, classBetween, isTeacher, num, tel, isCheck, room_id, create_date, username, account, room_place } = data
  const str = `insert into orders(week, day, classBetween, isTeacher, num, tel, isCheck, room_id, create_date, username, account, room_place) values(?,?,?,?,?,?,?,?,?,?,?,?)`
  const arr = [week, day, classBetween, isTeacher, num, tel, isCheck, room_id, create_date, username, account, room_place]
  await sqlQuery(str,arr)
  res.send(data)
})

// 学生获取自己订单数据的接口
app.get('/api/order/:id', async (req, res) => {
  const account = req.params.id
  const str = `select * from orders where account = ${account}`
  const data =await sqlQuery(str)
  res.send(data)
})

// 取消订单申请的接口
app.delete('/api/cancel_order/:id', async (req, res) => {
  const id = req.params.id
  const str = `delete from orders where id = ${id}`
  await sqlQuery(str)
  res.send()
})

// 管理员获取未审批订单
app.get('/api/order_to_check', async (req, res) => {
  const str = `select * from  orders where isCheck = 'false' or isCheck = '0' `
  const data = await sqlQuery(str)
  res.send(data)
})

// 管理员获取所有审批后的接口
app.get('/api/agree_order', async (req, res) => {
  const str = `select * from orders where isCheck = 'true' or isCheck = '1'`
  const item = await sqlQuery(str)
  res.send(item)
})

// 管理员通过订单id审批接口
app.put('/api/check_order/:id', async (req, res) => {
  const id = req.params.id
  const str = `update orders set isCheck = '1' where id = ${id}`
  await sqlQuery(str)
  res.send()
})

// 获取全部订单
app.get('/api/all_order', async (req, res) => {
  const str = `select * from orders`
  const item = await sqlQuery(str)
  res.send(item)
})

// 获取指定日期的订单的接口
app.get('/api/date_order/:date', async (req, res) => {
  let date = req.params.date
  const str = `select * from orders where create_date = '${date}'`
  const item = await sqlQuery(str)
  res.send(item)
})

app.listen(33301)
