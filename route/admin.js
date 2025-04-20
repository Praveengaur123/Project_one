const path=require('path')
const express=require('express')
console.log("Entered in Routing");

const fs=require('fs')
const adminController=require('../controller/admin')
const router=express.Router()

// Serving the html file
router.get('/',adminController.getLibrary)

router.post('/add-book', adminController.addBook);

router.get('/get-book', adminController.getBook);


router.put('/return-book/:id', adminController.returnBook);


router.get('/get-returned-books',adminController.getReturnedBook)
module.exports=router;