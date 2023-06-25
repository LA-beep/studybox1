//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const homeStartingContent = "Welcome to the Studybox Portal, IIT BHU. This portal provides the resources to help students develop their professional skills whether it be in terms of placement, higher studies or internships. You can also find data regarding the Placement & Internship statistics of last year. We have also put up a number of guides containing the experiences of your seniors so that you can learn from their mistakes & achievements. We sincerely hope that you will make the best possible use of this portal.However if you feel something is missing on this portal, do let us know. We would be happy to help you out.";
const aboutContent = "Welcome to the Studybox Portal, IIT BHU. This portal provides the resources to help students develop their professional skills whether it be in terms of placement, higher studies or internships. You can also find data regarding the Placement & Internship statistics of last year. We have also put up a number of guides containing the experiences of your seniors so that you can learn from their mistakes & achievements. We sincerely hope that you will make the best possible use of this portal.However if you feel something is missing on this portal, do let us know. We would be happy to help you out.";
const contactContent = " Email us at studyboxhelp@gmail.com";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/studyboxDB", { useUnifiedTopology: true });

const postSchema = {
  title: String,
  content: String
};

const Post = mongoose.model("Post", postSchema);

app.get("/", function(req, res){

  Post.find({}, function(err, posts){
    res.render("home", {
      startingContent: homeStartingContent,
      posts: posts
      });
  });
});

/*Post.deleteOne({
  title: "df",
})
  .then(function () {
    console.log("Data deleted"); // Success
  })
  .catch(function (error) {
    console.log(error); // Failure
  });*/
app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody
  });


  post.save(function(err){
    if (!err){
        res.redirect("/");
    }
  });
});

app.get("/posts/:postId", function(req, res){

const requestedPostId = req.params.postId;

  Post.findOne({_id: requestedPostId}, function(err, post){
    res.render("post", {
      title: post.title,
      content: post.content
    });
  });

});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
