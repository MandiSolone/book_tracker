import express from "express";
import dotenv from 'dotenv'; 
import axios from 'axios'; 

// requests will reach these routes already matching /api/books
const router = express.Router(); 

dotenv.config(); 
const GOOGLE_BOOKS_API = "https://www.googleapis.com/books/v1/volumes?q="; 
const API_KEY = process.env.GOOGLE_BOOKS_API_KEY; 

router.get('/:query', async (req, res, next) => {
  try {
    const query = req.params.query;
    const response = await axios.get(`${GOOGLE_BOOKS_API}${query}&key=${API_KEY}`);
    console.log("API key", API_KEY); 
    console.log("Query", query); 
    console.log("Response", response); 
    res.json(response.data);
  } catch (err) {
    console.error('Error fetching data from Google Books API:', err);
    next(err);
  }
});

export default router; 