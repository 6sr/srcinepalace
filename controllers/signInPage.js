
module.exports = async (req,res) => {
    // Sending error stored using req.flash
    res.render('signIn', {
        errors: req.flash('loginErrors'),
    })
};

