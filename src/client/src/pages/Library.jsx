import React from "react";
import { useState, useEffect } from "react"; 
import BookForm from "../components/BookForm";
import BookList from "../components/BookList";
// import axios from 'axios';


function Library() {
  const [books, setBooks] = useState([
    { title: 'Book One', author: 'Author One', comment: 'Great book', link: 'http://example.com' },
    { title: 'Book Two', author: 'Author Two', comment: 'Another great book', link: 'http://example.com' },
  ]);

  // useEffect(() => {
  //   // Fetch books from the backend API
  //   axios.get('http://localhost:8080/books')
  //     .then(response => {
  //       setBooks(response.data);
  //     })
  //     .catch(error => {
  //       console.error('Error fetching books:', error);
  //     });
  // }, []);

  const handleDelete = (index) => {
    //Remove the book at the specified index
    setBooks(books.filter((_, i) => i !== index));
  }; 

  const addBook = (book) => {
    setBooks([...books, book]);
  };

  return (
    <div>
      <h1> Library </h1>
      <BookForm addBook={addBook} />
      <BookList books={books} onDelete={handleDelete} />
    </div>
  );
}

export default Library;
