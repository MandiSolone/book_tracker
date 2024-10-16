import express from "express";
import books from "../controllers/books.controllers.js";

// Requests will reach these routes already matching /api/books
const BooksRouter = express.Router();

// ? means id is optional // GET one or GET all
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
      // Fetch books for the authenticated user
      const booksList = await books.findAll({ user_id: userId });
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
      book_id: data.book_id,
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
    const updatedResult = await books.updateOne(updatedBook, book_id, userId);

    if (!updatedResult.affectedRows) {
      return res
        .status(404)
        .json({ message: "Book not found or no changes made." });
    }
    // Fetch the updated book from the database to return the complete object
    const freshBook = await books.findOne(book_id, userId);

    res.json({
      book_id: freshBook.book_id,
      user_id: freshBook.user_id,
      title: freshBook.title,
      authors: freshBook.authors.split(", "), // Author is a string
      comments: freshBook.comments,
      link: freshBook.link,
      image: freshBook.image,
      google_id: freshBook.google_id,
      type: freshBook.type,
      location: freshBook.location,
      status: freshBook.status,
      rating: freshBook.rating,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

export default BooksRouter;
