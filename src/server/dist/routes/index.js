import express from "express";
import booksRouter from "./books.routes.js";
import searchRouter from "./search.routes.js";
import authRouter from "./auth.routes.js";

//Express framework creates new router objects
//Defines routes and handles request
var router = express.Router();

// Test Route // http://localhost:8080/api/test
router.get("/test", function (req, res, next) {
  res.json("Hello World!");
});

// Route handlers
router.use("/books", booksRouter);
router.use("/search", searchRouter);
router.use("/auth", authRouter);

export default router;
//# sourceMappingURL=index.js.map