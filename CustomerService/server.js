const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const app = express()
// const multer = require('multer')
const {randomBytes} = require('crypto')



app.use(cors())
app.use(express.json());


// const upload = multer();

// app.post('/customer/formDataSubmit', upload.array('propertyImage', 10), (req, res) => {
//     try {
//       // Access the uploaded images in req.files.
//       const propertyImages = req.files;
//       const {propertyName} = req.body;
      
//       // Process propertyImages as needed.
  
//       // Access other fields from FormData in req.body.
//      console.log('propertyImages', propertyImages)
//      console.log('propertyName: ', propertyName)
  
//       // ...
      
//       res.status(200).json({ message: 'Images uploaded successfully' });

//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'Something went wrong' });
//     }
//   });


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
