let books = require('./books_data.json')
const express = require('express');

const app = express();
function logger(req,res,next){
    req.bb={"api_requested_by": "arpit"};
    next();
}
app.use(express.json())

//this will return all the books
app.get('/',logger,function(req,res){
    req.bb.books=books;
    res.send(req.bb);
})

//it will append it to the end of the books
app.post("/books", (req,res)=>{ 
    const newBooks=[...books,req.body];
    res.send(newBooks);
})

//this will return user with a specific id
app.get("/books/:id", logger,(req,res)=>{
    const newBooks = books.filter( ele => ele.id == req.params.id);
    req.bb.book=newBooks;
    req.bb["api_requested_by"]=newBooks[0].author;
    res.send(req.bb);
})

//update those on the book that matched the id
app.patch('/books/:id', (req,res)=>{
     const newBooks = books.map((book)=>{
          if(req.params.id == book.id)
          {
              if(req?.body?.author) {
                  book.author = req.body.author
               }
              if(req?.body?.pages) {
                  book.pages = req.body.pages
              }
              if(req?.body?.year) {
                book.year = req.body.year
              }
          }
          return book;
     })
     res.send(newBooks)
})

//delete the book that matched the id
app.delete('/books/:id', logger,(req,res)=>{
    const newBooks = books.filter((ele) => ele.id != req.params.id);
    res.send(newBooks)
})

app.listen(2345, ()=>{
    console.log('Listening on port 2345');
})
