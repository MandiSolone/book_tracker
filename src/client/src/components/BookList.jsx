import React from 'react';

function BookList({ books, onDelete }) {
  return (
    <div>
      <h2>Your Books</h2>
      <ul>
        {books.map((book, index) => (
          <li key={index}>
            <h3>{book.title}</h3>
            <p><strong>Author:</strong> {book.author}</p>
            <p><strong>Comment:</strong> {book.comment}</p>
            <p><strong>Link:</strong> <a href={book.link} target="_blank" rel="noopener noreferrer">View Online</a></p>
            <button onClick={() => onDelete(index)} >Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BookList;