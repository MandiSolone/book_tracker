import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const LibraryContext = createContext();

const LibraryProvider = ({ children }) => {
  const [libraryBooks, setLibraryBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log("libraryBooks", libraryBooks);
  console.log("libraryProvider loading", loading);
  console.log("library error", error);

  // Fetch library books from API & db
  const fetchBooks = async () => {
    setLoading(true); //Start loading
    setError(null); // Reset error state before fetching
    try {
      const response = await axios.get("http://localhost:8080/api/books");
      // setLibraryBooks(response.data);
      setLibraryBooks(response.data.map(book => ({
        book_id: book.book_id,
        title: book.title,
        authors: book.authors,
        comments: book.comments,
        link: book.link,
        image: book.image,
        google_id: book.google_id,
        type: book.type, // Ensure this field is included
        location: book.location,
        status: book.status,
        rating: book.rating,
      })));
    } catch (error) {
      console.error("Error fetching books:", error);
      setError("Failed to load books. Please try again later.");
    } finally {
      setLoading(false); // Stop loading regardless of success or failure
    }
  };

  useEffect(() => {
    fetchBooks(); // Fetch books when the component mounts
  }, []);

  const libraryAddBook = async (book) => {
    if (!book) {
      console.error("No book provided for addition");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:8080/api/books",
        book
      );
      console.log("Added book response:", response.data);
      setLibraryBooks((prevBooks) => [...prevBooks, response.data]); // Update state immediately
    } catch (error) {
      console.error("Error adding book:", error);
      setError("Failed to add book. Please try again.");
    }
  };

  const libraryEditBook = async (updatedBookData) => {
    const bookId = updatedBookData.id; // Extract ID from the updated book data
    if (!bookId) {
      console.error("No book ID provided for editing");
      return;
    }
    try {
      console.log(
        "LibraryContext-libraryEditBook-updatedBookData",
        updatedBookData
      );
      console.log("LibraryContext-libraryEditBook-bookId", bookId);
      const response = await axios.put(
        `http://localhost:8080/api/books/${bookId}`,
        updatedBookData
      );
      setLibraryBooks(
        (prevBooks) =>
          prevBooks.map((book) => (book.id === bookId ? response.data : book)) // Update state immediately
      );
    } catch (error) {
      console.error("Error editing book:", error);
      setError("Failed to update book. Please try again.");
    }
  };

  const libraryHandleDelete = async (bookId) => {
    if (!bookId) {
      console.error("No book ID provided for deletion");
      return;
    }
    try {
      await axios.delete(`http://localhost:8080/api/books/${bookId}`);
      setLibraryBooks((prevBooks) =>
        prevBooks.filter((book) => book.id !== bookId)
      );
    } catch (error) {
      console.error("Error deleting book:", error);
      setError("Failed to delete book. Please try again.");
    }
  };

  // Conditional rendering for loading state
  if (loading) {
    return (
      <div>
        <h1>Loading Library...</h1>
      </div>
    );
  }

  return (
    <LibraryContext.Provider
      value={{
        libraryBooks,
        libraryAddBook,
        libraryHandleDelete,
        libraryEditBook,
        error, // Pass the error state
        setError, // Optional: Provide a way to clear the error
      }}
    >
      {children}
      {error && <div className="error-message">{error}</div>}{" "}
      {/* Display error message */}
    </LibraryContext.Provider>
  );
};

export { LibraryProvider, LibraryContext };
