//make sure link is opening a new page. Needs http:// or http.s://
//add a sort by function

import React from "react";

// blBooks=[] set to empty array while awaiting db API fetch from Library
export default function BookList({ blBooks = [], blOnDelete }) {
  console.log("Books in BookList, blBooks:", blBooks);

  //handle defualtImage if broken 
  const BookImage = ({ src }) => {
    const defaultImage = "https://via.placeholder.com/128x193.png?text=No+Image";
  
    return (
      <img
        src={src}
        onError={(e) => {
          e.target.onerror = null; // Prevent looping
          e.target.src = defaultImage; // Set the default image on error
        }}
        alt="Book cover"
        style={{ width: '128px', height: '193px' }} // Adjust size as needed
      />
    );
  };

  return (
    <div>
      <h2>Your Library</h2>
      {blBooks.length === 0 ? (<p>No Books available</p>) : (
      <ul>
        {blBooks.map((book) => (
          <li key={book.id}>
            <BookImage src={book.image} />
            {/* <img src={book.image} alt={book.title} /> */}
            <h2>{book.title}</h2>
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
            <p>
              <strong>Type:</strong> {book.type}
            </p>
            <p>
              <strong>Location:</strong>{book.location}
              </p>
            <p>
              <strong>Status:</strong>{book.status}
            </p>  
            <p>
              <strong>Rating:</strong>{book.rating}
            </p>
            <button
              onClick={() => {
                console.log("Attempting to delete blBook with ID:", book.id);
                blOnDelete(book.id);
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    )}
    </div>
  );
}
