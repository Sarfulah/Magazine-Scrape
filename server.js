var express = require("express");
var mongojs = require("mongojs");
var logger = require("morgan");
var mongoose = require("mongoose");
var cheerio = require("cheerio");
var axios = require("axios");
var app = express();
var databaseUrl = "scraper";
var collections = ["scrapedData"];

// var db = mongojs(databaseUrl, collections);
// db.on("error", function(error) {
//     console.log("Database Error:", error);
// });

var db = require("./models");

var PORT = 3333;

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

mongoose.connect("mongodb://localhost/unit18Populater", { useNewUrlParser: true });


app.get("/", function(req, res) {
    res.send("Hello BabyGuuurrl!");
});

app.get("/all", function(req, res) {
    db.scrapedData.find({}, function(err, data) {
        if(err) throw new err;
    })
})

app.get("/scrape", function(req, res) {
    axios.get("").then(function(response) {
        var $ = cheerio.load(response.data);
    })
})

app.listen(3333, function() {
    console.log("App is running on port 3333!");
});

// axios.get("https://www.vogue.com/").then(function(response) {

//   // Load the Response into cheerio and save it to a variable
//   // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
//   var $ = cheerio.load(response.data);

//   // An empty array to save the data that we'll scrape
//   var results = [];

//   // With cheerio, find each p-tag with the "title" class
//   // (i: iterator. element: the current element)
//   $("p.title").each(function(i, element) {



//     // Save the text of the element in a "title" variable
//     var title = $(element).text();

//     // In the currently selected element, look at its child elements (i.e., its a-tags),
//     // then save the values for any "href" attributes that the child elements may have
//     var link = $(element).children().attr("href");

//     // Save these results in an object that we'll push into the results array we defined earlier
//     results.push({
//       title: title,
//       link: link
//     });
//   });

//   // Log the results once you've looped through each of the elements found with cheerio
//   console.log(results);
// });
