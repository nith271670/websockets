var server = require("ws").Server;
var http = require("http");
var express = require("express");
var app = express();
var port = process.env.PORT || 5000;

app.use(express.static(__dirname + "/"));

var ser = http.createServer(app);
ser.listen(port);

var s = new server({server: ser});
console.log("websocket server created");
// /**********/

// var server = require("ws").Server;
// var s = new server({port: process.env.PORT || 5000});

s.on("connection", function(ws){
    ws.on("message",function(message){
        message = JSON.parse(message);
        if(message.type == 'Name'){
            ws.personName = message.data;
            return;
        }

        console.log("Received"+message);
        s.clients.forEach(function e(client){
            if(client != ws)
           {
                client.send(JSON.stringify({
                name: ws.personName,
                 data: message.data
             }));
           }
                
        })
            // ws.send("from server: "+message);
        
    })
})