const createHttpError = require("http-errors")

module.exports = (roles) => (req, res, next) => {
    if (!req.user) {
        return next(createHttpError(401, "You must be logged in to access this resource"));
    }
    if (!roles.includes(req.user.role)) {
        return next(createHttpError(403, "You do not have permission to access this resource"));
    }
    next();
}