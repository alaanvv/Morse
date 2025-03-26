const Database = require('./database.js')
const { Router } = require('express')
require('dotenv').config()

const router = new Router()
const db = new Database(process.env.db_host, Number(process.env.db_port), process.env.db_user, process.env.db_name, process.env.db_password)

router.get('/', (req, res) => {
  res.sendFile(`${__dirname}/public/index.html`)
})

router.get('/get-code', async (req, res) => {
  res.send(await db.get_codes() || [])
})

router.post('/post-code', async (req, res) => {
  if (!req.body.length) return
  for (let item of req.body) if (isNaN(item++)) return

  db.post_code(JSON.stringify(req.body))
})

module.exports = router
