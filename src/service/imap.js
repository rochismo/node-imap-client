const imaps = require("imap-simple");
process.on('uncaughtException', function (err) {
    console.log("Error from process",err);
}); 
module.exports = function logger(email, pass, host) {
    this.imap = {
        imap: {
            user: email,
            password: pass,
            host: host,
            port: 993,
            tls: true,
            authTimeout: 10000
        }
    };
    this.login = async function () {
        return imaps.connect(this.imap);
    }
};