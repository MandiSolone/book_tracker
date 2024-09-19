//add a whole edit book capability (w/ btn, and axios.put/update on server side)
//add a page/link for .get find 1 (server:http://localhost:8080/api/books/1), code client side
//add a type (hardcopy, audio) & location (B&N, Amazon) column
//Add a sort by ; type, location, author name,
//Add public API and pull images

import React from "react";
import { useState, useEffect } from "react";
import BookForm from "../components/BookForm";
import BookList from "../components/BookList";
import axios from "axios";

function Library() {
  const [libraryBooks, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  console.log("libraryBooks", libraryBooks);
  console.log("library loading status", loading);

  //The useEffect hook fetches the books when the component mounts, updating the state once the data is retrieved.
  useEffect(() => {
    // Fetch books from the backend API & db
    axios
      .get("http://localhost:8080/api/books")
      .then((response) => {
        console.log("Library Fetched books:", response.data);
        setBooks(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching books:", error);
      });
  }, []);

  if (loading) {
    return <div>Loading Books...</div>;
  }

  const libraryHandleDelete = (book_id) => {
    console.log("Attempting to delete book with ID:", book_id);
    if (!book_id) {
      console.error("No book ID provided for deletion");
      return;
    }
    axios
      .delete(`http://localhost:8080/api/books/${book_id}`)
      .then(() => {
        // Filter out the deleted book using the book_id
        setBooks((preBooks) => preBooks.filter((book) => book.id !== book_id));
        console.log("Deleted book with ID:", book_id);
      })
      .catch((error) => {
        console.error("Error deleting book:", error);
      });
  };

  const libraryAddBook = (book) => {
    if (!book) {
      console.error("No book ID provided for addition");
      return;
    }
    axios.post("http://localhost:8080/api/books", book)
      .then((response) => {
        // Contains the newly created book with its id
        const newBook = response.data;
        setBooks((prevBooks) => [...prevBooks, newBook]);
      })
      .catch((error) => {
        console.error("Error adding book:", error);
      });
  };

  return (
    <div>
      <h1> Library </h1>
      <BookForm addBook={libraryAddBook} />
      <BookList blBooks={libraryBooks} blOnDelete={libraryHandleDelete} />
    </div>
  );
}

export default Library;
