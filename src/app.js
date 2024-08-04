require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 3001;
const path = require('path')
const hostname = process.env.HOST_NAME;
const configViewEngine = require('./config/viewEngine')
const webRouter = require('./routes/web')
const connection = require('./config/db');
//config template viewsEngine and static file
configViewEngine(app);
//config req.body
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/',webRouter)




// simple query


app.listen(port,hostname, () => {
  console.log(`Example app listening on port ${port}`)
})
