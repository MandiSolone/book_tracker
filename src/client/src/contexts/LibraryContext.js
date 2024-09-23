import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const LibraryContext = createContext();

const LibraryProvider = ({ children }) => {
  const [libraryBooks, setLibraryBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch library books from API & db
  const fetchBooks = async () => {
    setLoading(true); //Start loading
    try {
      const response = await axios.get("http://localhost:8080/api/books");
      setLibraryBooks(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
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
      setLibraryBooks((prevBooks) => [...prevBooks, response.data]); // Update state immediately
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };

  const libraryEditBook = async (updatedBookData) => {
    const bookId = updatedBookData.id; // Extract ID from the updated book data
    console.log(
      "LibraryContext-libraryEditBook-updatedBookData",
      updatedBookData
    );
    console.log("LibraryContext-libraryEditBook-bookId", bookId);

    if (!bookId) {
      console.error("No book ID provided for editing");
      return;
    }
    try {
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
      }}
    >
      {children}
    </LibraryContext.Provider>
  );
};

export { LibraryProvider, LibraryContext };
