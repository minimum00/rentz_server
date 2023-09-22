const express = require('express')
const cors = require('cors')
const app = express()

const routes = require('./routes/route.js')
const PORT = 5001

app.use(cors())
app.use(express.json())

app.use('/api',routes)


app.listen(PORT,() => console.log(`ReviewsManageent running on port ${PORT}`))