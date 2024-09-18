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
        {/* <p><strong>Location:</strong> {book.location}</p>
        <p><strong>Type:</strong>
              <select value={book.type} readOnly>
                <option value="hardcopy">Hardcopy</option>
                <option value="ebook">Ebook</option>
                <option value="audiobook">Audiobook</option>
                <option value="other">Other</option>
              </select>
            </p> */}
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