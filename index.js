const express = require('express')
const router = require('./lib/router')
const cors = require('cors')
require('dotenv').config()

const app = express()

app.use(express.json())
app.use(cors())
app.use(router)
app.use(express.static(`${__dirname}/public`))

app.listen(process.env.PORT, _ => console.log(`http://localhost:${process.env.PORT}`))
