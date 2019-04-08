var expressSanitizer    = require("express-sanitizer"),
    express             = require("express"),
    app                 = express(),
    bodyParser          = require("body-parser"),
    readCsv              = require('./public/scripts/read-csv.js');

// APP CONFIG
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(expressSanitizer());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
   res.redirect("/index"); 
});

// INDEX ROUTE
app.get("/index", function(req, res){
    res.render("index");
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("SERVER IS RUNNING!");
});

