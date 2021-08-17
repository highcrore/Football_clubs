const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
	user: String,
	text: String,
	clubId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Club"
	}
});


module.exports=  mongoose.model("comment", commentSchema);
