import express from "express";
import books from "../controllers/books.controllers";

// requests will reach these routes already matching /api/books
const router = express.Router();

//:book_id? means id is optional
router.get("/:book_id?", async (req, res, next) => {
  try {
    let { book_id } = req.params;
    let data;
    if (book_id) {
      data = await books.findOne(book_id);
    } else {
      data = await books.findAll();
    }
    // res.json(data);
    return res.json(
      data.map((book) => ({
        id: book.book_id,
        title: book.title,
        authors: book.author.split(", "),
        comments: book.comments,
        link: book.link,
        image: book.image,
      }))
    );
  } catch (err) {
    return next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    let newBook = req.body;
    // Call addOne function in the controller
    // Send the new book with its ID as the response
    let data = await books.addOne(newBook);
   
     // Use a placeholder image if data.image is null
     const placeholderImage = "https://via.placeholder.com/128x193.png?text=No+Image";
    
    res.json({
      id: data.book_id,
      title: data.title,
      authors: data.author.split(", "),
      comments: data.comments,
      link: data.link,
      image: data.image ? data.imamge : placeholderImage, 
      // image: data.image || placeholderImage, 
    });
    console.log("router.post data", data);
  } catch (err) {
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
  } catch (err) {
    next(err);
  }
});

router.delete("/:book_id", async (req, res, next) => {
  try {
    let { book_id } = req.params;
    await books.removeOne(book_id);
    // res.json(data);
    res.json({ message: "Book deleted", book_id });
  } catch (err) {
    next(err);
  }
});

export default router;
