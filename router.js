const express = require("express");
const router = express.Router();
const cookieParser = require('cookie-parser');
const JSON = require('circular-json');
const session = require('express-session');
const bodyParser = require("body-parser");
const {CLEARSESSION, SESSIONCHECKER, ERRORPAGE} = require("./src/handlers");
const morgan = require("morgan")
const Fetcher = require("./src/service/fetcher")
const logger = require("./src/service/imap.js");
let handler = null;
const CHECKLOGIN = async (req, res, next) => {
    const email = req.body.email,
        password = req.body.pass,
        host = req.body.host;
    const test = new logger(email, password, host);

    const logged = await test.login(email, password, host);
    if (logged) {
        req.conn = test.imap;
        next();
        return;
    }
    res.render("login", {msg: "Login failed"});
}
// MIDDLEWARE FIRST!
router.use(cookieParser());
//router.use(morgan('dev'))
router.use(session({
    key: 'user_sid',
    secret: 'somerandonstuffs',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
}));

router.use(CLEARSESSION);
router.use(bodyParser.urlencoded({
    extended: false
}));

router.use(bodyParser.json());
router.use(express.static('./public'));


router.get("/", SESSIONCHECKER, (req, res) => {
    res.render('login', {
        msg: req.body.msg
    });
});

router.get("/home", (req, res) => {
    if (req.session.user || req.cookies.user_sid) {
        res.cookie("user", JSON.stringify(req.session.user));
        res.render('index');
    } else {
        res.render('login');
    }
});

router.route("/login")
.get(SESSIONCHECKER, (req, res) => {
    res.render('login');
})
.post(CHECKLOGIN, async (req, res) => {
    const imap = req.conn;
    handler = new Fetcher(imap);
    const boxes = await handler.getContainers(); 
    res.render("index", {boxes});
});

router.get("/fetch", async function(req, res) {
    const boxName = req.query.box;
    const emails = await handler.getMails(boxName);
    console.log(emails.messages.total);
    res.json(emails);
})


router.get("/logout", (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
        res.clearCookie('user_sid');
        res.render('login', {
            msg: "Successfully Logged Out"
        });
    } else {
        res.render('login', {
            msg: "Successfully Logged Out"
        });
    }
});
router.use(ERRORPAGE);


module.exports = router;