// Step 3: Require/Loads the express module
const express = require('express');
// body-parser is used to read data payload from the http request body
const bodyParser = require('body-parser'); 
//  path is used to set default directories for MVC and also for the static files
const path  = require('path'); 
// include the defined package
const dbStorage = require('./dbstorage');


// Step 4: Creates our express server
const app = express();

//Serves static files inside the public folder
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'hbs');
app.use(bodyParser.urlencoded({ extended: true }));

//Sets a basic route index.hbs when website initially starts and when home is clicked from the nav bar or whenever a process needs to go back to home 
app.get('/', (req, res) => {
    res.render('index.hbs');
})

// when user clicks on Share or when user clicks Update from listen
app.get('/share', (req, res) => {
    const theKey = req.query.title; // reads the title from the URL if there is any
    let notFound = "";
    if (theKey) {
      console.log(theKey);
      dbStorage.getItem(theKey, function(value){
         console.log('Read value : ',value);
         if (!value) {  // check if there is no returned value
           notFound = "No Such Song";
           res.render('listen',{notFound}); // goes back to listen page if record not found
         } 
         else {
           // change string to object before passing it to listen.hbs 
           const theValue = JSON.parse(value);
           res.render('share',{theValue, notFound}); // share.hbs
         }
      })
  }
  else { // if no title on the url just serve share.shb
    res.render('share');
  }
})


// when user clinks on Listen from the menu bar
app.get('/listen', (req, res) => {
  // set variables to empty string
  let notFound = "";
  let theValue = {title:"", genre:"", artist:"", lyrics:"", youtube:"",lyricsong:""};
   res.render('listen.hbs',{theValue, notFound});
})


app.get('/listOfSongs', (req, res) => {
  // set variables to empty string
  let songList = [];
  let notFound = ""
  let theValue = {title:"", genre:"", artist:"", lyrics:"", youtube:"",lyricsong:""};
   dbStorage.getAllData(function(data){
    /*
      -- use the two statement below if you need =the data not just the key ----
      dataTemp = JSON.parse(data.value);
      songList.push(dataTemp.title);
    */
     songList.push(data) // pushes the key/title of the song
     console.log("List of Songs:", songList);
     console.log(songList.length)
   })
   res.render('listen.hbs',{theValue, notFound, songList});
})



// to save what was entered/updated in share to the database
app.post('/share', (req, res) => {
    // gets the title from the http request body to be used as key to the song
    const theKey = req.body.title;
    // change the object to string to save the information
    const theValue = JSON.stringify(req.body);
    dbStorage.setItem(theKey, theValue);
    console.log(`saving: ${req.body.title} , ${req.body}`);
    res.render('share.hbs');
})


// from listen.hbs after submitting a title and open again to listen.hbs to show data
app.post('/listen', (req, res) => {
  const theKey = req.body.title;
  const notFound = "";
  dbStorage.getItem(theKey, function(value){
     console.log('Read value : ',value);
     if (!value) {  // check if there is no returned value
       const notFound = "Song with that title was not found in the Music Museum";
       res.render('listen',{notFound}); // goes back to login page in index.hbs
     } 
     else {
       // change string to object before passing it to listen.hbs 
       const theValue = JSON.parse(value);
       let yValue = theValue.youtube;
       theValue.youtube = yValue.replace("watch?v=", "embed/");
       res.render('listen',{theValue, notFound}); // listen.hbs
     }
  })
})

// route for the button to delete a record coming from listen.hbs
app.get('/delTitle', (req, res) => {
    const theKey = req.query.title;
    dbStorage.deleteItem(theKey); // call the exported deleteItem function 
    // clears all hbs handlebars variables used in listen.hbs
    let notFound = "";
    let theValue = {title:"", genre:"", artist:"", lyrics:"", youtube:"",lyricssong:""};
    res.render('listen.hbs',{theValue, notFound}); // goes back to listen.hbs
})


// Step 5: Start HTTP Server on a port number 3000
const port = 3000;
app.listen(port, () => console.log(`App listening to port ${port}`));
