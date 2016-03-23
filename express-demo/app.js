
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes');

var app = module.exports = express.createServer();

// Configuration

app.configure(function() {
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.methodOverride()); //override request method
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

//in memory data store
var widgets = [
  {
    id: 1,
    name: "My Special Widget",
    price: 100.00,
    descr: "A widget beyoud price"
  }
];


// follows are routes

//add widget
app.post("/widgets/add", function(req, res) {
  var indx = widgets.length + 1;
  widgets[widgets.length] = {
    id: indx,
    name: req.body.widgetname,
    price: parseFloat(req.body.widgetprice),
    descr: req.body.widgetdesc
  };

  console.log("add " + JSON.stringify(widgets[indx - 1]));
  res.send("Widget " + req.body.widgetname + " add with id" + indx);
});

//show widget by id
app.get("/widgets/:id", function(req, res) {
  var indx = parseInt(req.params.id) - 1;
  if(!widgets[indx]) {
    res.send("There is no widget with id of " + req.params.id);
  } else {
    res.send(widgets[indx]);
  }
});

//show all widgets
app.get("/widgets", function(req, res) {
  res.send(widgets);
});

//delete widget by id
app.del("/widgets/:id/delete", function(req, res) {
  var indx = parseInt(req.params.id) - 1;
  widgets.splice(indx, 1);

  console.log("deleted " + req.params.id);
  res.send("deleted " + req.params.id + " " + JSON.stringify(widgets));

});

//update widget by id
app.put("/widgets/:id/update/", function(req, res) {
  var indx = parseInt(req.params.id) - 1;
  widgets[indx] = {
    id: indx,
    name: req.body.widgetname,
    price: parseFloat(req.body.widgetprice),
    descr: req.body.widgetdesc
  };

  console.log(widgets[indx]);
  res.send("Update " + req.params.id);
});

app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
