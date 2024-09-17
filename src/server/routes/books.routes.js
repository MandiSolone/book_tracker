import express from "express";
//doesn't matter what I call this books or xyz//
import books from "../controllers/books.controllers";

const router = express.Router(); 
// requests will reach these routes already matching /api/books

// router.get("/", books);  
// export default router; 

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

router.post("/books", async (req, res, next) => {
    try {
        let newBook = req.body; 
        let data = await books.addOne(newBook); 
        res.json(data); 
    } catch (err){
        next(err); 
    }
});  

//requires an user_id to update that user
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