import "./styles/global.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import NavBar from "./components/NavBar";
import Library from "./pages/Library";
import Account from "./pages/Account";
import AddBook from "./pages/AddBook";
import WishList from "./pages/WishList";
import BookDetails from "./components/BookDetails";
import { LibraryProvider } from "./contexts/LibraryContext";
import { UserProfileProvider } from "./contexts/UserProfileContext";

export default function App() {
  return (
      <UserProfileProvider>
        <LibraryProvider>
          <Router>
            <NavBar />
            <Routes>
            <Route path="/" element={<Account />} />
            <Route path="/library" element={<Library />} />
            <Route path="/addbook" element={<AddBook />} />
            <Route path="/wishlist" element={<WishList />} />
            <Route path="/bookdetails/:bookId" element={<BookDetails />} />
            </Routes>
          </Router>
        </LibraryProvider>
      </UserProfileProvider>
  );
}
