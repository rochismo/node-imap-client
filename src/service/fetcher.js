const Box = require('../model/box');
const Email = require('../model/email');
const imaps = require("imap-simple")
module.exports = class Fetcher {
    constructor(conn) {
        this.conn = conn;
    }

    setConnection(conn) {
        this.conn = conn;
    }

    async getContainers() {
        const boxes = await this.conn.getBoxes();
        const container = [];
        for (const box in boxes) {
            container.push(new Box(box, boxes[box]))
        }
        return container;
    }

    async getMails(box, criterias = ["ALL"], options = { bodies: ["HEADER", "TEXT"], struct: true }) {
        await this.conn.openBox(box);
        const results = await this.conn.search(criterias, options);
        var subjects = results.map(function ({attributes, parts}) {
            const {date, flags} = attributes;
            const header = parts[0].body;
            const body = parts[1].body; 
            return new Email(date, flags, header, body);
        });

        return subjects;
    }

    wipe() {
        this.conn.end();
    }
}