const Imap = require("imap");
process.on('uncaughtException', function (err) {
    console.log("Error from process",err);
}); 
module.exports = function logger(email, pass, host) {
    this.imap = new Imap({
        user: email,
        password: pass,
        host: host,
        port: 993,
        tls: true,
        //debug: console.log
    });
    this.login = async function () {
        this.imap.connect()

        return new Promise((res, rej) => {
            this.imap.once("ready", function() {
                res(true);
            });
            this.imap.once("error", function(e) {
                console.log(e);
                rej(false);
            })
        })
    }
};