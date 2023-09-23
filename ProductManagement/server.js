const express = require('express')
const cors = require('cors')
const app = express()

const routes = require('./routes/route.js')

app.use(express.json())
app.use(cors())

app.use('/api',routes)
app.get('/test',(req,res) =>{

    
    const {filter,type} = req.query
    if(filter){
        console.log('im onto simething')
    }
    console.log(filter,type)
    
    res.sendStatus(200)
})

app.listen(5000,() => console.log('server is on 5000'))