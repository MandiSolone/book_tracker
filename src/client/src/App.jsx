/*add autho for user sign up & in
any more push or pull APIS?*/
//header should scroll with mouse down/up
//paganantion - search it doesn't come up with 100 results
///code to populate top fav books or something//

import "./styles/global.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import NavBar from "./components/NavBar";
import Library from "./pages/Library";
import Account from "./pages/Account";
import AddBook from "./pages/AddBook";
import WishList from "./pages/WishList";
import { LibraryProvider } from "./contexts/LibraryContext";
import ErrorBoundary from "./components/ErrorBoundary";

export default function App() {
  return (
    <ErrorBoundary>
      <LibraryProvider>
        <Router>
          <NavBar />
          <Routes>
            <Route path="/" element={<Library />} />
            <Route path="/addbook" element={<AddBook />} />
            <Route path="/wishlist" element={<WishList />} />
            <Route path="/account" element={<Account />} />
          </Routes>
        </Router>
      </LibraryProvider>
    </ErrorBoundary>
  );
}
