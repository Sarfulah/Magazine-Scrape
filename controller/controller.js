var express = require("express");
var exphbs = require("express-handlebars")
var router = express.Router();
var logger = require("morgan");
var mongoose = require("mongoose");
var path = require("path");
var request = require("request");
var cheerio = require("cheerio");
var Comment = require("../models/Note");
var Article = require("../models/Article");
var databaseUrl = "scraper";
var collection = ["scrapedData"];

router.get("/", function (req, res) {
    // res.redirect("/articles");
    res.render("index", {
        article: [{
            title: "Article",
            summary: "Summary",
            link: "Link"
        }]
    });
});

router.get("/scrape", function (req, res) {
    request("https://www.vogue.com/fashion-shows", function (error, response, html) {
        var $ = cheerio.load(html);
        // var titlesArray = [];

        
                 var counter = 0;
                    var data = [];
                    var arrLength = $(".block").length;
                   $(".block").each(function(i, element) {
                      var result = {};
                      result.title = $(element).find("h1.headline").text();
                      result.link = $(element).find("a").attr("href");
                      result.summary = $(element).find("p").text();
                      var entry = new article(result);
                      entry.save(function(err, doc) {
                        if (err) {
                          console.log(err);
                        } else {
                          // console.log(doc);
                          data.push(doc);
                          if (data.length == arrLength){
                            res.json(data);
                          }
                        }
                      }); // closes save
                    }); // this closes the .each
          
              }); // this closes request
          
          }); // this closes the get route
          
          router.get("/articles", function(req, res) {
            // Grab every doc in the Articles array
            article.find({}, function(error, doc) {
              // Log any errors
              if (error) {
                console.log(error);
              }
              // Or send the doc to the browser as a json object
              else {
                res.json(doc);
              }
            });
          });
          
          // Add a Routing Comment
          router.post("/add/comment/:id", function (req, res) {
          
              var articleId = req.params.id;
          
              var commentAuthor = req.body.name;
          
              var commentBody = req.body.comment;
          
              var result = {
                  author: commentAuthor,
                  body: commentBody
              }
          
              var newComment = new comment(result);
          
              newComment.save(function(err, docs) {
                  if (error) {
                      console.log(err);
                  }
                  else {
                      article.findOneAndUpdate({"_id": articleId}, {$push:{"comments": docs.id}},{new: true})
                      .exec(function(err, docs){
                          if (err){
                              console.log(err);
                          } else {
                              res.send(docs);
                          }
                      });
                  }
              });	
          });
          
          // Delete a Rounting Comment
          router.post("/remove/comment/:id", function(req, res){
              var commentId = req.params.id;
              comment.findIdandRemove(commentId, function(err, result) {
                  if (err) {
                      console.log(err);
                  } else {
                      res.send(result);
                  }
              });
          });
          
          // Export router
          module.exports = router;