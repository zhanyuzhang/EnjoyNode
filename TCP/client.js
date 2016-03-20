var net = require("net");
var client = new net.Socket();

//connect to server
client.connect("8124", "localhost", function() {
	console.log("connected to server");
	client.write("who needs a brower to communicate?");
});

//ready to input
process.stdin.resume();

//send input data to server
process.stdin.on("data", function(data) {
	client.write(data);
});

//print the response from server
client.on("data", function(data) {
	console.log(data);
});

//after closed, print the message
client.on("close", function() {
	console.log("connection is closed");
});

