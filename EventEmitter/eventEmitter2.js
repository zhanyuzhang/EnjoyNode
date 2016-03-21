//import util, events and fs moudules
var util = require("util"),
	eventEmitter = require("events").EventEmitter,
	fs = require("fs");

//define a constructor,called inputChecker
function inputChecker(name, file) {
	this.name = name;
	this.writeStream = fs.createWriteStream("./" + file + ".txt", {
		"flags": "a",
		"encoding": "utf8",
		"mode": 0666
	});
}

//make inputChecker constructor inherits from EventEmitter
util.inherits(inputChecker, eventEmitter);

//add method "check" to inputChecker
//the method recieves one parameter
//and according to the parameter,there are three events may be fired;
inputChecker.prototype.check = function check(input) {
	var command = input.toString().trim().substr(0, 3);
	if(command == "wr:") {
		// console.log(input);
		this.emit("write", input.slice(3));
	} else if(command == "en:") {
		this.emit("end");
	} else {
		this.emit("echo", input);
	}
};

//create an instance of inputChecker
var ic = new inputChecker("Shelley", "output");

//add events to ic object: write, echo, end
ic.on("write", function(data) {
	this.writeStream.write(data, "utf8");
});

ic.on("echo", function(data) {
	console.log(this.name + " wrote " + data);
});

ic.on("end", function() {
	process.exit();
});

// prepare to input some words
process.stdin.resume();
process.stdin.setEncoding("utf8");
process.stdin.on("data", function(input) {
	ic.check(input);
});

