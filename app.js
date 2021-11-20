let books = require('./books_data.json')

const express = require('express');

const app = express();
app.use(express.json())

//this will return all the books
app.get('/', function(req,res){
    res.send({api_requested_by: "arpit", books})
})

//it will append it to the end of the books
app.post("/books", (req,res)=>{ 
    res.send(books); 
})

//this will return user with a specific id
app.get("/books/:id", (req,res)=>{
   let newBook = books.filter(book => req.params.id == book.id)
   res.send({api_requested_by: "arpit",book:newBook[0]})
})

//update those on the book that matched the id
app.patch('/books/:id', (req,res)=>{
     const newBook = books.map((book)=>{
          if(req.params.id == book.id)
          {
              if(req?.body?.author) {
                  book.author = req.body.author
               }
              if(req?.body?.pages) {
                  book.pages = req.body.pages
              }
          }
          return book;
     })
     res.send({api_requested_by: "arpit", newBook})
})

//delete the book that matched the id
app.delete('/books/:id', (req,res)=>{
   const newbooks = books.filter((book)=>
       req.params.id != book.id
   )
   res.send({api_requested_by: "arpit",newbooks})
})

app.listen(2345, ()=>{
    console.log('Listening on port 2345');
})