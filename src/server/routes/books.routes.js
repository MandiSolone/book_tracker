
import express from "express";
import books from "../controllers/books.controllers";

// requests will reach these routes already matching /api/books
const BooksRouter = express.Router();

//? means id is optional
//remove if !data error as throws and exits before load
BooksRouter.get("/:book_id?", async (req, res, next) => {

  // if (!req.isAuthenticated()) {
  //   return res.status(401).json({ message: 'User not authenticated' });
  // }
// console.log("req.user.id", req.user.id); 
  // const userId = req.user.id; // This comes from the session/auth middleware
  // console.log(userId); 
  const { book_id } = req.params;

  try {
    const formatBookData = (book) => ({
      book_id: book.book_id,
      // user_id: book.user_id, 
      title: book.title,
      authors: book.authors,
      comments: book.comments,
      link: book.link,
      image: book.image,
      google_id: book.google_id,
      type: book.type,
      location: book.location,
      status: book.status,
      rating: book.rating,

    });

    if (book_id) {
      const data = await books.findOne(book_id);
      if (!data) {
        return res.status(404).json({ message: "Book not found" });
      }
      return res.json(formatBookData(data));

    } else {
      const data = await books.findAll();
            return res.json(data.map(formatBookData));
      // const booksList = await books.findAll({ where: { user_id: userId } });
      // return res.json(booksList.map(formatBookData));
    }
  } catch (err) {
    console.error("Error fetching book data:", err);
    return next(err);
  }
});


BooksRouter.post("/", async (req, res, next) => {
  try {
    let newBook = req.body;
    console.log("newBook, req.body", newBook);
    // Send the new book with its ID as the response
    let data = await books.addOne(newBook);
    console.log("BooksRouter.post data", data);
    // res.json({
    res.status(201).json({
      id: data.book_id,
      title: data.title,
      // user_id: data.user_id,
      // authors: data.authors ? data.authors : [],
      authors: data.authors || [], //input is an array not a string - ['J. K. Rowling', 'Jack Thorne']
      comments: data.comments,
      link: data.link,
      image: data.image,
      google_id: data.google_id,
      type: data.type,
      location: data.location,
      status: data.status,
      rating: data.rating,
    });
    // res.status(201).json(data);
  } catch (err) {
    next(err);
  }
});

BooksRouter.put("/:book_id", async (req, res, next) => {
  try {
    let { book_id } = req.params; // Extract book_id from request params
    console.log("BooksRouter.put book_id:", book_id); // Log the book_id to check its value
    let updatedBook = req.body; // Get updated book data from request body
    console.log("BooksRouter.put req.body", req.body);
    // Update the book in the database
    const updateResult = await books.updateOne(updatedBook, book_id); // Pass updatedBook directly

    // Check if the update was successful
    if (!updateResult.affectedRows) {
      return res
        .status(404)
        .json({ message: "Book not found or no changes made." });
    }

    // Optionally, fetch the updated book details
    const data = await books.findOne(book_id); // Get the updated book

    // Respond with the updated book data
    res.json({
      id: data.book_id,
      // user_us: data.user_is, 
      title: data.title,
      authors: data.authors ? data.authors.split(", ") : [], // split works as input is a string 
      comments: data.comments,
      link: data.link,
      image: data.image,
      google_id: data.google_id,
      type: data.type,
      location: data.location,
      status: data.status,
      rating: data.rating,
    });
  } catch (err) {
    next(err);
  }
});

BooksRouter.delete("/:book_id", async (req, res, next) => {
  try {
    let { book_id } = req.params;
    await books.removeOne(book_id);
    res.json({ message: "Book deleted", book_id });
  } catch (err) {
    next(err);
  }
});
export default BooksRouter;
