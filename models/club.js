const mongoose = require("mongoose")

const clubSchema = new mongoose.Schema({
	title : String, 
	motto : String,
	stadium: String,
	city: String,
	league: String,
	captain: String,
	image: String
});

clubSchema.index({
	'$**': 'text' 
})

module.exports= mongoose.model("club", clubSchema);
