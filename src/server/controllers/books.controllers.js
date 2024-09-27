// connects mysql wrapped in a promise from db query
import query from "../db/utils";

export const findAll = async ({ user_id }) => {
  const sql = "SELECT * FROM books WHERE user_id = ?";
  const params = [user_id];
  const results = await query(sql, params);
  return results;
};

const findOne = async (book_id, user_id) => {
  const sql = "SELECT * FROM books WHERE book_id = ? AND user_id = ?";
  const params = [book_id, user_id];
  console.log("params", params);

  const results = await query(sql, params);
  console.log("results", results);

  // Return the first result, or null if not found
  return results.length > 0 ? results[0] : null;
};

const addOne = async (newBook) => {
  const sql = "INSERT INTO books SET ?"; // No need for WHERE clause here
  const params = newBook; // Directly use the newBook object
  const result = await query(sql, params);

  // Construct the new book object including its ID
  const bookWithId = {
    book_id: result.insertId, // Use insertId from the result
    ...newBook,
  };
  console.log("addOne BookWithId", bookWithId);
  return bookWithId; // Return the new book object
};

const updateOne = async (updatedBook, book_id, user_id) => {
  const sql =
    "UPDATE books SET title = ?, authors = ?, comments = ?, link = ?, image = ?, type = ?, location = ?, status = ?, rating = ?, user_id = ? WHERE book_id = ?";
  const params = [
    updatedBook.title,
    updatedBook.authors,
    updatedBook.comments,
    updatedBook.link,
    updatedBook.image,
    updatedBook.type,
    updatedBook.location,
    updatedBook.status,
    updatedBook.rating,
    user_id,
    book_id,
  ];

  const result = await query(sql, params);
  return result;
};

const removeOne = async (bookID) => {
  return await query("DELETE FROM books WHERE book_id = ?", [bookID]);
};

export default {
  findAll,
  findOne,
  addOne,
  updateOne,
  removeOne,
};
