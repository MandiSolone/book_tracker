import React, { useState } from "react";
import useLibrary from "../hooks/useLibrary";
import Modal from "./Modal";
import style from "./GoogleBookSearch.module.css";
import useUser from "../hooks/useUser";

function GoogleBooksSearch() {
  const { libraryAddBook } = useLibrary(); // Hook libraryAddBook
  const { user } = useUser(); // Hook logged-in user info
  const [query, setQuery] = useState(""); // Holds search input
  const [gSearchedBooks, setGSearchedBooks] = useState([]); // Fetched from Google API
  const [error, setError] = useState("");
  const [noResultsFound, setNoResultsFound] = useState(false); // New state for no results
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  // Doesn't show search bar if user isn't signed in
  if (!user) {
    return;
  }

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  // Close Btn
  const closeResults = () => {
    setGSearchedBooks([]); // Clear searched books
  };

  //Search.routes.js handles request via Google API key
  const handleSearch = async () => {
    if (!query) return;
    try {
      const response = await fetch(`http://localhost:8080/api/search/${query}`);
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
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

  // Reduce book description < 50 words
  const truncateDescription = (description) => {
    if (!description) return ""; // If undefined, null, or an empty string, return an empty string.
    const words = description.split(" ");
    return words.length > 50
      ? words.slice(0, 50).join(" ") + "..."
      : description;
  };

  const reduceDataThenAdd = (book) => {
    if (!user) {
      console.error("User not logged in.");
      return; // Don't proceed if the user is not logged in
    }

     // Check if authors exist and are not empty
  const authorsString = 
  book.volumeInfo.authors && book.volumeInfo.authors.length > 0
    ? book.volumeInfo.authors.join(", ") // Convert authors array to a string
    : "Unknown Author"; // Default value if authors are null, blank, or empty
    
    const bookData = {
      book_id: null, // Use null to allow the db to auto-populate an ID
      user_id: user.id,
      image:
        book.volumeInfo.imageLinks?.smallThumbnail ||
        "https://via.placeholder.com/128x193.png?text=No+Image",
      title: book.volumeInfo.title,
      authors: authorsString, // Use the joined string from above here
      google_id: book.id,
      comments: "",
      link: "",
      type: "",
      location: "",
      status: "",
      rating: "",
    };

    libraryAddBook(bookData) // Call LibraryAddBook from LibraryContext and feed bookData
      .then(() => {
        setModalMessage(`${book.volumeInfo.title} was added to your library!`);
        setIsModalOpen(true);
        setTimeout(() => {
          closeModal();
        }, 2000); // Set timeout
        setNoResultsFound(false); // Reset no results found
        setGSearchedBooks([]); //Rest Google Fetched books array to 0
      })
      .catch((error) => {
        console.error("Error adding book to library:", error);
        setNoResultsFound(true); // Show no results if there was an error
        setGSearchedBooks([]); // Rest Google Fetched books array to
      });
  };

  return (
    <div className={style.body}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for books..."
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch();
          }
        }}
      />
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div>
        <button  className={gSearchedBooks.length > 0 ? style.visible : style.hidden} onClick={closeResults}>
          &times;
        </button>

        <div id="results">
          {gSearchedBooks.length > 0
            ? gSearchedBooks.map((book) => {
                const { title, authors, description, imageLinks } =
                  book.volumeInfo;
                return (
                  <div key={book.id} className={style.bookDiv}>
                    <img
                      className={style.bookImg}
                      src={
                        imageLinks?.thumbnail ||
                        "https://via.placeholder.com/100"
                      }
                      alt={title}
                    />
                    <div>
                      <h2 className={style.title}>{title}</h2>
                      <p className="bookParagraph">
                        <strong>Author(s):</strong> {authors}
                      </p>
                      <p className={style.bookParagraph}>
                        {truncateDescription(description)}
                      </p>
                      <button onClick={() => reduceDataThenAdd(book)}>
                        Add to Library
                      </button>
                    </div>
                  </div>
                );
              })
            : noResultsFound && <p>No results found.</p>}
        </div>
      </div>
      {/* Modal for notification message */}
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <h2>Notification</h2>
          <p>{modalMessage}</p>
        </Modal>
      )}
    </div>
  );
}

export default GoogleBooksSearch;
