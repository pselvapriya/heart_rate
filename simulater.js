const express = require("express");
const app = express();
const request = require("request");
const body_parser = require("body-parser");
app.use(body_parser.json());

var API_URL = "https://dev.boodskap.io/api";
var DOMAIN_KEY = "XLOYLUDCHY";
var API_KEY = "7wqaskN4z31b";
var defaultMID = 20000;
var fwver = "1.0";
var dmd = "Vilpower";
var did = "";
var obj = {
    heart_rate: "",
    activity: "",
};
// var i = 1;
var active = [
    "runing",
    "sleeping",
    "working",
    "runing",
    "sleeping",
    "working",
    "runing",
    "sleeping",
    "working",
    "jacking",
];
app.get("/", (req, res) => {
    res.send("server created");
    setInterval(function() {
        for (var j = 1; j <= 10; j++) {
            did = "DEV_" + j;
            // i = i + 1;
            obj.activity = active[j];

            obj.heart_rate = Math.floor(Math.random() * (150 - 50) + 50);

            console.log("inside", obj.heart_rate, obj.activity, did);

            var url = `${API_URL}/push/json/${DOMAIN_KEY}/${API_KEY}/${did}/${dmd}/${fwver}/${defaultMID}`;
            request.post({
                    uri: url,
                    headers: { "content-type": "application/json" },
                    body: JSON.stringify(obj),
                },
                function(err, res, body) {
                    console.log("responce", body);
                    // console.log("responceerr", err);
                }
            );
        }
    }, 3000);
});

app.listen(8080);