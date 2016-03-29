exports.mapRoute = function(app, prefix) {

	prefix = "/" + prefix;

	var prefixObj = require("./controllers/" + prefix);

	//get: index
	app.get(prefix, prefixObj.index);

	//get: add
	app.get(prefix + "/new", prefixObj.new);

	//get: show
	app.get(prefix + "/:sn", prefixObj.show);

	//get: edit
	app.get(prefix + "/:sn/edit", prefixObj.edit);

	//psst: create
	app.post(prefix + "/create", prefixObj.create);

	//put: update
	app.put(prefix + "/:sn", prefixObj.update);

	//desstroy: destroy
	app.del(prefix + "/:sn", prefixObj.destroy);

};