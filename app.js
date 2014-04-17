var connect = require('connect');
connect.createServer(
    connect.static(__dirname + "/public")
).listen(9999);

console.log("Sounds like I'm running from " + __dirname + ", goooooood!");
