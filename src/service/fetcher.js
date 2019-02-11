const Box = require('../model/box');
const Email = require('../model/email');
module.exports = class Fetcher {
    constructor(conn) {
        this.conn = conn;
    }
    
    async init() {
        
    }

    async getContainers() {
        return new Promise((res, rej) => {
            const containers = [];
            this.conn.getBoxes((err, b) => {
                if (err) rej(err);
                for (let box in b) {
                    const {attribs, delimiter, children, parent} = b[box];
                    containers.push(new Box(box, attribs, delimiter, children, parent))
                }
                res(containers)
            })
        })
    }

    async getMails(box) {
        return new Promise((res, rej) => {
            this.conn.openBox(box, function(err, mail) {
                if (err) rej(err);
                res(new Email(mail));
            })
        })
    }
}