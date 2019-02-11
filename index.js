const express = require("express");
const path = require("path");
const router = require("./router")
const app = express();

app.set('view engine', 'ejs');
app.set('json spaces', 40);
app.set('views', path.join(__dirname, 'views'))

app.use("/", router);

app.listen(3000, function() {
    console.log("Listening @ http://localhost:3000");
})