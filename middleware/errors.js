const errorObj = {};

errorObj.logErrors = (err, req, res, next) => {
    console.log(err.stack);
    next(err);
};

errorObj.clientErrorHandler = (err, req, res, next) => {
    if(req.xhr) {
        res.status(500).send({ error: 'Something failed! '});
    } else {
        next(err);
    }
};

errorObj.errorHandler = (err, req, res, next) => {
    res.status(500);
    res.render('error', { error: err });
};

// default express error handler
// errorObj.errorHandler = (err, req, res, next) => {
//     if(res.headersSent) {
//         return next(err);
//     }
//     res.status(500);
//     res.render('error', { error: err });
// };

module.exports = errorObj;