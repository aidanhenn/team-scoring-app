const express = require('express')
// import the scrapeTeams function from a module names scraper.js
// const{scrapeTeams} uses object destructuring to extract the scrapeTeams function from the exports of the scraper.js module
const { scrapeTeams } = require("./scraper");
// use bodyparser to parse the form data
const bodyParser = require('body-parser');

// initialize an express app by calling express() which can be used to define routes and handle HTTP requests
const app = express();
const PORT = 3000;
app.use(express.static("public"));

// define a route handler that listens for http GET requests made to the /scores endpoint
// when a user sends a request to the http://localhost:3000/scores endpoint this function will be executed

// req is for incoming requests from the client
// res if for outgoing response you will send back to the client 
app.get("/scrape", async (req,res) =>{
  // hardcoded TFRRS url
  try{
  const url = "https://www.tfrrs.org/lists/4718/Little_East_Outdoor_Performance_List";
  // run the scrape Teams function on the url
  const scores = await scrapeTeams(url);
  // sends the scores back to the client in JSON format
  res.json(scores)
} catch (err) {
  res.status(500).send(`Error: ${err.message} occured while scraping`);
}
})

// this starts the express server and listens for incoming requests on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})

// (async () => {
//   const url = "https://www.tfrrs.org/lists/4718/Little_East_Outdoor_Performance_List";
//   const scores = await scrapeTeams(url);

//   console.log("Team Scores:");
//   console.log(scores);
// })();
