import express from "express";
import booksRouter from "./books.routes";
import searchRouter from "./search.routes"; 

//Express framework creates new router objects
//Defines routes and handles request 
const router = express.Router();

// http://localhost:8080/api/test
router.get("/test", (req, res, next) => {
  res.json("Hello World!");
});

// http://localhost:8080/api/homepage
router.get("/homepage", (req, res, next) => {
  res.json("Hello HomePage!");
});

router.use("/books", booksRouter); 

router.use("/search", searchRouter); 

export default router;
