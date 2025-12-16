const express=require("express")
const { ServerConfig } = require('./config/index')
const apiRoutes=require('./routes')
const { ErrorHandler } = require('./middlewares')


const app=express()

app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use('/api', apiRoutes)

app.use(ErrorHandler)

app.listen(ServerConfig.PORT,()=>{
    console.log(`server is running on PORT : ${ServerConfig.PORT}`)
})
