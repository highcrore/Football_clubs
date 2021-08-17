const express = require("express");
const router = express.Router();
const Club = require('../models/club');
const Comment = require('../models/comment');


//INDEX
router.get("/", async (req,res) => {
	try {
		const clubs = await Club.find().exec();
	res.render("clubs.ejs", {clubs});	
	} catch (err){
		console.log(err);
		res.send("you broke it... /index")
	}	
})

//CREATE
router.post("/", async (req,res) => {
	const league = req.body.league.toLowerCase();
	const newClub = {
		title: req.body.title,
		motto: req.body.motto,
		stadium: req.body.stadium,
		city: req.body.city,
		league, 
		captain: req.body.captain,
		image: req.body.image
	}
	try{
		const club = await Club.create(newClub)
		console.log(club)
		res.redirect("/clubs/" +club._id)
	} catch(err) {
		console.log(err);
		res.send("you broke it... /clubs post");
	}
})    


//NEW
router.get("/new", (req,res) => {
	res.render("clubs_new.ejs")
		
})

//search

router.get("/search",async (req,res) => {
	try {
		const clubs = await Club.find({
			$text: {
				$search: req.query.term
			}
		});
		res.render("clubs",{clubs});
	}catch(err) {
		console.log(err)
		res.send("broken search")
	}
})

//SHOW
router.get("/:id", async (req,res)=>{
	try {
		const club = await Club.findById(req.params.id).exec();
		const comments = await Comment.find({clubId:req.params.id});
		res.render("clubs_show.ejs", {club, comments});
	}catch (err) {
		console.log(err)
		res.send("you broke it.. /club/id")
	}
})


//EDIT
router.get("/:id/edit", async (req,res)=>{
	
	try{
		const club = await Club.findById(req.params.id).exec()
		res.render("clubs_edit", {club})	
	}catch(err) {
		console.log(err);
		res.send("you broke it... /club/id/edit")
	}	
})

//UPDATE
router.put("/:id" , async (req,res) =>{
	const league = req.body.league.toLowerCase();
	const club = {
		title: req.body.title,
		motto: req.body.motto,
		stadium: req.body.stadium,
		city: req.body.city,
		league, 
		captain: req.body.captain,
		image: req.body.image
	}
	try{
		const foundclub = await Club.findByIdAndUpdate(req.params.id, club, {new: true}).exec()
		res.redirect(`/clubs/${req.params.id}`)
	} catch(err) {
		console.log(err)
		res.send("you broke it.../club/id put")
	}
})

//DELETE
router.delete("/:id",async (req,res)=>{
	const club = await Club.findByIdAndDelete(req.params.id).exec()
	try{
		console.log("Deleted:", club);
		res.redirect("/clubs");
	}catch(err){
		console.log(err)
		res.send("how can you broke it.../club/delete");
	}
})
		
	



module.exports = router;









