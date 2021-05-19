"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// extend interface
// interface AuthenticatedRequest extends Request {
//   user: { role: string, email: string, userId: string }
// }
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
