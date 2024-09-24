import React, { useState, useEffect } from "react";
import useLibrary from "../hooks/useLibrary";
import Modal from "./Modal";

function BookForm({ book, onClose, modal, onSave }) {
  const { libraryAddBook, libraryEditBook } = useLibrary(); // Hooks to access libraryContext
  const [title, setTitle] = useState("");
  const [authors, setAuthors] = useState("");
  const [comments, setComments] = useState("");
  const [link, setLink] = useState("");
  const [image, setImage] = useState("");
  const [type, setType] = useState("Hardcopy");
  const [location, setLocation] = useState("Google Play Books");
  const [status, setStatus] = useState("Read");
  const [rating, setRating] = useState("5 Star");
  const [customLocation, setCustomLocation] = useState(""); // New state for custom Location
  const defaultImage = "https://via.placeholder.com/128x193.png?text=No+Image"; //default img
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Populate form with existing book data if editing
  useEffect(() => {
    if (book) {
      setTitle(book.title || "");
      setAuthors(book.authors || "");
      setComments(book.comments || "");
      setLink(book.link || "");
      setImage(book.image || defaultImage); // Keep current image if editing
      setType(book.type || "Hardcopy");
      setLocation(book.location || "Google Play Books");
      setStatus(book.status || "Read");
      setRating(book.rating || "1 Star");
    }
  }, [book]);
  console.log("BookForm book", book);

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
      // authors: authors.split(",").map((author) => author.trim()),
      comments,
      link,
      image: image.trim() !== "" ? image : book ? book.image : defaultImage, // Use existing image if empty
      type: type || "Hardcopy",
      location:
        location === "other" ? customLocation : location || "Google Play Books", // Use customLocation if "other" is selected
      status: status || "Read",
      rating: rating || "1 Star",
    };
    console.log("bookForm newbook", newBook);

    // Save or update book
    if (book) {
      await libraryEditBook(newBook); //Pass ID for editing
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
    setType("Hardcopy");
    setLocation("Google Play Books");
    setStatus("Read");
    setRating("1 Star");
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
          <option value="hardcopy">Hardcopy</option>
          <option value="ebook">Ebook</option>
          <option value="audiobook">Audiobook</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div>
        <label>Location: </label>
        <select
          value={location}
          onChange={(e) => {
            setLocation(e.target.value);
            if (e.target.value !== "other") {
              setCustomLocation(""); //clear custom location if not "other"
            }
          }}
        >
          <option value="googlePlayBooks">Google Play Books</option>
          <option value="kindle">Kindle</option>
          <option value="nook">Nook</option>
          <option value="audible">Audible</option>
          <option value="Libby/OverDrive">Libby/OverDrive</option>
          <option value="other">Other</option>
        </select>
        {location === "other" && (
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
          <option value="read">Read</option>
          <option value="unread">Unread</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div>
        <label>Rating: </label>
        <select value={rating} onChange={(e) => setRating(e.target.value)}>
          <option value="oneStar">1 Star</option>
          <option value="twoStar">2 Star</option>
          <option value="threeStar">3 Star</option>
          <option value="fourStar">4 Star</option>
          <option value="fiveStar">5 Star</option>
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
