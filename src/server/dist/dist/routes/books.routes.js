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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfZXhwcmVzcyIsIl9pbnRlcm9wUmVxdWlyZURlZmF1bHQiLCJyZXF1aXJlIiwiX2Jvb2tzIiwib3duS2V5cyIsImUiLCJyIiwidCIsIk9iamVjdCIsImtleXMiLCJnZXRPd25Qcm9wZXJ0eVN5bWJvbHMiLCJvIiwiZmlsdGVyIiwiZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yIiwiZW51bWVyYWJsZSIsInB1c2giLCJhcHBseSIsIl9vYmplY3RTcHJlYWQiLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJmb3JFYWNoIiwiX2RlZmluZVByb3BlcnR5MiIsImdldE93blByb3BlcnR5RGVzY3JpcHRvcnMiLCJkZWZpbmVQcm9wZXJ0aWVzIiwiZGVmaW5lUHJvcGVydHkiLCJCb29rc1JvdXRlciIsIlJvdXRlciIsImdldCIsIl9yZWYiLCJfYXN5bmNUb0dlbmVyYXRvcjIiLCJfcmVnZW5lcmF0b3IiLCJtYXJrIiwiX2NhbGxlZSIsInJlcSIsInJlcyIsIm5leHQiLCJ1c2VySWQiLCJib29rX2lkIiwiZm9ybWF0Qm9va0RhdGEiLCJkYXRhIiwiYm9va3NMaXN0Iiwid3JhcCIsIl9jYWxsZWUkIiwiX2NvbnRleHQiLCJwcmV2IiwiaXNBdXRoZW50aWNhdGVkIiwiYWJydXB0Iiwic3RhdHVzIiwianNvbiIsIm1lc3NhZ2UiLCJ1c2VyIiwiaWQiLCJwYXJhbXMiLCJib29rIiwidXNlcl9pZCIsInRpdGxlIiwiYXV0aG9ycyIsImNvbW1lbnRzIiwibGluayIsImltYWdlIiwiZ29vZ2xlX2lkIiwidHlwZSIsImxvY2F0aW9uIiwicmF0aW5nIiwiZmluZE9uZSIsInNlbnQiLCJmaW5kQWxsIiwibWFwIiwidDAiLCJjb25zb2xlIiwiZXJyb3IiLCJzdG9wIiwiX3giLCJfeDIiLCJfeDMiLCJwb3N0IiwiX3JlZjIiLCJfY2FsbGVlMiIsIm5ld0Jvb2siLCJib29rV2l0aFVzZXJJZCIsIl9jYWxsZWUyJCIsIl9jb250ZXh0MiIsImJvZHkiLCJhZGRPbmUiLCJfeDQiLCJfeDUiLCJfeDYiLCJfcmVmMyIsIl9jYWxsZWUzIiwiX2NhbGxlZTMkIiwiX2NvbnRleHQzIiwicmVtb3ZlT25lIiwiX3g3IiwiX3g4IiwiX3g5IiwicHV0IiwiX3JlZjQiLCJfY2FsbGVlNCIsInVwZGF0ZWRCb29rIiwidXBkYXRlZFJlc3VsdCIsIl9jYWxsZWU0JCIsIl9jb250ZXh0NCIsInVwZGF0ZU9uZSIsImFmZmVjdGVkUm93cyIsInNwbGl0IiwiX3gxMCIsIl94MTEiLCJfeDEyIiwiX2RlZmF1bHQiLCJleHBvcnRzIl0sInNvdXJjZXMiOlsiLi4vLi4vcm91dGVzL2Jvb2tzLnJvdXRlcy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZXhwcmVzcyBmcm9tIFwiZXhwcmVzc1wiO1xuaW1wb3J0IGJvb2tzIGZyb20gXCIuLi9jb250cm9sbGVycy9ib29rcy5jb250cm9sbGVyc1wiO1xuXG4vLyBSZXF1ZXN0cyB3aWxsIHJlYWNoIHRoZXNlIHJvdXRlcyBhbHJlYWR5IG1hdGNoaW5nIC9hcGkvYm9va3NcbmNvbnN0IEJvb2tzUm91dGVyID0gZXhwcmVzcy5Sb3V0ZXIoKTtcblxuLy8/IG1lYW5zIGlkIGlzIG9wdGlvbmFsXG5Cb29rc1JvdXRlci5nZXQoXCIvOmJvb2tfaWQ/XCIsIGFzeW5jIChyZXEsIHJlcywgbmV4dCkgPT4ge1xuICBpZiAoIXJlcS5pc0F1dGhlbnRpY2F0ZWQoKSkge1xuICAgIHJldHVybiByZXMuc3RhdHVzKDQwMSkuanNvbih7IG1lc3NhZ2U6IFwiVXNlciBub3QgYXV0aGVudGljYXRlZFwiIH0pO1xuICB9XG4gIGNvbnN0IHVzZXJJZCA9IHJlcS51c2VyLmlkOyAvLyBUaGlzIGNvbWVzIGZyb20gdGhlIHNlc3Npb24vYXV0aCBtaWRkbGV3YXJlXG4gIGNvbnN0IHsgYm9va19pZCB9ID0gcmVxLnBhcmFtcztcblxuICB0cnkge1xuICAgIGNvbnN0IGZvcm1hdEJvb2tEYXRhID0gKGJvb2spID0+ICh7XG4gICAgICBib29rX2lkOiBib29rLmJvb2tfaWQsXG4gICAgICB1c2VyX2lkOiBib29rLnVzZXJfaWQsXG4gICAgICB0aXRsZTogYm9vay50aXRsZSxcbiAgICAgIGF1dGhvcnM6IGJvb2suYXV0aG9ycyxcbiAgICAgIGNvbW1lbnRzOiBib29rLmNvbW1lbnRzLFxuICAgICAgbGluazogYm9vay5saW5rLFxuICAgICAgaW1hZ2U6IGJvb2suaW1hZ2UsXG4gICAgICBnb29nbGVfaWQ6IGJvb2suZ29vZ2xlX2lkLFxuICAgICAgdHlwZTogYm9vay50eXBlLFxuICAgICAgbG9jYXRpb246IGJvb2subG9jYXRpb24sXG4gICAgICBzdGF0dXM6IGJvb2suc3RhdHVzLFxuICAgICAgcmF0aW5nOiBib29rLnJhdGluZyxcbiAgICB9KTtcblxuICAgIGlmIChib29rX2lkKSB7XG4gICAgICBjb25zdCBkYXRhID0gYXdhaXQgYm9va3MuZmluZE9uZShib29rX2lkLCB1c2VySWQpO1xuICAgICAgaWYgKCFkYXRhKSB7XG4gICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwNCkuanNvbih7IG1lc3NhZ2U6IFwiQm9vayBub3QgZm91bmRcIiB9KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXMuanNvbihmb3JtYXRCb29rRGF0YShkYXRhKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGJvb2tzTGlzdCA9IGF3YWl0IGJvb2tzLmZpbmRBbGwoeyB1c2VyX2lkOiB1c2VySWQgfSk7IC8vIEZldGNoIGJvb2tzIGZvciB0aGUgYXV0aGVudGljYXRlZCB1c2VyXG4gICAgICByZXR1cm4gcmVzLmpzb24oYm9va3NMaXN0Lm1hcChmb3JtYXRCb29rRGF0YSkpO1xuICAgIH1cbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgY29uc29sZS5lcnJvcihcIkVycm9yIGZldGNoaW5nIGJvb2sgZGF0YTpcIiwgZXJyKTtcbiAgICByZXR1cm4gbmV4dChlcnIpO1xuICB9XG59KTtcblxuQm9va3NSb3V0ZXIucG9zdChcIi9cIiwgYXN5bmMgKHJlcSwgcmVzLCBuZXh0KSA9PiB7XG4gIGlmICghcmVxLmlzQXV0aGVudGljYXRlZCgpKSB7XG4gICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAxKS5qc29uKHsgbWVzc2FnZTogXCJVc2VyIG5vdCBhdXRoZW50aWNhdGVkXCIgfSk7XG4gIH1cbiAgY29uc3QgdXNlcklkID0gcmVxLnVzZXIuaWQ7XG4gIGNvbnN0IG5ld0Jvb2sgPSByZXEuYm9keTtcblxuICB0cnkge1xuICAgIC8vIEluY2x1ZGUgdXNlcl9pZCBpbiB0aGUgYm9vayBkYXRhXG4gICAgY29uc3QgYm9va1dpdGhVc2VySWQgPSB7XG4gICAgICAuLi5uZXdCb29rLFxuICAgICAgdXNlcl9pZDogdXNlcklkLCAvLyBBZGQgdGhlIHVzZXIgSUQgdG8gdGhlIG5ldyBib29rIGRhdGFcbiAgICB9O1xuXG4gICAgbGV0IGRhdGEgPSBhd2FpdCBib29rcy5hZGRPbmUoYm9va1dpdGhVc2VySWQpOyAvLyBQYXNzIG5ld0Jvb2sgdG8gYWRkT25lXG5cbiAgICByZXMuc3RhdHVzKDIwMSkuanNvbih7XG4gICAgICBpZDogZGF0YS5ib29rX2lkLFxuICAgICAgdGl0bGU6IGRhdGEudGl0bGUsXG4gICAgICB1c2VyX2lkOiBkYXRhLnVzZXJfaWQsXG4gICAgICBhdXRob3JzOiBkYXRhLmF1dGhvcnMgfHwgW10sXG4gICAgICBjb21tZW50czogZGF0YS5jb21tZW50cyxcbiAgICAgIGxpbms6IGRhdGEubGluayxcbiAgICAgIGltYWdlOiBkYXRhLmltYWdlLFxuICAgICAgZ29vZ2xlX2lkOiBkYXRhLmdvb2dsZV9pZCxcbiAgICAgIHR5cGU6IGRhdGEudHlwZSxcbiAgICAgIGxvY2F0aW9uOiBkYXRhLmxvY2F0aW9uLFxuICAgICAgc3RhdHVzOiBkYXRhLnN0YXR1cyxcbiAgICAgIHJhdGluZzogZGF0YS5yYXRpbmcsXG4gICAgfSk7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIG5leHQoZXJyKTtcbiAgfVxufSk7XG5cbkJvb2tzUm91dGVyLmRlbGV0ZShcIi86Ym9va19pZFwiLCBhc3luYyAocmVxLCByZXMsIG5leHQpID0+IHtcbiAgdHJ5IHtcbiAgICBsZXQgeyBib29rX2lkIH0gPSByZXEucGFyYW1zO1xuICAgIGF3YWl0IGJvb2tzLnJlbW92ZU9uZShib29rX2lkKTtcbiAgICByZXMuanNvbih7IG1lc3NhZ2U6IFwiQm9vayBkZWxldGVkXCIsIGJvb2tfaWQgfSk7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIG5leHQoZXJyKTtcbiAgfVxufSk7XG5cbkJvb2tzUm91dGVyLnB1dChcIi86Ym9va19pZFwiLCBhc3luYyAocmVxLCByZXMsIG5leHQpID0+IHtcbiAgaWYgKCFyZXEuaXNBdXRoZW50aWNhdGVkKCkpIHtcbiAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDEpLmpzb24oeyBtZXNzYWdlOiBcIlVzZXIgbm90IGF1dGhlbnRpY2F0ZWRcIiB9KTtcbiAgfVxuICBjb25zdCB1c2VySWQgPSByZXEudXNlci5pZDtcbiAgY29uc3QgdXBkYXRlZEJvb2sgPSByZXEuYm9keTsgLy8gR2V0IHVwZGF0ZWQgYm9vayBkYXRhIGZyb20gcmVxdWVzdCBib2R5XG4gIGNvbnN0IHsgYm9va19pZCB9ID0gcmVxLnBhcmFtczsgLy8gRXh0cmFjdCBib29rX2lkIGZyb20gcmVxdWVzdCBwYXJhbVxuXG4gIHRyeSB7XG4gICAgLy8gVXBkYXRlIHRoZSBib29rIGluIHRoZSBkYXRhYmFzZVxuICAgIGNvbnN0IHVwZGF0ZWRSZXN1bHQgPSBhd2FpdCBib29rcy51cGRhdGVPbmUodXBkYXRlZEJvb2ssIGJvb2tfaWQsIHVzZXJJZCk7IC8vIFBhc3MgdXBkYXRlZEJvb2sgZGlyZWN0bHlcblxuICAgIC8vIENoZWNrIGlmIHRoZSB1cGRhdGUgd2FzIHN1Y2Nlc3NmdWxcbiAgICBpZiAoIXVwZGF0ZWRSZXN1bHQuYWZmZWN0ZWRSb3dzKSB7XG4gICAgICByZXR1cm4gcmVzXG4gICAgICAgIC5zdGF0dXMoNDA0KVxuICAgICAgICAuanNvbih7IG1lc3NhZ2U6IFwiQm9vayBub3QgZm91bmQgb3Igbm8gY2hhbmdlcyBtYWRlLlwiIH0pO1xuICAgIH1cblxuICAgIC8vIFJlc3BvbmQgd2l0aCB0aGUgdXBkYXRlZCBib29rIGRhdGFcbiAgICByZXMuanNvbih7XG4gICAgICBpZDogdXBkYXRlZFJlc3VsdC5ib29rX2lkLFxuICAgICAgdXNlcl9pZDogdXBkYXRlZFJlc3VsdC51c2VyX2lkLFxuICAgICAgdGl0bGU6IHVwZGF0ZWRSZXN1bHQudGl0bGUsXG4gICAgICBhdXRob3JzOiB1cGRhdGVkUmVzdWx0LmF1dGhvcnMgPyB1cGRhdGVkUmVzdWx0LmF1dGhvcnMuc3BsaXQoXCIsIFwiKSA6IFtdLCAvLyBzcGxpdCB3b3JrcyBhcyBpbnB1dCBpZiBhIHN0cmluZ1xuICAgICAgY29tbWVudHM6IHVwZGF0ZWRSZXN1bHQuY29tbWVudHMsXG4gICAgICBsaW5rOiB1cGRhdGVkUmVzdWx0LmxpbmssXG4gICAgICBpbWFnZTogdXBkYXRlZFJlc3VsdC5pbWFnZSxcbiAgICAgIGdvb2dsZV9pZDogdXBkYXRlZFJlc3VsdC5nb29nbGVfaWQsXG4gICAgICB0eXBlOiB1cGRhdGVkUmVzdWx0LnR5cGUsXG4gICAgICBsb2NhdGlvbjogdXBkYXRlZFJlc3VsdC5sb2NhdGlvbixcbiAgICAgIHN0YXR1czogdXBkYXRlZFJlc3VsdC5zdGF0dXMsXG4gICAgICByYXRpbmc6IHVwZGF0ZWRSZXN1bHQucmF0aW5nLFxuICAgIH0pO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgbmV4dChlcnIpO1xuICB9XG59KTtcblxuZXhwb3J0IGRlZmF1bHQgQm9va3NSb3V0ZXI7XG4iXSwibWFwcGluZ3MiOiJpZEFBQSxJQUFBQSxRQUFBLEdBQUFDLHNCQUFBLENBQUFDLE9BQUE7QUFDQSxJQUFBQyxNQUFBLEdBQUFGLHNCQUFBLENBQUFDLE9BQUEsc0NBQXFELFNBQUFFLFFBQUFDLENBQUEsRUFBQUMsQ0FBQSxPQUFBQyxDQUFBLEdBQUFDLE1BQUEsQ0FBQUMsSUFBQSxDQUFBSixDQUFBLE1BQUFHLE1BQUEsQ0FBQUUscUJBQUEsT0FBQUMs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