const user = require('../database/models/User')

module.exports = (req,res) => {
    user.create(req.body, (error, user) => {
        if(error) {
            // console.log(error)
            return res.redirect('/signup')
        }
        // console.log(req.body)
        res.redirect('/')
    })
};

