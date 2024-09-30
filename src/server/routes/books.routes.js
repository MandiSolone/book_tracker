import express from "express";
import books from "../controllers/books.controllers";

// Requests will reach these routes already matching /api/books
const BooksRouter = express.Router();

//? means id is optional
BooksRouter.get("/:book_id?", async (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: "User not authenticated" });
  }
  const userId = req.user.id; // This comes from the session/auth middleware
  const { book_id } = req.params;

  try {
    const formatBookData = (book) => ({
      book_id: book.book_id,
      user_id: book.user_id,
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
      const data = await books.findOne(book_id, userId);
      if (!data) {
        return res.status(404).json({ message: "Book not found" });
      }
      return res.json(formatBookData(data));
    } else {
      const booksList = await books.findAll({ user_id: userId }); // Fetch books for the authenticated user
      return res.json(booksList.map(formatBookData));
    }
  } catch (err) {
    console.error("Error fetching book data:", err);
    return next(err);
  }
});

BooksRouter.post("/", async (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: "User not authenticated" });
  }
  const userId = req.user.id;
  const newBook = req.body;

  try {
    // Include user_id in the book data
    const bookWithUserId = {
      ...newBook,
      user_id: userId, // Add the user ID to the new book data
    };

    let data = await books.addOne(bookWithUserId); // Pass newBook to addOne

    res.status(201).json({
      id: data.book_id,
      title: data.title,
      user_id: data.user_id,
      authors: data.authors || [],
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

BooksRouter.put("/:book_id", async (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: "User not authenticated" });
  }
  const userId = req.user.id;
  const updatedBook = req.body; // Get updated book data from request body
  const { book_id } = req.params; // Extract book_id from request param

  try {
    // Update the book in the database
    const updatedResult = await books.updateOne(updatedBook, book_id, userId); // Pass updatedBook directly

    // Check if the update was successful
    if (!updatedResult.affectedRows) {
      return res
        .status(404)
        .json({ message: "Book not found or no changes made." });
    }

    // Respond with the updated book data
    res.json({
      id: updatedResult.book_id,
      user_id: updatedResult.user_id,
      title: updatedResult.title,
      authors: updatedResult.authors ? updatedResult.authors.split(", ") : [], // split works as input is a string
      comments: updatedResult.comments,
      link: updatedResult.link,
      image: updatedResult.image,
      google_id: updatedResult.google_id,
      type: updatedResult.type,
      location: updatedResult.location,
      status: updatedResult.status,
      rating: updatedResult.rating,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

export default BooksRouter;
