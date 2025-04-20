const Sequelize=require('sequelize')

const sequelize=require('../util/database')
const { type } = require('os')
console.log("Entered in database")
const post=sequelize.define('books',{
    
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    bookName:{
        type:Sequelize.STRING,
        allownull:false,   
    },
    bookTaken:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    bookReturn:{
        type:Sequelize.STRING,
        allowNull:false,
    },
})

module.exports=post