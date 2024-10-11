const express = require('express')
const app = express()
const path = require('path');

const imageRouter = require('./routes/image.js')

// app.use(express.static('public'))
app.use(express.static('img'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/public', express.static(__dirname + '/public'));
app.use('/image', imageRouter)

app.get('/', (req, res) => {
  const spawn = require('child_process');
  res.send(req.body.data)
//   const pyProg = spawn('python', ['./ocr.py', req.body.data]);

})


const port  = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`server started at localhost:${port}`)
});