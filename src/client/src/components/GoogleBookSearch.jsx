//Get addToWishList functional
// change alert(`${book.volumeInfo.title} was added to your library!`); (try npm react-toastify?)

import React, { useState } from "react";
import useLibrary from '../hooks/useLibrary';
import style from '../styles/GoogleBookSearch.module.css';

function GoogleBooksSearch() {
  const {libraryAddBook } = useLibrary(); // Use the hook to access libraryAddBook
  const [query, setQuery] = useState(""); // Holds the search input
  const [gSearchedBooks, setGSearchedBooks] = useState([]); // Fetched books from Google API
  const [error, setError] = useState("");
  const [noResultsFound, setNoResultsFound] = useState(false); // New state for no results

  // const [wishlist, setWishlist] = useState([]);

  //Search.routes.js handles request via Google API key
  const handleSearch = async () => {
    if (!query) return;
    try {
      const response = await fetch(`http://localhost:8080/api/search/${query}`);
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      console.log("HandleSearch data", data); 
      setGSearchedBooks(data.items || []);
      setError("");
      setNoResultsFound(data.items.length === 0); // Set no results based on fetched data
    } catch (err) {
      console.error("Error fetching book data:", err);
      setError("Failed to fetch books. Please try again later.");
      setGSearchedBooks([]);
      setNoResultsFound(false); // Reset no results if there's an error
    }
  };

  //Reduce book desscriiption < 50 words
  const truncateDescription = (description) => {
    if (!description) return ""; // If undefined, null, or an empty string, return an empty string.
    const words = description.split(" ");
    return words.length > 50
      ? words.slice(0, 50).join(" ") + "..."
      : description;
  };

  const reduceDataThenAdd= (book) => {
    const bookData = {
      book_id: null, // Use null to allow the database to auto-populate an ID
      image: book.volumeInfo.imageLinks?.smallThumbnail || "https://via.placeholder.com/128x193.png?text=No+Image",
      title: book.volumeInfo.title,
      authors: book.volumeInfo.authors.join(", "),
      google_id: book.id, 
      comments: "",
      link: "",
    };

    console.log("reduceDataThenAdd, bookData:", bookData);
  
    libraryAddBook(bookData)
      .then(() => {
        alert(`${book.volumeInfo.title} was added to your library!`);
        setNoResultsFound(false); // Reset no results found
        setGSearchedBooks([]);//Rest Google Fetched books array to 0 
      })
      .catch((error) => {
        console.error("Error adding book to library:", error);
        setNoResultsFound(true); // Show no results if there was an error
        setGSearchedBooks([]);//Rest Google Fetched books array to 
      });
  };

   // const addToWishlist = (book) => {
  //   setWishlist((prev) => {
  //     const updatedWishlist = [...prev, book];
  //     alert(`${book.volumeInfo.title} was added to your wishlist!`);
  //     console.log("Updated Wishlist:", updatedWishlist); // Log the updated wishlist
  //     return updatedWishlist;
  //   });
  // };

  return (
    <div class={style.body}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for books..."
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSearch();
          }
        }}
      />
      {/* <button onClick={handleSearch}
      >Search</button> */}
      {error && <p style={{ color: "red" }}>{error}</p>}
      
      <div id="results">
        {gSearchedBooks.length > 0 ? (
          gSearchedBooks.map((book) => {
            const { title, authors, description, imageLinks } = book.volumeInfo;
            return (
              <div key={book.id} className="book">
                <img
                  src={
                    imageLinks?.thumbnail || "https://via.placeholder.com/100"
                  }
                  alt={title}
                />
                <div>
                  <h2>{title}</h2>
                  <p>
                    <strong>Author(s):</strong> {authors.join(", ")}
                  </p>
                  <p>{truncateDescription(description)}</p>
                  <button onClick={() => reduceDataThenAdd(book)} >
                    Add to Library
                  </button>
                  {/* <button onClick={() => addToWishlist(book)}>
                    Add to Wishlist */}
                  {/* </button> */}
                </div>
              </div>
            );
          })
        ) : (
          noResultsFound && <p>No results found.</p> // Show only if noResultsFound is true
        )}
      </div>
    </div>
  );
}

export default GoogleBooksSearch;
