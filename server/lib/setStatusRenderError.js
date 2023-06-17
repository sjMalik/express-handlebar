

module.exports.setStatusRenderError = function setStatusRenderError(res, statusCode, msg){
    res.statusCode = 500;
    res.render('error', {
        message
    })
};