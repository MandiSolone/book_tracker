import React, { useState } from "react";

const GoogleBooksSearch = () => {
  // Holds the search input from the user.
  const [query, setQuery] = useState("");
  // Stores the list of fetched books.
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);
  const [library, setLibrary] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  const handleSearch = async () => {
    if (!query) return;

    try {
      //Uses server side search.routes.js which will handle the request, add the API key, and fetch data from the Google Books API
      const response = await fetch(`http://localhost:8080/api/search/${query}`);

      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      setBooks(data.items || []);
      setError(null);
    } catch (err) {
      console.error("Error fetching book data:", err);
      setError("Failed to fetch books. Please try again later.");
      setBooks([]);
    }
  };

  //Reduce description to under 50 words
  const truncateDescription = (description) => {
    if (!description) return ''; // Return an empt string if undefined description 
    const words = description.split(" ");
    return words.length > 50
      ? words.slice(0, 50).join(" ") + "..."
      : description;
  };

  const addToLibrary = (book) => {
    setLibrary((prev) => [...prev, book]);
    alert(`${book.volumeInfo.title} was added to your library!`);
    console.log("GoogleBookSearch library", library);
};

const addToWishlist = (book) => {
    setWishlist((prev) => [...prev, book]);
    alert(`${book.volumeInfo.title} was added to your wishlist!`);
    console.log("GoogleBookSearch wishlist", wishlist);
};

  return (
    <div>
      <h1>Search For Books</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for books..."
      />
      <button onClick={handleSearch}>Search</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div id="results">
        {books.length > 0 ? (
          books.map((book) => {
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
                  <button onClick={() => addToWishlist(book)}>
                    Add to Wishlist
                  </button>
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
