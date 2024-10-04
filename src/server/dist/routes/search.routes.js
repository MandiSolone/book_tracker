import _asyncToGenerator from "@babel/runtime/helpers/asyncToGenerator";import _regeneratorRuntime from "@babel/runtime/regenerator";import express from "express";
import dotenv from "dotenv";
import axios from "axios";

// Requests will reach these routes already matching /api/search
var SearchRouter = express.Router();

dotenv.config();
var GOOGLE_BOOKS_API = "https://www.googleapis.com/books/v1/volumes?q=";
var API_KEY = process.env.GOOGLE_BOOKS_API_KEY;

SearchRouter.get("/:query", /*#__PURE__*/function () {var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime.mark(function _callee(req, res, next) {var query, response;return _regeneratorRuntime.wrap(function _callee$(_context) {while (1) switch (_context.prev = _context.next) {case 0:_context.prev = 0;

          query = req.params.query;_context.next = 4;return (
            axios.get("".concat(
              GOOGLE_BOOKS_API).concat(query, "&key=").concat(API_KEY)
            ));case 4:response = _context.sent;
          res.json(response.data);_context.next = 12;break;case 8:_context.prev = 8;_context.t0 = _context["catch"](0);

          console.error("Error fetching data from Google Books API:", _context.t0);
          next(_context.t0);case 12:case "end":return _context.stop();}}, _callee, null, [[0, 8]]);}));return function (_x, _x2, _x3) {return _ref.apply(this, arguments);};}()

);

export default SearchRouter;
//# sourceMappingURL=search.routes.js.map