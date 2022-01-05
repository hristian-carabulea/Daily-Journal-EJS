
const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const ejs = require("ejs");

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

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
function findPostName (postName) {
  let found = false;
  
  postName = _.lowerCase(postName);

  for (var i=0; i<posts.length; i++) {
    let postTitle = _.lowerCase(posts[i].title);
    
    if ((postName === postTitle) && !found) {
      console.log ("Post title '" + postName + "' found.");
      found = true;
    }
  }
  
  if (!found) {
    console.log ("Post title '" + postName + "' not found.");
  }
}

app.get("/posts/:postName", function(req,res){ // challenge 16, use express routing to pic any topic under /posts/:topic
  // console.log(req.params.postName); // get dynamic URL
  // console.log(req.params); // display all params

  findPostName(req.params.postName);

});

app.get("/", function (req, res) {
  let year = date("year");
  res.render("home", { homeContent: homeStartingContent, newPosts: posts, copyrightYear: year }); // home.ejs in view
}); // end app.get("/", function(req, res)

app.get("/about", function (req, res) {
  let year = date("year");
  res.render("about", { aboutContent: aboutContent, copyrightYear: year }); // home.ejs in view
}); // end app.get("/", function(req, res) 

app.get("/contact", function (req, res) {
  let year = date("year");
  res.render("contact", { contactContent: contactContent, copyrightYear: year }); // home.ejs in view
}); // end app.get("/", function(req, res)

app.get("/compose", function (req, res){
  let year = date("year");
  res.render("compose", { copyrightYear: year }); // home.ejs in view
}); // end app.get("/", function(req, res)

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

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
