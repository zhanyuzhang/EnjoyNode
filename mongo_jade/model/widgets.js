var mongoose = require("mongoose"),
    Schema = mongoose.Schema,
	ObjectId = Schema.ObjectId;

var Widget = new Schema({
	sn: {type: String, require: true, trim: true, unique: true},
	name: {type: String, require: true, trim: true},
	desc: String,
	price: Number
});

module.exports = mongoose.model("widget", Widget);