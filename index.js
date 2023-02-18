// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
    res.json({ greeting: "hello API" });
});

app.get("/api/", (req, res) => {
    const now = new Date();
    const nowUnix = Math.floor(now);
    res.json({ unix: nowUnix, utc: now });
});

app.get("/api/:date", (req, res) => {
    const { date } = req.params;

    const dateInUnix = new Date(Number(date));
    const dateInUtc = new Date(date);

    if (dateInUnix == "Invalid Date" && dateInUtc == "Invalid Date")
        return res.json({ error: "Invalid Date" });

    if (Boolean(Number(date)) !== true) {
        const utcDate = new Date(date);
        const dateUnix = Math.floor(utcDate);
        res.json({ unix: dateUnix, utc: utcDate.toUTCString() });
    } else {
        const dateUTC = new Date(Number(date));
        res.json({ unix: Number(date), utc: dateUTC.toUTCString() });
    }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
    console.log("Your app is listening on port " + listener.address().port);
});
