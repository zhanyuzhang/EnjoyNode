var path = require("path"),
  fs = require("fs"),
  ejs = require("ejs");

//in memory data store
var widgets = [
  {
    id: 1,
    name: "My Special Widget",
    price: 100.00,
    descr: "A widget beyoud price"
  }
]; 

//this function used to render dynamic
function toRender(file, params, res) {

  var dir = path.join(__dirname + "/../views/widgets/" + file);

  fs.readFile(dir, "utf8", function(err, data) {
    if(err) {
      res.send(err);
      console.log(err);
    }else {
      // console.log(data);
      // res.end("fuck");
      res.send(ejs.render(data, params));
    }
  });
}

//show all widgets
exports.index = function(req, res) {
  toRender("index.ejs", {widgets: widgets}, res);
};

exports.new = function(req, res) {
  console.log(__dirname);
  var filepath = path.join(__dirname, "/../public/widgets");
  res.sendfile("new.html", { root: filepath});
  // res.send("displaying new widget form");
}

//add widget
exports.create = function(req, res) {
  var indx = widgets.length + 1;
  widgets[widgets.length] = {
    id: indx,
    name: req.body.widgetname,
    price: parseFloat(req.body.widgetprice),
    descr: req.body.desc
  };

  console.log("add " + JSON.stringify(widgets[indx - 1]));
  toRender("added.ejs", {widget: widgets[indx - 1]}, res);
  // res.send("Widget " + req.body.widgetname + " add with id" + indx);
};

//show widget by id
exports.show = function(req, res) {
  var indx = parseInt(req.params.id) - 1;
  if(!widgets[indx]) {
    res.send("There is no widget with id of " + req.params.id);
  } else {
   toRender("show.ejs", {title: "delete", widget: widgets[indx]}, res)
  }
};

//delete widget by id
exports.destroy = function(req, res) {
  var indx = parseInt(req.params.id) - 1;
  widgets.splice(indx, 1);

  console.log("deleted " + req.params.id);
  res.send("deleted " + req.params.id + " " + JSON.stringify(widgets));

};

//displaying edit form
exports.edit = function(req, res) {

  var indx = parseInt(req.params.id) - 1;
  toRender("edit.ejs", {widget: widgets[indx]}, res);
  // res.send("displaying edit form");
};

//update widget by id
exports.update = function(req, res) {

  var indx = parseInt(req.params.id) - 1;

  widgets[indx] = {
    id: indx,
    name: req.body.widgetname,
    price: parseFloat(req.body.widgetprice),
    descr: req.body.widgetdescmmm
  };

  console.log(widgets[indx]);
    toRender("added.ejs", {widget: widgets[indx]}, res);
  // res.send("Update " + req.params.id);
};