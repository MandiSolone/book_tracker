(function (global, factory) {if (typeof define === "function" && define.amd) {define(["exports", "@babel/runtime/regenerator", "@babel/runtime/helpers/asyncToGenerator", "express", "dotenv", "axios"], factory);} else if (typeof exports !== "undefined") {factory(exports, require("@babel/runtime/regenerator"), require("@babel/runtime/helpers/asyncToGenerator"), require("express"), require("dotenv"), require("axios"));} else {var mod = { exports: {} };factory(mod.exports, global.regenerator, global.asyncToGenerator, global.express, global.dotenv, global.axios);global.searchRoutes = mod.exports;}})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _regenerator, _asyncToGenerator2, _express, _dotenv, _axios) {"use strict";var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(_exports, "__esModule", { value: true });_exports["default"] = void 0;_regenerator = _interopRequireDefault(_regenerator);_asyncToGenerator2 = _interopRequireDefault(_asyncToGenerator2);_express = _interopRequireDefault(_express);_dotenv = _interopRequireDefault(_dotenv);_axios = _interopRequireDefault(_axios);



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

  );var _default = _exports["default"] =

  SearchRouter;});
//# sourceMappingURL=search.routes.js.map