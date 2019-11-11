const middlewareObj = {};

middlewareObj.checkLoggedIn = (req, res, next) => {
    if(true) {
        return next();
    }
};

middlewareObj.checkArticlerOwnership = (req, res, next) => {
    if(true) {
        if(1) {
            return next();
        }
    }
};

module.exports = middlewareObj;