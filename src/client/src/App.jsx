import "./styles/global.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import { LibraryProvider } from "./contexts/LibraryContext";
import NavBar from "./components/NavBar";
import Library from "./pages/Library";
import Account from "./pages/Account";
import Search from "./pages/Search";
import WishList from "./pages/WishList";

export default function App() {
  return (
    <LibraryProvider>
      <Router>
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
