import './styles/global.css'; 
import { React } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import NavBar from './components/NavBar';
import Library from './pages/Library';
import Account from './pages/Account';
import Home from './pages/Home';
import WishList from './pages/WishList';


export default function App() {

  return (
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/library" element={<Library />} />
          <Route path="/wishlist" element={<WishList />} />
          <Route path="/account" element={<Account />} />
        </Routes>
      </BrowserRouter>
  );
}
