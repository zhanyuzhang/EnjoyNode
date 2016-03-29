
var Widget = require("../model/widgets.js");

//show all widgets
exports.index = function(req, res) {
  Widget.find({}, function(err, docs) {
    res.render("widgets/index", {title: "Widgets", widgets: docs});
  });
};

exports.new = function(req, res) {
  var filepath = require("path").join(__dirname, "/../public/widgets");
  res.sendfile("new.html", { root: filepath});
  // res.send("displaying new widget form");
}

//add widget
exports.create = function(req, res) {

  var widget = {
    sn: req.body.widgetsn,
    name: req.body.widgetname,
    price: parseFloat(req.body.widgetprice),
    desc: req.body.desc
  };

  var widgetObj = new Widget(widget);

  widgetObj.save(function(err, data) {
    if(err) {
      console.log(err);
      res.send(err);
      return;
    }

    res.render("widgets/added", {title: "fuck", widget: widget});
  });

 };

//show widget by sn
exports.show = function(req, res) {

  var sn = req.params.sn;

  console.log(sn);

  Widget.findOne({sn: sn}, function(err, doc) {
    if(err) {
      res.send(err);
      return;
    }
    // console.log(doc);
    if(doc) {
      res.render("widgets/show", {title: "fuck", widget: doc});
    } else {
      res.send("not exists such widget");
    }

  });
};

//delete widget by sn
exports.destroy = function(req, res) {

  var sn = req.params.sn;

  Widget.remove({sn: sn}, function(err, doc) {
    console.log(JSON.stringify(doc));
    if(err) {
      res.send("There is no widget of " + sn);
      return;
    }
    console.log("deleted " + sn);
    
    Widget.find({}, function(err, docs) {
      res.render("widgets/index", {title: "Widgets", widgets: docs});
    });

  });
};

//displaying edit form
exports.edit = function(req, res) {

  var sn = req.params.sn;
  Widget.findOne({sn: sn}, function(err, doc) {
    if(err) {
      res.send("There is no widget of " + sn);
      return;
    }
    res.render("widgets/edit", {title: "what", widget: doc});
  });
};

//update widget by id
exports.update = function(req, res) {

  var sn = req.params.sn;

  var widget = {
    sn: req.body.widgetsn,
    name: req.body.widgetname,
    price: parseFloat(req.body.widgetprice),
    desc: req.body.widgetdesc
  };

  Widget.update({sn: sn}, widget, function(err) {
    if(err) {
      res.send("err: " + err);
      return;
    }
    res.render("widgets/added", {title: "fuck", widget: widget});
  });
};