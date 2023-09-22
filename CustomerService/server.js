const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const app = express()

const routes = require('./routes/route')

const PORT = 5002

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}))
app.use(express.json())
app.use(cookieParser())

app.use('/customer',routes)

app.get('/login',(req,res) => console.log(req.cookies))


app.listen(PORT,() => console.log('app running on port 5002'))
