var http = require("http");

http.createServer(function(req, res) {
	res.writeHead(200, {"content-type": "text/plaiin"});

	res.end("Hello, Wrold\n");
}).listen(8124);

console.log("Server running on 8124");