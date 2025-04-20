const path=require('path')

const Books=require('../models/admin')

const returnBook=require('../models/returnBook')

console.log("Entered in controller")
exports.addBook=async(req,res)=>{
    console.log("add Book")
    try{
        const bookName=req.body.bookName
        const bookTaken=req.body.bookTaken
        const bookReturn=req.body.bookReturn
        console.log("Here sending the data",req.body)
        console.log(" Book Issued at one",req.body.id,bookName,bookTaken,bookReturn);
        const data =await Books.create({bookName:bookName,bookTaken:bookTaken,bookReturn:bookReturn})
        console.log(" Book Issued to frontend",data);
        return res.status(201).json({newBook:data})
    }
    catch(err){
        console.log("error in adding Post",err.message);
        
    }
}
exports.getBook=async(req,res)=>{
    console.log("getting the book")
    try{
        const books=await Books.findAll()
        res.status(200).json({allBook:books})
    }
    catch(err){
        console.log("get book is failed from server",JSON.stringify(err));
        res.status(500).json({err:err})
    }
}

// add returned book
exports.returnBook = async (req, res) => {
    try {
        const bookId = req.params.id;
        const book = await Books.findByPk(bookId);

        if (!book) {
            return res.status(404).json({ error: "Book not found" });
        }
        const bookName=book.bookName
        const fine=req.body.fine
        const ReturnDate=new Date().toLocaleString()
        await returnBook.create({bookName:bookName,fine:fine,ReturnDate:ReturnDate})

        await book.destroy();
        res.status(200).json({ message: "Book returned successfully" });
    } catch (err) {
        console.log("Error returning book", err.message);
        res.status(500).json({ error: err.message });
    }
};
// Fetch returned books
exports.getReturnedBook=async(req, res) => {
    try {
        const data = await returnBook.findAll()
        res.status(200).json({ returnedBooks: data });
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch returned books" });
    }
};

exports.getLibrary=(req,res)=>{
res.sendFile(path.join(__dirname,'../views',"library.html"))
}