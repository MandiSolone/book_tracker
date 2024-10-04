(function (global, factory) {if (typeof define === "function" && define.amd) {define(["exports"], factory);} else if (typeof exports !== "undefined") {factory(exports);} else {var mod = { exports: {} };factory(mod.exports);global.errorHandler = mod.exports;}})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports) {"use strict";Object.defineProperty(_exports, "__esModule", { value: true });_exports.errorHandler = void 0;var errorHandler = _exports.errorHandler = function errorHandler(err, req, res, next) {
    console.error(err);
    res.status(err.status || 500).json({
      name: err.name || "Unknown error",
      msg: err.message || "An error occurred on the server."
    });
  };});
//# sourceMappingURL=errorHandler.js.map