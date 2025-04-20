const Sequelize=require('sequelize')

const sequelize=require('../util/database')
console.log("Entered in database")
const returnBook=sequelize.define('returnBooks',{
    
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
    fine:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
    ReturnDate:{
        type:Sequelize.STRING,
        allowNull:false,
    },
})

module.exports=returnBook