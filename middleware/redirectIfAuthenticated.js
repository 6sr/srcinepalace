// Does not allows to enter page when logged in
module.exports = (req, res, next) => {
    if(req.session.userId) {
        return res.redirect('/')
    }
    next()
}
