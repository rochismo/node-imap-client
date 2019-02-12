const express = require("express");
const router = express.Router();
const cookieParser = require('cookie-parser');
const JSON = require('circular-json');
const session = require('express-session');
const bodyParser = require("body-parser");
const {
    CLEARSESSION,
    SESSIONCHECKER,
    ERRORPAGE
} = require("./src/handlers");
const morgan = require("morgan")
const Fetcher = require("./src/service/fetcher")
const logger = require("./src/service/imap.js");
const handler = new Fetcher();
const CHECKLOGIN = async (req, res, next) => {
    const email = req.body.email,
        password = req.body.pass,
        host = req.body.host;
    const test = new logger(email, password, host);
    let logged;
    let msg = "Login failed"
    try {
        logged = await test.login(email, password, host);
    } catch(e) {
        msg = "Connection timed out"
    }
    if (logged) {
        req.conn = logged;
        req.session.user = "sahjkdashjkdsahjk";
        next();
    } else {
        res.render("login", {
            msg
        });
    }
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
    res.redirect("/login")
});

router.get("/home", async (req, res) => {
    const boxes = await handler.getContainers();
    if (req.session.user && req.cookies.user_sid) {
        res.cookie("user", JSON.stringify(req.session.user));
        res.render('index', {
            boxes
        });
    } else {
        res.redirect('/login');
    }
});

router.route("/login")
    .get(SESSIONCHECKER, (req, res) => {
        res.render('login');
    })
    .post(CHECKLOGIN, (req, res) => {
        const imap = req.conn;
        handler.setConnection(imap);

        res.redirect("/home");
    });



router.get("/fetch", async function (req, res) {
    const boxName = req.query.box;
    const emails = handler.getMails(boxName, ["ALL"]).then(data => {
        res.json(data);
    }).catch(error => res.json(error));
})


router.get("/logout", (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
        handler.wipe();
        res.clearCookie('user_sid');
        res.redirect('/login');
    } else {
        res.redirect('/login');
    }
});
router.use(ERRORPAGE);


module.exports = router;