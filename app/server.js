// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express'); 		// call express
var app        = express(); 				// define our app using express
var bodyParser = require('body-parser');
var http       = require('http');
var path       = require('path');
var url = require("url");

var fs = require('fs');
var drinksRecipes = JSON.parse(fs.readFileSync('recipes.json', 'utf8'));

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser());
app.set('view engine', 'html');

var port = process.env.PORT || 8080; 		// set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); 				// get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/)
router.get('/', function(request, response) {
	response.json({ message: 'welcome to our bar api!' });	
});

// more routes for our API will happen here
router.get('/drinks', function(request, response) {
	response.json(drinksRecipes);
});

router.get('/drinks/:recipeId', function(request, response) {
	var recipe = {message: 'recipe with id:' + request.params.recipeId + ' not found' };
	for (var index = 0; index < drinksRecipes.recipes.length; index ++) {
		if (request.params.recipeId == drinksRecipes.recipes[index].recipeId) {
			recipe = drinksRecipes.recipes[index];
			break;
		}
	}
	console.log('Loading recipe with id:' + request.params.recipeId);
	response.json(recipe);
});


// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);
//app.use('/static', express.static(__dirname + '/public'));	
app.get('/*', function(request, response) {
    var requestUrl = request.url;
    if (request.url == '/') {
        requestUrl = '/index.html';
    } 
    var my_path = url.parse('./public' + requestUrl).pathname;  
    //console.log(my_path);
    var full_path = path.join(process.cwd(),my_path);  
    //console.log(full_path);
    path.exists(full_path,function(exists) { 
		if(!exists){  
            response.writeHeader(404, {"Content-Type": "text/plain"});    
            response.write("404 Not Found\n");    
            response.end();  
        }  
        else{
            console.log(full_path);
            fs.readFile(full_path, "binary", function(err, file) {    
                 if(err) {    
                     response.writeHeader(500, {"Content-Type": "text/plain"});    
                     response.write(err + "\n");    
                     response.end();    
                 
                 }    
                 else{  
                    response.writeHeader(200);    
                    response.write(file, "binary");    
                    response.end();
                }  
                       
            });  
        }  
    });	
});

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Bar Api running on port ' + port);