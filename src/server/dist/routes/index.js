"use strict";var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports, "__esModule", { value: true });exports["default"] = void 0;var _express = _interopRequireDefault(require("express"));
var _books = _interopRequireDefault(require("./books.routes"));
var _search = _interopRequireDefault(require("./search.routes"));
var _auth = _interopRequireDefault(require("./auth.routes"));

//Express framework creates new router objects
//Defines routes and handles request
var router = _express["default"].Router();

// Test Route // http://localhost:8080/api/test
router.get("/test", function (req, res, next) {
  res.json("Hello World!");
});

// Route handlers
router.use("/books", _books["default"]);
router.use("/search", _search["default"]);
router.use("/auth", _auth["default"]);var _default = exports["default"] =

router;
//# sourceMappingURL=index.js.map