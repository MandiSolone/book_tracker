import React, { useState, useEffect } from "react";
import useLibrary from "../hooks/useLibrary";
import Modal from "./Modal";
import useUser from "../hooks/useUser";
import style from "./BookForm.module.css";
import SignInButton from "./SignInButton";

function BookForm({ book, onClose, modal, onSave }) {
  const { user } = useUser(); // Hook to UserProfileContext
  const { libraryAddBook, libraryEditBook } = useLibrary(); // Hook to LibraryContext
  const [title, setTitle] = useState("");
  const [authors, setAuthors] = useState("");
  const [comments, setComments] = useState("");
  const [link, setLink] = useState("");
  const [image, setImage] = useState("");
  const [type, setType] = useState("");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState("");
  const [rating, setRating] = useState("");
  const [customLocation, setCustomLocation] = useState(""); // New state for custom Location
  const [isModalOpen, setIsModalOpen] = useState(false);
  const defaultImage = "https://via.placeholder.com/128x193.png?text=No+Image"; // Default img

  // Populate form with existing book data if editing
  useEffect(() => {
    if (book) {
      setTitle(book.title || "");
      setAuthors(book.authors || "");
      setComments(book.comments || "");
      setLink(book.link || "");
      setImage(book.image || defaultImage); // Keep current image if editing
      setType(book.type || "");
      setLocation(book.location || "");
      setStatus(book.status || "");
      setRating(book.rating || "");
    }
  }, [book]);

  // User must sign in to see BookForm and add books
  if (!user) {
    return (
      <div className={style.login}>
        <h3>Log In to Access Your Library</h3>
        <p>To add books to your library, please sign in.</p>
        <SignInButton />
      </div>
    );
  }

  // Async handle Save Btn Click - fetch is preformed before states are cleared
  const handleSaveClick = async (e) => {
    e.preventDefault();
    setIsModalOpen(true); // Open confirmation modal
  };

  // Construct the new or updated book object - Called on confirm save Modal btn click
  const handleConfirmSave = async () => {
    const newBook = {
      book_id: book ? book.book_id : undefined, // Ensure ID is included for edits
      title,
      authors,
      comments,
      link,
      image: image.trim() !== "" ? image : book ? book.image : defaultImage, // Use existing image if empty
      type,
      location: location === " Other" ? customLocation : location, // Use customLocation if "Other" is selected
      status,
      rating,
    };

    // Save or update book
    if (book) {
      await libraryEditBook(newBook); //Pass newBook w/ ID for editing
    } else {
      await libraryAddBook(newBook);
    }

    // After saving, handle the modal closing and resetting
    if (onSave) {
      onSave(); // This will close the modal and refresh the page
    }

    // Handle Modal
    if (modal) {
      onClose(); // Close the modal if in library context
    }
    resetFields();
    setIsModalOpen(false); // Close confirmation modal
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const resetFields = () => {
    setTitle("");
    setAuthors("");
    setComments("");
    setLink("");
    setImage("");
    setType("");
    setLocation("");
    setStatus("");
    setRating("");
    setCustomLocation("");
  };

  return (
    <form
      onSubmit={handleSaveClick}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          handleSaveClick(e);
        }
      }}
    >
      <div>
        <h2>{book ? "Edit Book" : "Add Book"}</h2>
        <label>Title: </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Authors: </label>
        <input
          type="text"
          value={authors}
          onChange={(e) => setAuthors(e.target.value)}
        />
      </div>
      <div>
        <label>Comments: </label>
        <textarea
          value={comments}
          onChange={(e) => setComments(e.target.value)}
        />
      </div>
      <div>
        <label>Link (optional): </label>
        <input
          type="url"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
      </div>
      <div>
        <label>Image (optional): </label>
        <input
          type="Image url"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
      </div>
      <div>
        <label>Type: </label>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="">Select Type</option> {/* Added empty option */}
          <option value=" Hardcopy"> Hardcopy</option>
          <option value=" Ebook"> Ebook</option>
          <option value=" Audiobook"> Audiobook</option>
          <option value=" Other"> Other</option>
        </select>
      </div>
      <div>
        <label>Location: </label>
        <select
          value={location}
          onChange={(e) => {
            setLocation(e.target.value);
            if (e.target.value !== "Other") {
              setCustomLocation(""); // Clear custom location if not "Other"
            }
          }}
        >
          <option value="">Select Location</option>
          <option value=" Google Play Books"> Google Play Books</option>
          <option value=" Kindle"> Kindle</option>
          <option value=" Nook"> Nook</option>
          <option value=" Audible"> Audible</option>
          <option value=" Libby/OverDrive"> Libby/OverDrive</option>
          <option value=" Other"> Other</option>
        </select>
        {location === "Other" && (
          <input
            type="text"
            placeholder="Please specify"
            value={customLocation} // Bind customLocation to the input
            onChange={(e) => setCustomLocation(e.target.value)} //Update customType
          />
        )}
      </div>
      <div>
        <label>Status: </label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">Select Status</option>
          <option value=" Read"> Read</option>
          <option value=" Unread"> Unread</option>
          <option value=" Other"> Other</option>
        </select>
      </div>
      <div>
        <label>Rating: </label>
        <select value={rating} onChange={(e) => setRating(e.target.value)}>
          <option value="">Select Rating</option>
          <option value=" One Star"> 1 Star</option>
          <option value=" Two Stars"> 2 Star</option>
          <option value=" Three Stars"> 3 Star</option>
          <option value=" Four Stars"> 4 Star</option>
          <option value=" Five Stars"> 5 Star</option>
        </select>
      </div>
      <button type="submit">Save Book</button>
      {/* Confirm Save Modal */}
      {isModalOpen && (
        <Modal
          onClose={handleCloseModal}
          onConfirm={handleConfirmSave}
          showConfirm={true}
        >
          <h2>Confirm Save</h2>
          <p>Are you sure you want to save this book: {title}?</p>
        </Modal>
      )}
    </form>
  );
}

export default BookForm;
