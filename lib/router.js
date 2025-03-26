const Database = require('./database.js')
const { Router } = require('express')
require('dotenv').config()

const db = new Database(process.env.DB_HOST, Number(process.env.DB_PORT), process.env.DB_USER, process.env.DB_NAME, process.env.DB_PASSWORD)
const router = new Router()

router.get('/get-code', async (_, res) => {
  res.send(await db.get_codes())
})

router.post('/post-code', async (req, _) => {
  if (!req.body.length) return
  for (let item of req.body) if (isNaN(item++)) return

  db.post_code(JSON.stringify(req.body))
})

module.exports = router
