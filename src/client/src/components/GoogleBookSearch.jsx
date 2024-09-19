//Get addToLibrary and addToWishList functional
//move styles over to global.css
//Look into context provider / lift state for

import React, { useState } from "react";

  function GoogleBooksSearch({ libraryAddBook}) {
  const [query, setQuery] = useState("");// Holds the search input
  const [gsBooks, setGSBooks] = useState([]);// Fetched books from Google API.
  const [error, setError] = useState("");
  // const [gsLibrary, setGSLibrary] = useState([]); 
  // const [wishlist, setWishlist] = useState([]);
 
  console.log("google search query:", query);
  console.log("gsBooks:", gsBooks);
  console.log("gs Error:", error);
  // console.log("gsLibrary:", gsLibrary);

  const handleSearch = async () => {
    if (!query) return;

    try {
      //Uses server side search.routes.js which will handle the request, add the API key, and fetch data from the Google Books API
      const response = await fetch(`http://localhost:8080/api/search/${query}`);
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      console.log("HandleSearch data", data); 
      setGSBooks(data.items || []);
      setError("");
    } catch (err) {
      console.error("Error fetching book data:", err);
      setError("Failed to fetch books. Please try again later.");
      setGSBooks([]);
    }
  };

  //Reduce description to under 50 words
  const truncateDescription = (description) => {
    if (!description) return ""; // Return an empt string if undefined description
    const words = description.split(" ");
    return words.length > 50
      ? words.slice(0, 50).join(" ") + "..."
      : description;
  };

  const addToLibrary = (book) => {
    const bookData = {
      book_id: book.id,
      image: book.volumeInfo.imageLinks?.thumbnail || "https://via.placeholder.com/128x193.png?text=No+Image",
      title: book.volumeInfo.title,
      authors: book.volumeInfo.authors.join(", "),
      comments: "",
      link: "",
    };
  
    libraryAddBook(bookData);
    alert(`${book.volumeInfo.title} was added to your library!`);
  };

   // const addToWishlist = (book) => {
  //   setWishlist((prev) => {
  //     const updatedWishlist = [...prev, book];
  //     alert(`${book.volumeInfo.title} was added to your wishlist!`);
  //     console.log("Updated Wishlist:", updatedWishlist); // Log the updated wishlist
  //     return updatedWishlist;
  //   });
  // };

//   setGSLibrary((prev) => {
//     const updatedGSLibrary = [...prev, book];
//     alert(`${book.volumeInfo.title} was added to your library!`);
//     console.log("Updated GS Library:", updatedGSLibrary); // Log the updated library
//     return updatedGSLibrary; // where does this return go? 
//   });
// };

// // Extracting relevant data from Google Search BookList
// const simplifiedLibrary = gsLibrary.map((book) => ({
//   book_id: book.id,
//   image:
//     book.volumeInfo.imageLinks?.thumbnail ||
//     "https://via.placeholder.com/100",
//   title: book.volumeInfo.title,
//   authors: book.volumeInfo.authors.join(", "),
//   comments: "", // Set comments to an empty string
//   link: "", // Set link to an empty string
// }));

    // const addToLibrary = (book) => {
  //   console.log("addToLibrary(book)", book); 
  //   libraryAddBook({
  //     book_id: book.id,
  //     image: book.volumeInfo.imageLinks?.thumbnail || "https://via.placeholder.com/128x193.png?text=No+Image",
  //     title: book.volumeInfo.title,
  //     authors: book.volumeInfo.authors.join(", "),
  //     comments: "", // Set comments to an empty string
  //     link: "", // Set link to an empty string
  //   });
  // };

  // const addToLibrary = (book) => {
  //   console.log("addToLibrary book:", book); 
  //   if (!book) {
  //     console.error("No book ID provided for addition");
  //     return;
  //   }
  //   axios.post("http://localhost:8080/api/books", book)
  //     .then((response) => {
  //       // Contains the newly created book with its id
  //       const newBook = response.data;
  //       setBooks((prevBooks) => [...prevBooks, newBook]);
  //     })
  //     .catch((error) => {
  //       console.error("Error adding book:", error);
  //     });
  // };

  // console.log("simplifiedLibrary", simplifiedLibrary); 

  return (
    <div>
      <h1>Search</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for books..."
      />
      <button onClick={handleSearch}>Search</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div id="results">
        {gsBooks.length > 0 ? (
          gsBooks.map((book) => {
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
                  <button onClick={() => addToLibrary(book)}>
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
          <p>No results found.</p>
        )}
      </div>

      <style jsx>{`
        .book {
          margin: 20px;
          border: 1px solid #ccc;
          padding: 10px;
          display: flex;
        }
        .book img {
          max-width: 300px;
          max-height: 200px;
          margin-right: 20px;
        }
        button {
          margin-right: 10px;
          padding: 5px 10px;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default GoogleBooksSearch;
