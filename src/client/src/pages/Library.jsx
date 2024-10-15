//Add a sort by ; type, location, author name,
import React from "react";
import BookList from "../components/BookList";
import useLibrary from "../hooks/useLibrary";

const Library = () => {
  const { libraryBooks, libraryHandleDelete } = useLibrary();
  if (!libraryBooks) {
    return <div>Loading...</div>; // Render loading state
  }

  return (
    <div>
      <h1>Library</h1>
        <BookList blBooks={libraryBooks} blOnDelete={libraryHandleDelete} />
    </div>
  );
};

export default Library;
