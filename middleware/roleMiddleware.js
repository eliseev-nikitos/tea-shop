module.exports = function (roles) {
    return function (req, res, next) {
        if (roles.includes(req.user.role)) next()
        else return res.json({message: 'Отказано в доступе'});
    }
}