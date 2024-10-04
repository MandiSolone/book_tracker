"use strict";var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports, "__esModule", { value: true });exports["default"] = void 0;var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));var _express = _interopRequireDefault(require("express"));
var _dotenv = _interopRequireDefault(require("dotenv"));
var _axios = _interopRequireDefault(require("axios"));

// Requests will reach these routes already matching /api/search
var SearchRouter = _express["default"].Router();

_dotenv["default"].config();
var GOOGLE_BOOKS_API = "https://www.googleapis.com/books/v1/volumes?q=";
var API_KEY = process.env.GOOGLE_BOOKS_API_KEY;

SearchRouter.get("/:query", /*#__PURE__*/function () {var _ref = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {var query, response;return _regenerator["default"].wrap(function _callee$(_context) {while (1) switch (_context.prev = _context.next) {case 0:_context.prev = 0;

          query = req.params.query;_context.next = 4;return (
            _axios["default"].get("".concat(
              GOOGLE_BOOKS_API).concat(query, "&key=").concat(API_KEY)
            ));case 4:response = _context.sent;
          res.json(response.data);_context.next = 12;break;case 8:_context.prev = 8;_context.t0 = _context["catch"](0);

          console.error("Error fetching data from Google Books API:", _context.t0);
          next(_context.t0);case 12:case "end":return _context.stop();}}, _callee, null, [[0, 8]]);}));return function (_x, _x2, _x3) {return _ref.apply(this, arguments);};}()

);var _default = exports["default"] =

SearchRouter;
//# sourceMappingURL=search.routes.js.map