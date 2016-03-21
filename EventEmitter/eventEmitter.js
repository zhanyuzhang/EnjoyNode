//a little demo for learning EventEmitter;

var events = require("events"),
	em = new events.EventEmitter(),
	counter = 0;

setInterval(function() {em.emit("timed", counter++); }, 3000);
em.on("timed", function(data) {
	console.log("timed" + data);
});