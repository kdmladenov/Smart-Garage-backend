"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const roleMiddleware = (roleName) => (req, res, next) => {
    if (req.user && req.user.role === roleName) {
        next();
    }
    else {
        res.status(403).send({
            message: 'Resource is forbidden.',
        });
    }
};
exports.default = roleMiddleware;
