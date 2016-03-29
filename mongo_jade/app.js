
/**
 * Module dependencies.
 */

//dependences
var express = require("express"),
  map = require("./maproutecontroller"),
  http = require("http"),
  stylus = require("stylus"),
  mongoose = require("mongoose"),
  main = require("./main"),
  app = module.exports = express.createServer();


//connect to database
mongoose.connect("mongodb://127.0.0.1/WidgetDb");
mongoose.connection.on("open", function() {
  console.log("Connected to Mongoose");
});

//configurers
app.configure(function(){
  app.set("views", __dirname + "/views");
  app.set("view options", {layout: false});
  app.set("view engine", "jade"); //use jade template
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.staticCache({maxObjects: 100, maxLength: 512}));
  app.use(stylus.middleware({
    src: __dirname + "/views",
    dest: __dirname + "/public"
  }));
  app.use(express.static(__dirname + '/public'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.directory(__dirname + '/public'));

  //errors
  app.use(function(req, res, next){
    throw new Error(req.url + ' not found');
  });
  app.use(function(err, req, res, next) {
    console.log(err);
    res.send(err.message);
  });

});


app.configure("development",function() {
  app.use(express.errorHandler());
});

app.get("/", main.index),
app.get("/stats", main.stats);

var prefixes = ["widgets"];

//match the router
prefixes.forEach(function(prefix) {
  map.mapRoute(app, prefix);
});

//stat the server an listen on port 3000
app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});

