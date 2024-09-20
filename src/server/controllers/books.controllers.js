import query from "../db/utils";

const findAll = async () => {
  return await query(
    "SELECT book_id, title, authors, comments, link, image, google_id FROM books"
  );
};

const findOne = async (book_id) => {
  return await query(
    "SELECT book_id, title, authors, comments, link, image, google_id  FROM books WHERE book_id = ?",
    [book_id]
  );
};

const addOne = async (newBook) => {
  const result = await query("INSERT INTO books SET ?", [newBook]);
  // Construct the new book object including its id
  const bookWithId = {
    book_id: result.insertId, // Use insertId from the result
    ...newBook, // Spread other book properties
  };
  return bookWithId; // Return the new book object
};

const updateOne = async (updatedBook, book_id) => {
  return await query("UPDATE books SET ? WHERE book_id = ?", [
    updatedBook,
    book_id,
  ]);
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
