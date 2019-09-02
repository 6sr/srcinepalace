const user = require('../database/models/User')

// Permits action when user is registered
module.exports = (req, res, next) => {
    // Fetch user from database
    user.findById(req.session.userId, (error, user) => {
        if(error || !user) {
            // If user is not present or any other error is caused
            return res.redirect('/')
        }
        next()
    })
}
