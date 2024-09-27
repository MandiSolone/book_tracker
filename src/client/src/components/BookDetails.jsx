import React, { useEffect, useState } from 'react';
import useLibrary from '../hooks/useLibrary';

const BookDetails = ({ bookId }) => {
    const { libraryGetBook } = useLibrary(); // Use hook to access
  const [bookDetails, setBookDetails] = useState(null);
  const [error, setError] = useState(null); // State for error handling


  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const bookData = await libraryGetBook(bookId);
        if (bookData) {
          setBookDetails(bookData);
        }
      } catch (err) {
        setError("Failed to fetch book details."); // Set error if fetch fails
      }
    };


    fetchBookDetails();
  }, [bookId, libraryGetBook]);

  if (error) {
    return <div>{error}</div>; // Display error message
  }

  if (!bookDetails) {
    return <div>Loading book details...</div>;
  }

  return (
    <div>
      <h2>{bookDetails.title}</h2>
      <p>Authors: {bookDetails.authors.join(", ")}</p>
      <p>Comments: {bookDetails.comments}</p>
      <p>Link: <a href={bookDetails.link}>View Book</a></p>
      <img src={bookDetails.image} alt={bookDetails.title} />
      <p>Status: {bookDetails.status}</p>
      <p>Rating: {bookDetails.rating}</p>
    </div>
  );
};

export default BookDetails;
