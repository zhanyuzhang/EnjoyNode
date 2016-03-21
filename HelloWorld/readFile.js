var http = require("http"),
	fs = require("fs");

http.createServer(function(req, res) {
	fs.readFile("readFile.js", "utf8", function(err, data) {
		res.writeHead(200, {"Content-Type": "text/plain"});
		if(err) {
			res.write("Could not find or open file for reading\n");
		} else {
			res.write(data);
		}
		res.end();
	});
}).listen(8124, function() {console.log("bound to port 8124")});

console.log("Server running on 8124/");

// var http = require("http");

// http.createServer(function(req, res) {
// 	res.writeHead(200, {"content-type": "text/plaiin"});

// 	res.end("Hello, Wrold\n");
// }).listen(8124);

// console.log("Server running on 8124");