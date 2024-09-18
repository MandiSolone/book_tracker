import './styles/global.css'; 
import { React } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import NavBar from './components/NavBar';
import Library from './pages/Library';
import EBooks from './pages/Ebooks';
import AudioBooks from './pages/AudioBooks';
import HardCopy from './pages/HardCopy';
import Account from './pages/Account';


export default function App() {

  return (
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Library />} />
          <Route path="/library" element={<Library />} />
          <Route path="/ebooks" element={<EBooks />} />
          <Route path="/audiobooks" element={<AudioBooks />} />
          <Route path="/hardcopy" element={<HardCopy />} />
          <Route path="/account" element={<Account />} />
        </Routes>
      </BrowserRouter>
  );
}
