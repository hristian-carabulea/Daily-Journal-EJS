
const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const ejs = require("ejs");

const homeStartingContent = 'This is the home page of the "Daily Journal".';
const aboutContent = 'Here is some information about the owner of this "Daily Journal".';
const contactContent = 'Here is the contact information of the "Daily Journal´s" owner.';

let app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// Load the core build.
var _ = require("lodash");

let posts = [];

// To test e.g. challenge 18:
// 1. go to http://localhost:3000/compose, and make two entries: Title 1, title3
// 2. Go to http://localhost:3000/posts/title1, http://localhost:3000/posts/Title2, http://localhost:3000/posts/Title3

//*********************************************************** */
function findPostName (postName) {
  let found = false;
  let positionFound = -1;
  
  postName = _.lowerCase(postName);

  for (var i=0; i<posts.length; i++) {
    postTitle = posts[i].title;
    if ( (_.lowerCase(postName) === _.lowerCase(postTitle)) && !found ) {
      positionFound = i;
      // console.log ("Post title '" + postName + "' found at position " + positionFound + ".");
      found = true;
    }
  }
/*   
  if (!found) {
    console.log ("Post title '" + postName + "' not found. Index is " + positionFound + ".");
  }
 */  
  return positionFound;

}

//*********************************************************** */
function ellipsify (str) {
  if (str.length > 10) {
    return (str.substring(0, 100) + "...");
  }
  else {
    return str;
  }
}

//*********************************************************** */
app.get("/", function (req, res) {
  let year = date("year");
  res.render("home", { homeContent: homeStartingContent, newPosts: posts, copyrightYear: year }); // home.ejs in view
}); // end app.get("/", function(req, res)

//*********************************************************** */
app.get("/about", function (req, res) {
  let year = date("year");
  res.render("about", { aboutContent: aboutContent, copyrightYear: year }); // home.ejs in view
}); // end app.get("/", function(req, res) 

//*********************************************************** */
app.get("/compose", function (req, res){
  let year = date("year");
  res.render("compose", { copyrightYear: year }); // home.ejs in view
}); // end app.get("/", function(req, res)

//*********************************************************** */
app.get("/contact", function (req, res) {
  let year = date("year");
  res.render("contact", { contactContent: contactContent, copyrightYear: year }); // home.ejs in view
}); // end app.get("/", function(req, res)

//*********************************************************** */
app.post("/compose", function(req, res){
  // must have action="compose" in compose.ejs otherwise getting message: cannot post /
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody
  };
  let year = date("year");
  posts.push(post);
  // console.log(post);
    
  res.redirect("/");
});

//*********************************************************** */
app.get("/post", function (req, res) {
  let year = date("year");
  res.render("home", { onePost: posts[0], copyrightYear: year }); // home.ejs in view
}); // end app.get("/", function(req, res)

//*********************************************************** */
app.get("/posts/:postName", function(req,res){ // challenge 16, use express routing to pic any topic under /posts/:topic
  // console.log(req.params.postName); // get dynamic URL
  // console.log(req.params); // display all params

  let foundPosition = findPostName(req.params.postName);
  let year = date("year");
  if (foundPosition > -1) {
    let printTitle = posts[foundPosition].title;
    let printPost  = posts[foundPosition].content;
/* 
    console.log(printTitle);
    console.log(printPost);   

 */    res.render("post", { printTitle: printTitle, printPost: printPost, copyrightYear: year }); // home.ejs in view
  }

});

//*********************************************************** */
app.listen(3000, function() {
  console.log("Server started on port 3000");
});
