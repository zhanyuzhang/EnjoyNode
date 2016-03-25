exports.mapRoute = function(app, prefix) {

	prefix = "/" + prefix;

	var prefixObj = require("./controllers/" + prefix);

	//get: index
	app.get(prefix, prefixObj.index);

	//get: add
	app.get(prefix + "/new", prefixObj.new);

	//get: show
	app.get(prefix + "/:id", prefixObj.show);

	//get: edit
	app.get(prefix + "/:id/edit", prefixObj.edit);

	//psst: create
	app.post(prefix + "/create", prefixObj.create);

	//put: update
	app.put(prefix + "/:id", prefixObj.update);

	//desstroy: destroy
	app.del(prefix + "/:id", prefixObj.destroy);

};