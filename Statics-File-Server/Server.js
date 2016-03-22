//import the necessary modules
var http = require("http"),
	path = require("path"),
	fs = require("fs"),
	mime = require("mime"),
	base = "."; //the basic path

//create an http server 
http.createServer(function(req, res) {

	//base path joins the file's name
	var pathname = base + req.url;

	//print the file path to help debug
	console.log(pathname);

	//to check  whether the file path is correct
	fs.stat(pathname, function(err, stats) {

		//incorrect
		if(err) { 
			res.writeHead(404),
			res.write("Bad request 404\n");
			res.end();

		//to check whether it is a file
		} else if(stats.isFile()) {
			//to set the response header type as the same as request
			var type = mime.lookup(pathname);
			res.setHeader("Content-Type", type);

			res.statusCode = 200;

			//prepare to read the file
			var file = fs.createReadStream(pathname);

			//after open the file, start to output it
			file.on("open", function() {
				file.pipe(res);
			});

			//meet to some errors
			file.on("error", function(err) {
				console.log(err);
			});

		//if the request is directory, response a forbidden msg;
		} else {
			res.writeHead(403);
			res.write("Directory is forbidden");
			res.end();
		}
	});
}).listen(8124); //at port 8124

console.log("Server running at 8124");