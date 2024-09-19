//make sure link is opening a new page. Needs http:// or http.s:// (should I embed that?)
//add a sort by function

// Div ul of each book being displayed in Library w/ buttons
import React from "react";

//blBooks=[] set to empty array while awaiting db API fetch from Library
export default function BookList({ blBooks = [], blOnDelete }) {
  console.log("Books in BookList, blBooks:", blBooks); // Log the books array

  return (
    <div>
      <h2>Your Library</h2>
      <ul>
        {blBooks.map((book) => (
          <li key={book.id}>
            <img src={book.image} alt={book.title} />
            <h3>{book.title}</h3>
            <p>
              <strong>Author(s):</strong> {book.authors}
            </p>
            <p>
              <strong>Comments:</strong> {book.comments}
            </p>
            <p>
              <strong>Link:</strong>{" "}
              <a href={book.link} target="_blank" rel="noopener noreferrer">
                {book.link}
              </a>
            </p>
            <button
              onClick={() => {
                console.log("Attempting to delete blBook with ID:", book.id); // Log the ID being deleted
                blOnDelete(book.id);
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
