const path=require('path')

const express =require('express')

const bodyParser=require('body-parser')

const cors=require('cors')

const adminRoute=require('./route/admin')
const sequelize=require('./util/database')

const app=express()

app.use(cors())

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname,'public')))
app.use(adminRoute)


sequelize.sync()
.then(result=>{
    console.log("Server Start at 2020")
    app.listen(2020)
})
.catch(err=>{
    console.log(err)
})