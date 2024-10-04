(function (global, factory) {if (typeof define === "function" && define.amd) {define(["exports", "express", "./books.routes", "./search.routes", "./auth.routes"], factory);} else if (typeof exports !== "undefined") {factory(exports, require("express"), require("./books.routes"), require("./search.routes"), require("./auth.routes"));} else {var mod = { exports: {} };factory(mod.exports, global.express, global.books, global.search, global.auth);global.index = mod.exports;}})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _express, _books, _search, _auth) {"use strict";var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(_exports, "__esModule", { value: true });_exports["default"] = void 0;_express = _interopRequireDefault(_express);_books = _interopRequireDefault(_books);_search = _interopRequireDefault(_search);_auth = _interopRequireDefault(_auth);




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
  router.use("/auth", _auth["default"]);var _default = _exports["default"] =

  router;});
//# sourceMappingURL=index.js.map