
/**
 * Module dependencies.
 */

//dependences
var express = require("express"),
  routes = require("./routes"),
  map = require("./maproutecontroller"),
  http = require("http"),
  app = module.exports = express.createServer();

//configurers
app.configure(function(){
  app.set("views", __dirname + "/views");
  app.set("view engine", "ejs"); //use ejs template
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.staticCache({maxObjects: 100, maxLength: 512}));
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

app.get("/", routes.index);


var prefixes = ["widgets"];

//match the router
prefixes.forEach(function(prefix) {
  map.mapRoute(app, prefix);
});

//stat the server an listen on port 3000
app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});

