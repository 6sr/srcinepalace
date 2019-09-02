const user = require('../database/models/User')

module.exports = (req,res) => {
    user.create(req.body, (error, user) => {
        if(error) {
            const registerationErrors = Object.keys(error.errors).map(key => error.errors[key].message)
            // Storing error using req.flash
            req.flash('registerationErrors', registerationErrors)

            // Storing data using req.flash
            req.flash('data', req.body)

            return res.redirect('/signup')
        }
        res.redirect('/')
    })
};

