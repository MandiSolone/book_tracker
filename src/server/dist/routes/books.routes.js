"use strict";var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports, "__esModule", { value: true });exports["default"] = void 0;var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));var _express = _interopRequireDefault(require("express"));
var _books = _interopRequireDefault(require("../controllers/books.controllers"));function ownKeys(e, r) {var t = Object.keys(e);if (Object.getOwnPropertySymbols) {var o = Object.getOwnPropertySymbols(e);r && (o = o.filter(function (r) {return Object.getOwnPropertyDescriptor(e, r).enumerable;})), t.push.apply(t, o);}return t;}function _objectSpread(e) {for (var r = 1; r < arguments.length; r++) {var t = null != arguments[r] ? arguments[r] : {};r % 2 ? ownKeys(Object(t), !0).forEach(function (r) {(0, _defineProperty2["default"])(e, r, t[r]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) {Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));});}return e;}

// Requests will reach these routes already matching /api/books
var BooksRouter = _express["default"].Router();

//? means id is optional
BooksRouter.get("/:book_id?", /*#__PURE__*/function () {var _ref = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {var userId, book_id, formatBookData, data, booksList;return _regenerator["default"].wrap(function _callee$(_context) {while (1) switch (_context.prev = _context.next) {case 0:if (
          req.isAuthenticated()) {_context.next = 2;break;}return _context.abrupt("return",
          res.status(401).json({ message: "User not authenticated" }));case 2:

          userId = req.user.id; // This comes from the session/auth middleware
          book_id = req.params.book_id;_context.prev = 4;


          formatBookData = function formatBookData(book) {return {
              book_id: book.book_id,
              user_id: book.user_id,
              title: book.title,
              authors: book.authors,
              comments: book.comments,
              link: book.link,
              image: book.image,
              google_id: book.google_id,
              type: book.type,
              location: book.location,
              status: book.status,
              rating: book.rating
            };};if (!

          book_id) {_context.next = 15;break;}_context.next = 9;return (
            _books["default"].findOne(book_id, userId));case 9:data = _context.sent;if (
          data) {_context.next = 12;break;}return _context.abrupt("return",
          res.status(404).json({ message: "Book not found" }));case 12:return _context.abrupt("return",

          res.json(formatBookData(data)));case 15:_context.next = 17;return (

            _books["default"].findAll({ user_id: userId }));case 17:booksList = _context.sent;return _context.abrupt("return",
          res.json(booksList.map(formatBookData)));case 19:_context.next = 25;break;case 21:_context.prev = 21;_context.t0 = _context["catch"](4);


          console.error("Error fetching book data:", _context.t0);return _context.abrupt("return",
          next(_context.t0));case 25:case "end":return _context.stop();}}, _callee, null, [[4, 21]]);}));return function (_x, _x2, _x3) {return _ref.apply(this, arguments);};}()

);

BooksRouter.post("/", /*#__PURE__*/function () {var _ref2 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {var userId, newBook, bookWithUserId, data;return _regenerator["default"].wrap(function _callee2$(_context2) {while (1) switch (_context2.prev = _context2.next) {case 0:if (
          req.isAuthenticated()) {_context2.next = 2;break;}return _context2.abrupt("return",
          res.status(401).json({ message: "User not authenticated" }));case 2:

          userId = req.user.id;
          newBook = req.body;_context2.prev = 4;


          // Include user_id in the book data
          bookWithUserId = _objectSpread(_objectSpread({},
          newBook), {}, {
            user_id: userId // Add the user ID to the new book data
          });_context2.next = 8;return (

            _books["default"].addOne(bookWithUserId));case 8:data = _context2.sent; // Pass newBook to addOne

          res.status(201).json({
            id: data.book_id,
            title: data.title,
            user_id: data.user_id,
            authors: data.authors || [],
            comments: data.comments,
            link: data.link,
            image: data.image,
            google_id: data.google_id,
            type: data.type,
            location: data.location,
            status: data.status,
            rating: data.rating
          });_context2.next = 15;break;case 12:_context2.prev = 12;_context2.t0 = _context2["catch"](4);

          next(_context2.t0);case 15:case "end":return _context2.stop();}}, _callee2, null, [[4, 12]]);}));return function (_x4, _x5, _x6) {return _ref2.apply(this, arguments);};}()

);

BooksRouter["delete"]("/:book_id", /*#__PURE__*/function () {var _ref3 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res, next) {var book_id;return _regenerator["default"].wrap(function _callee3$(_context3) {while (1) switch (_context3.prev = _context3.next) {case 0:_context3.prev = 0;

          book_id = req.params.book_id;_context3.next = 4;return (
            _books["default"].removeOne(book_id));case 4:
          res.json({ message: "Book deleted", book_id: book_id });_context3.next = 10;break;case 7:_context3.prev = 7;_context3.t0 = _context3["catch"](0);

          next(_context3.t0);case 10:case "end":return _context3.stop();}}, _callee3, null, [[0, 7]]);}));return function (_x7, _x8, _x9) {return _ref3.apply(this, arguments);};}()

);

BooksRouter.put("/:book_id", /*#__PURE__*/function () {var _ref4 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res, next) {var userId, updatedBook, book_id, updatedResult;return _regenerator["default"].wrap(function _callee4$(_context4) {while (1) switch (_context4.prev = _context4.next) {case 0:if (
          req.isAuthenticated()) {_context4.next = 2;break;}return _context4.abrupt("return",
          res.status(401).json({ message: "User not authenticated" }));case 2:

          userId = req.user.id;
          updatedBook = req.body; // Get updated book data from request body
          book_id = req.params.book_id; // Extract book_id from request param
          _context4.prev = 5;_context4.next = 8;return (


            _books["default"].updateOne(updatedBook, book_id, userId));case 8:updatedResult = _context4.sent;if (


          updatedResult.affectedRows) {_context4.next = 11;break;}return _context4.abrupt("return",
          res.
          status(404).
          json({ message: "Book not found or no changes made." }));case 11:


          // Respond with the updated book data
          res.json({
            id: updatedResult.book_id,
            user_id: updatedResult.user_id,
            title: updatedResult.title,
            authors: updatedResult.authors ? updatedResult.authors.split(", ") : [], // split works as input if a string
            comments: updatedResult.comments,
            link: updatedResult.link,
            image: updatedResult.image,
            google_id: updatedResult.google_id,
            type: updatedResult.type,
            location: updatedResult.location,
            status: updatedResult.status,
            rating: updatedResult.rating
          });_context4.next = 18;break;case 14:_context4.prev = 14;_context4.t0 = _context4["catch"](5);

          console.error(_context4.t0);
          next(_context4.t0);case 18:case "end":return _context4.stop();}}, _callee4, null, [[5, 14]]);}));return function (_x10, _x11, _x12) {return _ref4.apply(this, arguments);};}()

);var _default = exports["default"] =

BooksRouter;
//# sourceMappingURL=books.routes.js.map