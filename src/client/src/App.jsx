import './styles/global.css'; 
import { React } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import  HomePage  from './pages/HomePage';
import Library from './pages/Library';
import  NavBar from './components/NavBar';


export default function App() {

  return (
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/library" element={<Library />} />
        </Routes>
      </BrowserRouter>
  );
}
