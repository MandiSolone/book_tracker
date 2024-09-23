import React, { useState, useEffect } from "react";
import useLibrary from "../hooks/useLibrary";

function BookForm({ book, onClose }) {
  const { libraryAddBook, libraryEditBook } = useLibrary(); // Hooks to access libraryContext
  const [title, setTitle] = useState("");
  const [authors, setAuthors] = useState("");
  const [comments, setComments] = useState("");
  const [link, setLink] = useState("");
  const [image, setImage] = useState("");
  const [type, setType] = useState("Hardcopy");
  const [location, setLocation] = useState("Google Play Books");
  const [status, setStatus] = useState("Read");
  const [rating, setRating] = useState("1 Star");
  const [customLocation, setCustomLocation] = useState(""); // New state for custom Location
  const defaultImage = "https://via.placeholder.com/128x193.png?text=No+Image";

  console.log(
    "BookForm const--",
    "title:",
    title,
    "author:",
    authors,
    "comments:",
    comments,
    "link:",
    link,
    "image:",
    image,
    "type:",
    type,
    "location:",
    location,
    "status:",
    status,
    "rating:",
    rating,
    "customLocation:",
    customLocation
  );
  console.log("BookForm book:", book);

  // useEffect to populate book data as initial state for editing
  useEffect(() => {
    if (book) {
      setTitle(book.title);
      setAuthors(book.authors.join(", ")); // Convert array to string for input
      setComments(book.comments);
      setLink(book.link);
      setImage(book.image); // Keep current image if editing
      setType(book.type);
      setLocation(book.location);
      setStatus(book.status);
      setRating(book.rating);
    }
  }, [book]);

  // Async handleSubmit- fetch is preformed before states are cleared
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Construct the new or updated book object
    const newBook = {
      id: book ? book.id : undefined, // Ensure ID is included for edits
      title,
      authors: authors.split(", "), // Convert string back to array
      comments,
      link,
      image: image.trim() !== "" ? image : book ? book.image : defaultImage, // Use existing image if empty
      type,
      location: location === "other" ? customLocation : location, // Use customLocation if "other" is selected
      status,
      rating,
    };
    console.log("BookForm newBook", newBook);
    // Check if we are editing an existing book or adding a new one

    if (book) {
      await libraryEditBook(newBook); //Pass ID for editing
    } else {
      await libraryAddBook(newBook);
    }

    resetFields(); // Reset the form fields after saving
    onClose(); // Close the form
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
      onSubmit={handleSubmit}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          handleSubmit(e);
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
        <label>Location:</label>
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
        <label>Status:</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="read">Read</option>
          <option value="unread">Unread</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div>
        <label>Rating</label>
        <select value={rating} onChange={(e) => setRating(e.target.value)}>
          <option value="oneStar">1 Star</option>
          <option value="twoStar">2 Star</option>
          <option value="threeStar">3 Star</option>
          <option value="fourStar">4 Star</option>
          <option value="fiveStar">5 Star</option>
        </select>
      </div>
      <button type="submit">Save Book</button>
    </form>
  );
}

export default BookForm;
