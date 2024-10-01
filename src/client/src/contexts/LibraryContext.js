import React, { createContext, useState, useEffect, useCallback } from "react";
import axios from "axios";
import useUser from "../hooks/useUser";

const LibraryContext = createContext();

const LibraryProvider = ({ children }) => {
  const { user } = useUser(); // Hook to UserProfileContext
  const [libraryBooks, setLibraryBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch library books from API & db
  const fetchBooks = useCallback(async () => {
    setLoading(true);
    setError(null); // Reset error state before fetching

  // Don't fetch if user is not authenticated//allows page to load and login btn to appear
    if (!user) {
      setLoading(false);
      return;
    } 

    try {
      const response = await axios.get((`${process.env.REACT_APP_API_URL}/books`), {
        withCredentials: true, // Include credentials for authentication
      });
      setLibraryBooks(
        response.data.map((book) => ({
          book_id: book.book_id,
          user_id: book.user_id,
          title: book.title,
          authors: book.authors,
          comments: book.comments,
          link: book.link,
          image: book.image,
          google_id: book.google_id,
          type: book.type,
          location: book.location,
          status: book.status,
          rating: book.rating,
        }))
      );
    } catch (error) {
      console.error("Error fetching books:", error);
      setError("Failed to load books. Please try again later.");
    } finally {
      setLoading(false); // Stop loading regardless of success or failure
    }
  }, [user]);

  useEffect(() => {
    fetchBooks(); // Fetch books when the component mounts
  }, [fetchBooks]); // Dependency on user to re-fetch when user change

  const libraryAddBook = async (bookData) => {
    try {
      const response = await fetch((`${process.env.REACT_APP_API_URL}/books`), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookData), // No user_id here
        credentials: "include", // Ensure cookies are sent
      });

      if (!response.ok) {
        throw new Error("Failed to add book");
      }
      const data = await response.json();
      setLibraryBooks((prevBooks) => [...prevBooks, data]);
      // Handle successful response
    } catch (error) {
      console.error(error);
    }
  };

  const libraryEditBook = async (updatedBookData) => {
    const bookId = updatedBookData.book_id; // Extract ID from the updated book data
    if (!bookId) {
      console.error("No book ID provided for editing");
      return;
    }
    try {
      const response = await axios.put(
        (`${process.env.REACT_APP_API_URL}/books/${bookId}`),
        updatedBookData,
        { withCredentials: true } // Ensure credentials are sent with the request
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
      await axios.delete (`${process.env.REACT_APP_API_URL}/books/${bookId}`);
      setLibraryBooks((prevBooks) =>
        prevBooks.filter((book) => book.id !== bookId)
      );
    } catch (error) {
      console.error("Error deleting book:", error);
      setError("Failed to delete book. Please try again.");
    }
  };

  const libraryGetBook = async (bookId) => {
    if (!bookId) {
      console.error("No book ID provided for fetching");
      return;
    }

    try {
      const response = await axios.get(
        (`${process.env.REACT_APP_API_URL}/books/${bookId}`),
        {
          withCredentials: true, // Include credentials for authentication
        }
      );
      // API returns the book in the same format as libraryBooks state
      const bookData = response.data;
      return bookData; // Return the fetched book data for use in the component
    } catch (error) {
      console.error("Error fetching book:", error);
      setError("Failed to fetch book details. Please try again.");
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
        libraryGetBook, 
        error, 
        setError, 
      }}
    >
      {children} 
      {/* Display error message */}
      {error && <div className="error-message">{error}</div>}{" "}
    </LibraryContext.Provider>
  );
};

export { LibraryProvider, LibraryContext };
