import express from "express";
import booksRouter from "./books.routes.js";
import searchRouter from "./search.routes.js";
import authRouter from "./auth.routes.js";

//Express framework creates new router objects
//Defines routes and handles request
const router = express.Router();

// Test Route // http://localhost:8080/api/test
router.get("/test", (req, res, next) => {
  res.json("Hello World!");
});

// Route handlers
router.use("/books", booksRouter);
router.use("/search", searchRouter);
router.use("/auth", authRouter);

export default router;
