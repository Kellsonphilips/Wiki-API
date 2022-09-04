const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose")
const ejs = require("ejs");
const _ = require("lodash");
const dbConnect = require("./db/dbConnect");
const Article = require("./db/articleModel");


const app = express();


app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static("public"));

dbConnect();
Article();





/////////////////// Request targetting all articles ///////////////////
app.route("/articles")

    .get( function(req, res) {

    Article.find({}, function(err, foundArticles) {
        if (!err) {
            res.send(foundArticles);
        } else {
            res.send(err);
        }
    });
})

    .post( function(req, res) {

    const newArticle = new Article({
      title: req.body.title,
      content: req.body.content
    });
    newArticle.save(function(err) {
        if(!err) {
            res.send("Successfully added a new article.");
        }else {
            res.send(err);
        }
    });
})

    .delete(function(req, res) {

    Article.deleteMany(function(err) {
        if (!err) {
            res.send("Successfully deleted all the articles 😬.");
        } else {
            res.send(err);
        }
    });
});


//////////////////// Request targetting A specific article //////////////

app.route("/articles/:articlesTitle")

.get(function(req, res) {

    Article.findOne(
      {title: req.params.articlesTitle},
      function (err, foundArticles) {
        if (!err) {
          res.send(foundArticles);
        } else {
          res.send(err);
        }
      }
    );

})

.put(function(req, res) {

    Article.findOneAndUpdate(
      {title: req.params.articlesTitle},
      {title: req.body.title, content: req.body.content},
      {overwrite: true},
      function(err) {
        if (!err) {
          res.send("Succesfully updated article.");
        } else {
            res.send("Article could not be Updated")
        }
      }
    );
})

.patch(function(req, res) {
    
    Article.findOneAndUpdate(
        {title: req.params.articlesTitle},
        {$set: req.body},
        function(err) {
            if(!err) {
                res.send("Successfully updated article");
            } else {
                res.send("Article could not be Updated");
            }
        }
    );
})

.delete(function(req, res) {

    Article.findOneAndDelete(
        {title: req.params.articlesTitle},
        function(err) {
            if (!err) {
                res.send("Successfully deleted an article.")
            } else {
                res.send(err);
            }
        }
    );
});




//////////////// Our server  /////////////////////

app.listen(3000, function(req, res) {
    console.log("Server is started on port: 3000")
});
