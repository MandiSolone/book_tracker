import express from "express";
import books from "../controllers/books.controllers";
// import dotenv from 'dotenv'; 
// import axios from 'axios'; 

// requests will reach these routes already matching /api/books
const router = express.Router(); 

// dotenv.config(); 
// const GOOGLE_BOOKS_API = "https://www.googleapis.com/books/v1/volumes?q="; 
// const API_KEY = process.env.API_KEY; 

// router.get('/search/:query', async (req, res, next) => {
//   try {
//     const query = req.params.query;
//     const response = await axios.get(`${GOOGLE_BOOKS_API}${query}&key=${API_KEY}`);
//     console.log("API key", API_KEY); 
//     console.log("Query", query); 
//     console.log("Response", response); 
//     res.json(response.data);
//   } catch (err) {
//     console.error('Error fetching data from Google Books API:', err);
//     next(err);
//   }
// });

//:book_id? means id is optional 
router.get("/:book_id?", async (req, res, next) => {
    try {
        let { book_id } = req.params;
        console.log (req.parms);  
        let data; 
        if (book_id) {
            data = await books.findOne(book_id); 
        } else {
            data = await books.findAll(); 
        } 
        res.json(data);
    } catch (err){
        next(err); 
    }
}); 

router.post("/", async (req, res, next) => {
    try {
        let newBook = req.body;
        // Call addOne function in the controller
        let data = await books.addOne(newBook);
         // Send the new book with its ID as the response
        res.json(data); 
        console.log("router.post data", data); 
    } catch (err){
        next(err); 
    }
});  

//requires an user_id to update that user
//Would need an edit button on the client side
router.put("/:book_id", async (req, res, next) => {
    try {
        let { book_id } = req.params; 
        let updatedBook = req.body; 
        let data = await books.updateOne(updatedBook, book_id); 
        res.json(data); 
    } catch (err){
        next(err); 
    }
}); 

router.delete("/:book_id", async (req, res, next) => {
    try {
        let { book_id } = req.params; 
        let data = await books.removeOne(book_id);
        res.json(data); 
        } catch (err){
        next(err); 
    }
});  

export default router; 