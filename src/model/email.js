/**
 * { attributes:
   { struct: [ [Object] ],
     date: 2013-11-08T20:23:16.000Z,
     flags: [ '\\Seen' ],
     uid: 16 },
  parts:
   [ { which: 'HEADER', size: 1700, body: [Object] },
     { which: 'TEXT',
       size: 500,
       body:
        'Hola Aq-xByPoKeR,\r\n\r\nHas recibido un nuevo mensaje privado de "Freeman" en tu cuenta de "SPSC -\r\nSpanish Pen Spinning Community"=20\r\ncon el siguiente tema:\r\n\r\nRe: hola freeman\r\n\r\nPuedes ver su nuevo mensaje visitando el siguiente enlace:\r\n\r\nhttp://www.penspinning.es/ucp.php?i=3Dpm&mode=3Dview&p=3D19788\r\n\r\nHas solicitado que se te notifique, recuerda que siempre puedes elegir no\r\nser notificado=20\r\nde nuevos mensajes cambiando esta opci=C3=B3n en tu perfil.\r\n\r\n--=20\r\nUn saludo del staff de SPSC\r\n' } ],
  seqNo: 16 }
 */
module.exports = class Email {
    constructor(date,flags,{subject, from},text) {
        this.date = date;
        this.flags = flags;
        this.subject = subject;
        this.from = from;
        this.text = text;
    }
}