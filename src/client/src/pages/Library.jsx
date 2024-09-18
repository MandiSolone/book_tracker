//add a whole edit book capability (w/ btn, and axios.put/update on server side)
//add a page/link for .get find 1 (server:http://localhost:8080/api/books/1), code client side
//add a type (hardcopy, audio) & location (B&N, Amazon) column
//Add a sort by ; type, location, author name, 
//Add public API and pull images 

import React from "react";
import { useState, useEffect } from "react"; 
import BookForm from "../components/BookForm";
import BookList from "../components/BookList";
import axios from 'axios';


function Library() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    // Fetch books from the backend API
    axios.get('http://localhost:8080/api/books')
      .then(response => {
        setBooks(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching books:', error);
      });
  }, []);

  if (loading) {
  return <div>Loading Books...</div>;
}

console.log("books", books); 

const handleDelete = (bookId) => {
  axios.delete(`http://localhost:8080/api/books/${bookId}`)
  .then(() => {
      // Filter out the deleted book using the bookId
      setBooks(books.filter(book => book.book_id !== bookId));
      console.log("Deleted book with ID:", bookId);
  })
  .catch(error => {
      console.error('Error deleting book:', error);
  });
};

const addBook = (book) => {
    axios.post('http://localhost:8080/api/books', book)
      .then(response => {
        // Contains the newly created book with its id
        const newBook = response.data;
        setBooks(prevBooks => [...prevBooks, newBook]);
        })
       .catch(error => {
        console.error('Error adding book:', error);
      });
  };

  return (
    <div>
      <h1> Library </h1>
      <BookForm addBook={addBook} />
      <BookList books={books} onDelete={handleDelete} />
      {/* <GoogleBookSearch addBook={addBook} /> */}
    </div>
  );
}

export default Library;
