import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useLibrary from "../hooks/useLibrary";


const BookDetails = () => {
  const { bookId } = useParams(); // Get bookId from URL parameters
  const { libraryGetBook } = useLibrary(); // Use hook to access LibraryContext
  const [bookDetails, setBookDetails] = useState(null);
  const [error, setError] = useState(null);
  const history = useNavigate(); // Use history for navigation

  useEffect(() => { 

    const fetchBookDetails = async () => {
      try {
        const bookData = await libraryGetBook(bookId);
        if (bookData) {
          setBookDetails(bookData);
          console.log("bookDetails", bookDetails);
        }
      } catch (err) {
        setError("Failed to fetch book details.");
      }
    };

    fetchBookDetails();
  }, [bookId, libraryGetBook]);

  const handleReturn = () => {
    history(-1); // Navigate back to the previous page
  };

  if (error) {
    return <div>{error}</div>; 
  }

  if (!bookDetails) {
    return <div>Loading book details...</div>;
  }

  return (
    <div>
      <h2>{bookDetails.title}</h2>
      <p>Authors: {bookDetails.authors}</p>
      <p>Comments: {bookDetails.comments}</p>
      <p>
      View Book:<a href={bookDetails.link} target="_blank" rel="noopener noreferrer">{bookDetails.link}</a>
    </p>
      <img src={bookDetails.image} alt={bookDetails.title} />
      <p>Status: {bookDetails.status}</p>
      <p>Rating: {bookDetails.rating}</p>
      <button onClick={handleReturn}>
        Back
      </button>
    </div>
  );
};

export default BookDetails;
