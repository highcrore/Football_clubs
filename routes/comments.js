const express = require("express");
const router = express.Router({mergeParams: true});
const Comment = require('../models/comment');
const Club =  require('../models/club')

router.get("/new", (req,res) => {
	res.render("comments_new.ejs", {clubId:req.params.id})
})

router.post("/", async (req,res) =>{
	try {
		const comment = await Comment.create({
			user: req.body.user,
			text: req.body.text,
			clubId: req.body.clubId
		});
		console.log(comment);
		res.redirect(`/clubs/${req.body.clubId}`)
	} catch(err) {
		console.log(err)
		res.send("Beoken again...POST/ comments")
		}
})

// edit
router.get("/:commentId/edit",async (req,res) =>{
	try{
		const club = await Club.findById(req.params.id).exec();
		const comment = await Comment.findById(req.params.commentId).exec();
		console.log((club))
		console.log(comment)
		res.render("comments_edit",{club,comment})
		
	} catch(err) {
		console.log(err);
		res.send("Broken comment edit get")
	}
})

router.put("/:commentId", async (req,res) => {
	try {
		const comment = await Comment.findByIdAndUpdate(req.params.commentId, {text: req.body.text}, {new: true})
		console.log(comment)
		res.redirect(`/clubs/${req.params.id}`);
	}catch (err) {
		console.log(err);
		req.send("brokeeee comment PUT")
	}
})

router.delete("/:commentId",async (req,res) => {
	try {
		const comment = await Comment.findByIdAndDelete(req.params.commentId);
		console.log(comment);
		res.redirect(`/clubs/${req.params.id}`);
	}catch(err){
		console.log(err)
		res.send("comment delete")
	}
})


module.exports = router;