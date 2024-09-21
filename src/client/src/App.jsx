/*add autho for user sign up & in
any more push or pull APIS?*/

import "./styles/global.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import NavBar from "./components/NavBar";
import Library from "./pages/Library";
import Account from "./pages/Account";
import Search from "./pages/Search";
import WishList from "./pages/WishList";
import { LibraryProvider } from "./contexts/LibraryContext";
import GoogleBooksSearch from "./components/GoogleBookSearch";

export default function App() {
  return (
    <LibraryProvider>
      <Router>
        <GoogleBooksSearch />
        <NavBar />
        <Routes>
          <Route path="/" element={<Library />} />
          <Route path="/library" element={<Library />} />
          <Route path="/search" element={<Search />} />
          <Route path="/wishlist" element={<WishList />} />
          <Route path="/account" element={<Account />} />
        </Routes>
      </Router>
    </LibraryProvider>
  );
}
