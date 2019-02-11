module.exports = class Email {


    constructor({flags, readOnly, uidvalidity, uidnext, permFlags,
        keyWords, newKeywords, persistentUIDs, nomodseq, messages})
        {
        this.flags = flags;
        this.readOnly = readOnly
        this.uidvalidity = uidvalidity
        this.uidnext = uidnext
        this.permFlags = permFlags
        this.keyWords = keyWords
        this.newKeywords = newKeywords
        this.persistentUIDs = persistentUIDs
        this.nomodseq = nomodseq;
        this.messages = messages
    }
}