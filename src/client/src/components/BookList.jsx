import React, { useState } from "react";
import BookForm from "./BookForm";
import Modal from "./Modal";
import "./BookList.module.css";

// blBooks=[] set to empty array while awaiting db API fetch from Library
export default function BookList({ blBooks = [], blOnDelete }) {
  // Handle Edit Book Click
  const [selectedBook, setSelectedBook] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  console.log("BookList.jsx selectedBook", selectedBook);
  console.log("BookList.jsx isEditing", isEditing);
  console.log("Books in BookList, blBooks:", blBooks);

  // // Function to sort books
  // const [sortCriteria, setSortCriteria] = useState('title'); // Default sort by title
  //   const sortedBooks = [...blBooks].sort((a, b) => {
  //     if (a[sortCriteria] < b[sortCriteria]) return -1;
  //     if (a[sortCriteria] > b[sortCriteria]) return 1;
  //     return 0;
  //   });

  const handleEditClick = (book) => {
    setSelectedBook(book); // Set the selected book object
    setIsEditing(true); //Open the edit form
    console.log("Editing book:", book);
  };
  const closeForm = () => {
    setSelectedBook(null);
    setIsEditing(false);
  };

  // Handle defualtImage if broken
  const BookImage = ({ src }) => {
    const defaultImage =
      "https://via.placeholder.com/128x193.png?text=No+Image";
    return (
      <img
        className="book-image"
        src={src}
        onError={(e) => {
          e.target.onerror = null; // Prevent looping
          e.target.src = defaultImage; // Set the default image on error
        }}
        alt="Book cover"
        style={{ width: "128px", height: "193px" }}
      />
    );
  };

  return (
    <div className="booklist-container">
      <h2 className="booklist-header">Your Books</h2>

      {/* <label> */}
      {/* Sort by: 
        <select onChange={(e) => setSortCriteria(e.target.value)} value={sortCriteria}>
          <option value="title">Title</option>
          <option value="authors">Authors</option>
          <option value="rating">Rating</option>
        </select>
      </label>
      {sortedBooks.length === 0 ? (
        <p>No Books available</p>
      ) : (
        <ul>
          {sortedBooks.map((book) => ( */}

      {blBooks.length === 0 ? (
        <p className="no-books">No Books available</p>
      ) : (
        <ul>
          {blBooks.map((book) => (
            <li key={book.book_id || book.google_id} className="book-item">
              <BookImage src={book.image} />
              <div className="book-info">
              <h2>{book.title}</h2>
              <p><strong>Author(s):</strong> {book.authors} </p>
              <p><strong>Comments:</strong> {book.comments}</p>
              <p>
                <strong>Link:</strong>{" "}
                <a href={book.link} target="_blank" rel="noopener noreferrer">
                  {book.link}
                </a>
              </p>
              <p> <strong>Type:</strong> {book.type} </p>
              <p><strong>Location:</strong>{book.location}</p>
              <p> <strong>Status:</strong>{book.status}</p>
              <p> <strong>Rating:</strong>{book.rating} </p>
              <button className="button"
                onClick={() => {
                  console.log("Attempting to delete blBook with ID:", book.id);
                  blOnDelete(book.id);
                }}
              >
                Delete
              </button>
              <button className="button"
                onClick={() => {
                  console.log("Attempting to edit blEditBook:", book);
                  handleEditClick(book);
                }}
              >
                Edit Book
              </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {isEditing && (
        <Modal onClose={closeForm}>
          <BookForm
            book={selectedBook} //Pass the seleted book object
            onClose={closeForm}
          />
        </Modal>
      )}
    </div>
  );
}
