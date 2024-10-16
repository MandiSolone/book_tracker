import _defineProperty from "@babel/runtime/helpers/defineProperty";import _asyncToGenerator from "@babel/runtime/helpers/asyncToGenerator";function ownKeys(e, r) {var t = Object.keys(e);if (Object.getOwnPropertySymbols) {var o = Object.getOwnPropertySymbols(e);r && (o = o.filter(function (r) {return Object.getOwnPropertyDescriptor(e, r).enumerable;})), t.push.apply(t, o);}return t;}function _objectSpread(e) {for (var r = 1; r < arguments.length; r++) {var t = null != arguments[r] ? arguments[r] : {};r % 2 ? ownKeys(Object(t), !0).forEach(function (r) {_defineProperty(e, r, t[r]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) {Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));});}return e;}import _regeneratorRuntime from "@babel/runtime/regenerator";import express from "express";
import books from "../controllers/books.controllers.js";

// Requests will reach these routes already matching /api/books
var BooksRouter = express.Router();

// ? means id is optional // GET one or GET all
BooksRouter.get("/:book_id?", /*#__PURE__*/function () {var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime.mark(function _callee(req, res, next) {var userId, book_id, formatBookData, data, booksList;return _regeneratorRuntime.wrap(function _callee$(_context) {while (1) switch (_context.prev = _context.next) {case 0:if (
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
            books.findOne(book_id, userId));case 9:data = _context.sent;if (
          data) {_context.next = 12;break;}return _context.abrupt("return",
          res.status(404).json({ message: "Book not found" }));case 12:return _context.abrupt("return",

          res.json(formatBookData(data)));case 15:_context.next = 17;return (


            books.findAll({ user_id: userId }));case 17:booksList = _context.sent;return _context.abrupt("return",
          res.json(booksList.map(formatBookData)));case 19:_context.next = 25;break;case 21:_context.prev = 21;_context.t0 = _context["catch"](4);


          console.error("Error fetching book data:", _context.t0);return _context.abrupt("return",
          next(_context.t0));case 25:case "end":return _context.stop();}}, _callee, null, [[4, 21]]);}));return function (_x, _x2, _x3) {return _ref.apply(this, arguments);};}()

);

BooksRouter.post("/", /*#__PURE__*/function () {var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime.mark(function _callee2(req, res, next) {var userId, newBook, bookWithUserId, data;return _regeneratorRuntime.wrap(function _callee2$(_context2) {while (1) switch (_context2.prev = _context2.next) {case 0:if (
          req.isAuthenticated()) {_context2.next = 2;break;}return _context2.abrupt("return",
          res.status(401).json({ message: "User not authenticated" }));case 2:

          userId = req.user.id;
          newBook = req.body;_context2.prev = 4;


          // Include user_id in the book data
          bookWithUserId = _objectSpread(_objectSpread({},
          newBook), {}, {
            user_id: userId // Add the user ID to the new book data
          });_context2.next = 8;return (

            books.addOne(bookWithUserId));case 8:data = _context2.sent; // Pass newBook to addOne

          res.status(201).json({
            book_id: data.book_id,
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

BooksRouter["delete"]("/:book_id", /*#__PURE__*/function () {var _ref3 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime.mark(function _callee3(req, res, next) {var book_id;return _regeneratorRuntime.wrap(function _callee3$(_context3) {while (1) switch (_context3.prev = _context3.next) {case 0:_context3.prev = 0;

          book_id = req.params.book_id;_context3.next = 4;return (
            books.removeOne(book_id));case 4:
          res.json({ message: "Book deleted", book_id: book_id });_context3.next = 10;break;case 7:_context3.prev = 7;_context3.t0 = _context3["catch"](0);

          next(_context3.t0);case 10:case "end":return _context3.stop();}}, _callee3, null, [[0, 7]]);}));return function (_x7, _x8, _x9) {return _ref3.apply(this, arguments);};}()

);

BooksRouter.put("/:book_id", /*#__PURE__*/function () {var _ref4 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime.mark(function _callee4(req, res, next) {var userId, updatedBook, book_id, updatedResult, freshBook;return _regeneratorRuntime.wrap(function _callee4$(_context4) {while (1) switch (_context4.prev = _context4.next) {case 0:if (
          req.isAuthenticated()) {_context4.next = 2;break;}return _context4.abrupt("return",
          res.status(401).json({ message: "User not authenticated" }));case 2:

          userId = req.user.id;
          updatedBook = req.body; // Get updated book data from request body
          book_id = req.params.book_id; // Extract book_id from request param
          _context4.prev = 5;_context4.next = 8;return (

            books.updateOne(updatedBook, book_id, userId));case 8:updatedResult = _context4.sent;if (

          updatedResult.affectedRows) {_context4.next = 11;break;}return _context4.abrupt("return",
          res.
          status(404).
          json({ message: "Book not found or no changes made." }));case 11:_context4.next = 13;return (


            books.findOne(book_id, userId));case 13:freshBook = _context4.sent;

          res.json({
            book_id: freshBook.book_id,
            user_id: freshBook.user_id,
            title: freshBook.title,
            authors: freshBook.authors.split(", "), // Author is a string
            comments: freshBook.comments,
            link: freshBook.link,
            image: freshBook.image,
            google_id: freshBook.google_id,
            type: freshBook.type,
            location: freshBook.location,
            status: freshBook.status,
            rating: freshBook.rating
          });_context4.next = 21;break;case 17:_context4.prev = 17;_context4.t0 = _context4["catch"](5);

          console.error(_context4.t0);
          next(_context4.t0);case 21:case "end":return _context4.stop();}}, _callee4, null, [[5, 17]]);}));return function (_x10, _x11, _x12) {return _ref4.apply(this, arguments);};}()

);

export default BooksRouter;
//# sourceMappingURL=books.routes.js.map