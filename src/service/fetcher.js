const Box = require('../model/box');
const Email = require('../model/email');
const Imap = require("imap")
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

    async getMails(box, criterias = ["ALL"], options = {bodies: ["HEADER", "TEXT"]}) {
        await this.conn.openBox(box);
        const results = await this.conn.search(criterias, options);
        console.log(results)
    }

    wipe() {
        this.conn.end();
    }
}