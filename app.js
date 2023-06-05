const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
//we didn't import the pug package because it already imported behind the scene,
//this is not same for all templating Engines

const rootDir = require('./util/path')

const app = express();

//setting the templating engine to pug, (which is the extenstion names of the templating engine files)
app.set('view engine', 'pug');
//this sets the folder where the templating engines will be stored(this is the default folder but I just set it here to make it clear)
//the first argument has to be called views, the second argument is 
//the name of the folder or path to where the templating engine file are kept
app.set('views', 'views');

const adminData = require("./routes/admin");
const shopRoutes = require("./routes/shop");

//do this before your route middleware if you want to parse the incoming request body
//there are types of body parser to use, eg the one for files, check other gitHub repo or files.
//The extended option allows to choose between parsing the URL-encoded data with the querystring library (when false) or the qs library (when true).
//extended” allows for rich objects and arrays to be encoded into the URL-encoded format,
app.use(bodyParser.urlencoded({ extended: true }));

//this routes serves static files like CSS
//it allows access to the folder specified here
//it takes any request that is trying to find a file and forwards it to the 
//path specified here, you can specify more paths
app.use(express.static(path.join(rootDir, "public")));

app.use("/admin", adminData.routes);
app.use(shopRoutes);

//catch all middle-ware, normally used for 404 page
app.use((req, res, next) => {
  //since we have already defined a path to where to templating engine files is stored
  //at the top of this file, we just name the name of the templating engine here in the first argument below,
  //the second argument is the data we are passing to this view
  res.status(404).render('404', { pageTitle: 404})
  //don't call next after you've sent a response becus this will cause an error
  //as sending a response means closing the process
});

app.listen(3000);
