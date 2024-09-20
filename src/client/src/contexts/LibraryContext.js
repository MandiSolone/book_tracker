import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const LibraryContext = createContext();

export const LibraryProvider = ({ children }) => {
  const [libraryBooks, setLibraryBooks] = useState([]);

  // Fetch library books from API & db
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/books");
        setLibraryBooks(response.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
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
      setLibraryBooks((prevBooks) => [...prevBooks, response.data]);
    } catch (error) {
      console.error("Error adding book:", error);
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

  return (
    <LibraryContext.Provider
      value={{ libraryBooks, libraryAddBook, libraryHandleDelete }}
    >
      {children}
    </LibraryContext.Provider>
  );
};
