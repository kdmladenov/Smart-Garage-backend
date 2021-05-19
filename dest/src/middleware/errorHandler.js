"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (callback) => (req, res, next) => {
    callback(req, res, next)
        .catch(next);
};
