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


app.listen(33301)
