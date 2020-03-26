const mysql = require('mysql')
const options = {

  host: 'cdb-2es2ibab.gz.tencentcdb.com',
  port: '10101',
  user: 'root',
  password: 'xitee123456',
  database:'lab-order'

}
const connection = mysql.createConnection(options)
function sqlQuery(str, arr) {
  return new Promise((resolve, reject) => {
    connection.query(str, arr, (err, res) => {
      if (err) reject(err)
      resolve(res)
    })
  })
}
module.exports = {
  sqlQuery
}