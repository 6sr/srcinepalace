// Does not allows to enter page when logged out
module.exports = (req, res, next) => {
    if(!req.session.userId) {
        return res.redirect('/signin')
    }
    next()
}
