import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useHistory for return btn
import BookForm from "./BookForm";
import Modal from "./Modal";
import style from "./BookList.module.css";
import SignInButton from "./SignInButton";
import useUser from "../hooks/useUser";

// blBooks=[] set to empty array while awaiting db API fetch from Library
export default function BookList({ blBooks = [], blOnDelete }) {
  const [selectedBook, setSelectedBook] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookToDelete, setBookToDelete] = useState(null);
  const { user } = useUser(); //Call the user profile hook

  //Handle clicks and Modals
  const handleEditClick = (book) => {
    setSelectedBook(book); // Set the selected book object
    setIsEditing(true); // Open the edit form
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
    const navigate = useNavigate(); // Get the nav function
    const defaultImage =
      "https://via.placeholder.com/128x193.png?text=No+Image";


  return (
      <img
        className={style.image}
        src={src}
        onError={(e) => {
          e.target.onerror = null; // Prevent looping
          e.target.src = defaultImage; // Set the default image on error
        }}
        alt="Book cover"
        style={{ width: "128px", height: "193px" }}
        onClick={() => navigate(`/bookdetails/${bookId}`)} // Navigate to BookDetails on click
      />
    );
  };

  return (
    <div className={style.container}>
      {user ? (
        blBooks.length === 0 ? (
          <div className="login">
            <h3>It Looks Like Your Library is Empty</h3>
            <p>
              Don't worry! Start adding books and build your collection.
            </p>
          </div>
        ) : (
          <ul className={style.list}>
            {blBooks.map((book) => (
              <li className={style.item} key={book.book_id || book.google_id}>
                <BookImage className={style.image} src={book.image} bookId={book.book_id} />
                <div className={style.info}>
                  <h2>{book.title}</h2>
                  <p>
                    <strong>Author(s):</strong> {book.authors}
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
                    <strong>Type:</strong> {book.type}
                  </p>
                  <p>
                    <strong>Location:</strong> {book.location}
                  </p>
                  <p>
                    <strong>Status:</strong> {book.status}
                  </p>
                  <p>
                    <strong>Rating:</strong> {book.rating}
                  </p>
                  <button onClick={() => handleDeleteClick(book)}>Delete</button>
                  <button onClick={() => handleEditClick(book)}>Edit Book</button>
                </div>
              </li>
            ))}
          </ul>
        )
      ) : (
        <div className="login">
          <h3>Log In to Access Your Library</h3>
          <p>
            To add books to your library, please sign in.
            <br />
            <SignInButton />
          </p>
        </div>
      )}
  
      {/* Conditionally render the edit modal */}
      {isEditing && (
        <Modal onClose={closeForm}>
          <BookForm
            book={selectedBook} // Pass the selected book object
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
            Are you sure you want to delete this book: {bookToDelete ? bookToDelete.title : ""}?
          </p>
        </Modal>
      )}
    </div>
  );
}