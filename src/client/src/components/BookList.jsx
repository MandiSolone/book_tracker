import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useHistory
import BookForm from "./BookForm";
import Modal from "./Modal";
import "./BookList.module.css";

// blBooks=[] set to empty array while awaiting db API fetch from Library
export default function BookList({ blBooks = [], blOnDelete }) {
  const navigate = useNavigate(); // Initialize navigate for navigation
  // Handle Edit Book Click
  const [selectedBook, setSelectedBook] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookToDelete, setBookToDelete] = useState(null);
  console.log("blBooks", blBooks);
  console.log("selectedBook", selectedBook);


  // // Function to sort books
  // const [sortCriteria, setSortCriteria] = useState('title'); // Default sort by title
  //   const sortedBooks = [...blBooks].sort((a, b) => {
  //     if (a[sortCriteria] < b[sortCriteria]) return -1;
  //     if (a[sortCriteria] > b[sortCriteria]) return 1;
  //     return 0;
  //   });

  //Handle clicks and Modals
  const handleEditClick = (book) => {
    setSelectedBook(book); // Set the selected book object
    setIsEditing(true); //Open the edit form
    console.log("Editing book:", book);
  };
  const closeForm = () => {
    setSelectedBook(null);
    setIsEditing(false);
  };

  const handleDeleteClick = (book) => {
    setBookToDelete(book);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (bookToDelete) {
      await blOnDelete(bookToDelete.book_id); // Call the delete function
      setIsModalOpen(false);
      setBookToDelete(null);
      window.location.reload(); // Refresh the page
    }
  };

  // Handle defualtImage if broken
  const BookImage = ({ src, bookId }) => {
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
        onClick={() => navigate(`/bookdetails/${bookId}`)} // Navigate on click
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
              <BookImage src={book.image} bookId={book.book_id} /> {/* Pass bookId */}
              <div className="book-info">
                <h2>{book.title}</h2>
                <p>
                  <strong>Author(s):</strong> {book.authors}{" "}
                </p>
                <p>
                  <strong>Comments:</strong> {book.comments}
                </p>
                <p>
                  <strong>Link:</strong>{" "}
                  <a href={book.link} target="_blank" rel="noopener noreferrer">
                    {book.link}
                  </a>
                </p>
                <p>
                  {" "}
                  <strong>Type:</strong> {book.type}{" "}
                </p>
                <p>
                  <strong>Location:</strong>
                  {book.location}
                </p>
                <p>
                  {" "}
                  <strong>Status:</strong>
                  {book.status}
                </p>
                <p>
                  {" "}
                  <strong>Rating:</strong>
                  {book.rating}{" "}
                </p>
                <button
                  className="button"
                  onClick={() => handleDeleteClick(book)}
                >
                  Delete
                </button>
                <button
                  className="button"
                  onClick={() => handleEditClick(book)}
                >
                  Edit Book
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      {/* Conditionally render the edit modal */}
      {isEditing && (
        <Modal onClose={closeForm}>
          <BookForm
            book={selectedBook} //Pass the seleted book object
            onClose={closeForm}
            onSave={() => {
              closeForm(); // Close the modal
              window.location.reload(); // Refresh the page
            }}
          />
        </Modal>
      )}
      {/* Conditionally render the delete confirmation modal */}
      {isModalOpen && (
        <Modal
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleConfirmDelete}
          showConfirm={true} // Ensure this is set to true
        >
          <h2>Confirm Deletion</h2>
          <p>
            Are you sure you want to delete this book:
            {bookToDelete ? bookToDelete.title : ""}?
          </p>
        </Modal>
      )}
    </div>
  );
}
