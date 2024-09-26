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
import ErrorBoundary from "./components/ErrorBoundary";
import { LibraryProvider } from "./contexts/LibraryContext";
import { UserProfileProvider } from "./contexts/UserProfileContext";
// import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <ErrorBoundary>
      <UserProfileProvider>
        <LibraryProvider>
          <Router>
            <NavBar />
            <Routes>
            {/* <Route path="/account" element={<Account />} />
              <Route path="/" element={<ProtectedRoute element={<Library />} />} />
              <Route path="/addbook" element={<ProtectedRoute element={<AddBook />} />} />
              <Route path="/wishlist" element={<ProtectedRoute element={<WishList />} />} />
              <Route path="/account" element={<ProtectedRoute element={<Account />} />} /> */}
            <Route path="/" element={<Library />} />
            <Route path="/addbook" element={<AddBook />} />
            <Route path="/wishlist" element={<WishList />} />
            <Route path="/account" element={<Account />} />
            </Routes>
          </Router>
        </LibraryProvider>
      </UserProfileProvider>
    </ErrorBoundary>
  );
}
