//add a whole edit book capability (w/ btn, and axios.put/update on server side)
//add a page/link for .get find 1 (server:http://localhost:8080/api/books/1), code client side
//add a type (hardcopy, audio) & location (B&N, Amazon) column
//Add a sort by ; type, location, author name,
//Add public API and pull images for books added manually

import React from "react";
import BookList from "../components/BookList";
import useLibrary from "../hooks/useLibrary";

const Library = () => {
  const { libraryBooks, libraryHandleDelete } = useLibrary();

  return (
    <div>
      <h1>Library</h1>
      <BookList blBooks={libraryBooks} blOnDelete={libraryHandleDelete} />
    </div>
  );
};

export default Library;
