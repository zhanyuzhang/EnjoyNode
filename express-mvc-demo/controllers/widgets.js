//in memory data store
var widgets = [
  {
    id: 1,
    name: "My Special Widget",
    price: 100.00,
    descr: "A widget beyoud price"
  }
]; 

//show all widgets
exports.index = function(req, res) {
  res.send(widgets);
};

exports.new = function(req, res) {
  res.send("displaying new widget form");
}

//add widget
exports.create = function(req, res) {
  var indx = widgets.length + 1;
  widgets[widgets.length] = {
    id: indx,
    name: req.body.widgetname,
    price: parseFloat(req.body.widgetprice),
    descr: req.body.widgetdesc
  };

  console.log("add " + JSON.stringify(widgets[indx - 1]));
  res.send("Widget " + req.body.widgetname + " add with id" + indx);
};

//show widget by id
exports.show = function(req, res) {
  var indx = parseInt(req.params.id) - 1;
  if(!widgets[indx]) {
    res.send("There is no widget with id of " + req.params.id);
  } else {
    res.send(widgets[indx]);
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
  res.send("displaying edit form");
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
  res.send("Update " + req.params.id);
};