
module.exports = async (req,res) => {
    // Sending error, data stored using req.flash
    // Data is sent so that form does not loose prviously filld details
    res.render('signUp', {
        errors: req.flash('registerationErrors'),
        data: req.flash('data')[0]
    })
};

