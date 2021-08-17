// =====================================
// Imports
// =====================================

// NPM IMPORTS
const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const mongoose = require('mongoose'); 
const methodOverride = require('method-override');
var morgan = require('morgan')
//config imports
const config = require('./config');
//route imports
const clubRoutes = require("./routes/clubs")  
const commentRoutes = require("./routes/comments")
const mainRoutes = require("./routes/main")
//Model Imports
const Club = require('./models/club');
const Comment = require('./models/comment');

// =====================================
// Development
// =====================================
app.use(morgan('tiny'))

//Seed the DB
const seed = require('./utils/seed');
seed();
// =====================================
// CONFIG
// =====================================

// connect to DB
mongoose.connect (config.db.connection, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true});

//Express Config
app.set("view engine", "ejs");
app.use(express.static("public"));

//Body parser Config
app.use(bodyparser.urlencoded({extended:true}));  

//Methd override
app.use(methodOverride('_method'));

// Route Config
app.use(mainRoutes);
app.use("/clubs",clubRoutes);
app.use("/clubs/:id/comments",commentRoutes);

// Listen
 
app.listen(3000, () => {
	console.log("app running....")
})