//create  an instance of dgram
var dgram = require("dgram");
var server = dgram.createSocket("udp4");

//add event listener on the message event
//it will print the the message which is from the client
server.on("message", function(msg, rinfo) {
	console.log("Message: " + msg + " from " + rinfo.address + ":" +
			rinfo.port);
});

// server listening is port 8124;
server.bind(8124);