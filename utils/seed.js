const Club = require('../models/club');
const Comment = require('../models/comment');


// delete all current club and comments

//create three club

//create new comment for each club

const club_seeds = [
	{title:"Manchester United",
	 motto:"Glory glory man utd",
	 stadium:"Old Trafford",
	 city:" Manchester",
	 league:"premier league",
	 captain:"Harry Maguire",
	 image:"https://upload.wikimedia.org/wikipedia/en/thumb/7/7a/Manchester_United_FC_crest.svg/1200px-Manchester_United_FC_crest.svg.png"
	},
	{title:"Juventus",
	 motto:"fino alla fine",
	 stadium:"Allianz Stadium",
	 city:"Turin",
	 league:"serie a",
	 captain:"Chellini",
	 image:"https://upload.wikimedia.org/wikipedia/en/thumb/8/84/Juventus_IF_logo.svg/1200px-Juventus_IF_logo.svg.png"
	}
]

const seed = async() => {
	await Club.deleteMany();
	console.log("deleted all the clubs")
	
	await Comment.deleteMany();
	console.log("deleted all comments")
	
	for( const club_seed of club_seeds) {
		let club = await Club.create(club_seed);
		console.log("created club:", club.title)
		await Comment.create ({
			text : "I wish i can watch match at stadium",
			user : "scoob_doo",
			clubId : club._id 
		})
		console.log("created new comment!")
	}
}

module.exports = seed;