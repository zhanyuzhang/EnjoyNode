var dgram = require("dgram");
var client = dgram.createSocket("udp4");

//prepare to input words  
process.stdin.resume();

process.stdin.on("data", function(data) {
	console.log(data.toString("utf8"));
	//send input to the server
	client.send(data, 0, data.length, 8124, "localhost",
			function(err, bytes) {
				if(err) {
					console.log("error: " + err);
				} else {
					console.log("successful");
				}
		});
});