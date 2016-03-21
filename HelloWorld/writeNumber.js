var http = require("http"),
	fs = require("fs");

function writeNumbers(res) {
	var counter = 0,
		n = 100;

	for(var i = 0; i < n; i++) {
		counter++;
		res.write(counter.toString() + "\n");
	}
}

http.createServer(function(req, res) {
	var query = require("url").parse(req.url).query,
		app = require("querystring").parse(query).file + ".txt";

	console.log(req.url);
	console.log(app);

	res.writeHead(200, {"Content-Type": "text/plain"});

	writeNumbers(res);

	setTimeout(function() {
		console.log("opening " + app);
		fs.readFile(app, "utf8", function(err, data) {
			if(err) {
				res.write("Could not find or open file for reading\n");
			} else {
				res.write(data);
			}

			res.end();
		})
	}, 2000);
}).listen(8124);
console.log("Server running at 8124");