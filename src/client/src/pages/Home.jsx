import React from 'react';
import GoogleBooksSearch from '../components/GoogleBookSearch';

const Home = ({ libraryAddBook = () => {} }) => {
  
  return (
    <div>
      <h1>Welcome to the Book App</h1>
      <GoogleBooksSearch libraryAddBook={libraryAddBook} />
    </div>
  );
};

export default Home;