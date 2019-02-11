/**
 * { Archivo:
   { attribs: [ '\\HasNoChildren' ],
     delimiter: '/',
     children: null,
     parent: null },
 */

module.exports = class Box {
    constructor(name, {attribs, delimiter, children, parent}) {
        this.name = name;
        this.attribs = attribs;
        this.delimiter = delimiter;
        this.children = children;
        this.parent = parent;
    }
}