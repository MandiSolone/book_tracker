import React from "react";
import GoogleBooksSearch from "../components/GoogleBookSearch";

const Search = ({ libraryAddBook }) => {
  return (
    <div>
      <h1>Search for a Book</h1>
      <GoogleBooksSearch libraryAddBook={libraryAddBook} />
    </div>
  );
};

export default Search;
