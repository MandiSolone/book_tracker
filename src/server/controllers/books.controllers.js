// export const books = (req, res) => {
//     res.json("List of books");
//   };

import query from "../db/utils";

const findAll = async () => {
    return await query(
        "SELECT book_id, title, author, comments, link FROM books"
    );
};

const findOne = async (book_id) => {
    return await query(
        "SELECT book_id, title, author, comments, link FROM books WHERE book_id = ?", [book_id]);
}; 

const addOne = async (newBook) => {
    return await query("INSERT INTO books SET ?", [newBook]); 
}; 

const updateOne = async (updatedBook, book_id) => {
    return await query("UPDATE books SET ? WHERE book_id = ?", [updatedBook, book_id]);
}; 

const removeOne = async (bookID) => {
    return await query("DELETE FROM books WHERE book_id = ?", [bookID,]);
};

export default {
    findAll, findOne, addOne, updateOne, removeOne };