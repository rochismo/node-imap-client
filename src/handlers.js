module.exports = {
    CLEARSESSION: (req, res, next) => {
        if (req.cookies.user_sid && !req.session.user) {
            res.clearCookie('user_sid');
        }
        next();
    },
    SESSIONCHECKER: (req, res, next) => {
        if (req.session.user && req.cookies.user_sid) {
            res.redirect("/home")
            //res.render('index');
        } else {
            next();
        }
    },
    ERRORPAGE: (req, res, next) => res.status(404).send("Sorry can't find that!")
}