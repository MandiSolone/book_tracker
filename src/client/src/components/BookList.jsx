//make sure link is opening a new page. Needs http:// or http.s:// (should I embed that?)
//add a sort by function 
import React from 'react';

function BookList({ books, onDelete }) {
  return (
    <div>
      <h2>All Books</h2>
      <ul>
        {books.map((book) => (
    <li key={book.book_id}>
        <h3>{book.title}</h3>
        <p><strong>Author:</strong> {book.author}</p>
        <p><strong>Comments:</strong> {book.comments}</p>
        <p><strong>Link:</strong> <a href={book.link} target="_blank" rel="noopener noreferrer">{book.link}</a></p>
        <button onClick={() => onDelete(book.book_id)}>Delete</button>
    </li>
))}
      </ul>
    </div>
  );
}

export default BookList;