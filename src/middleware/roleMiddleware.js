var roleMiddleware = function (roleName) { return function (req, res, next) {
    if (req.user && req.user.role === roleName) {
        next();
    }
    else {
        res.status(403).send({
            message: 'Resource is forbidden.',
        });
    }
}; };
export default roleMiddleware;
