import query from "../db/utils";

const findAll = async () => {
  return await query(
    "SELECT book_id, title, authors, comments, link, image, google_id, type, location, status, rating FROM books"
  );
};

const findOne = async (book_id) => {
  return await query(
    "SELECT book_id, title, authors, comments, link, image, google_id, type, location, status, rating  FROM books WHERE book_id = ?",
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
  const {
    title,
    authors,
    comments,
    link,
    image,
    type,
    location,
    status,
    rating,
  } = updatedBook;

  const updateResult = await query(
    "UPDATE books SET title = ?, authors = ?, comments = ?, link = ?, image = ?, type = ?, location = ?, status = ?, rating = ? WHERE book_id = ?",
    [
      title,
      authors,
      comments,
      link,
      image,
      type,
      location,
      status,
      rating,
      book_id,
    ]
  );

  console.log(updateResult.affectedRows);
  return updateResult;
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
