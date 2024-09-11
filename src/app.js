const express = require("express");
const puppeteer = require("puppeteer");
// import the scrapeTeams function from a module names scraper.js
// const{scrapeTeams} uses object destructuring to extract the scrapeTeams function from the exports of the scraper.js module
const { scrapeTeams } = require("../scraper");
// use bodyparser to parse the form data
const bodyParser = require("body-parser");

// initialize an express app by calling express() which can be used to define routes and handle HTTP requests
const app = express();
// the port is assigned by Heroku
const PORT = process.env.PORT || 3000;
app.use(express.static("public"));
app.use(bodyParser.json());

// req is for incoming requests from the client
// res if for outgoing response you will send back to the client
app.post("/scrape", async (req, res) => {
  const url = req.body.url;
  if (!url) {
    return res.status(400).json({ message: "No URL provided." });
  }

  try {
    const scores = await scrapeTeams(url)
    res.json(scores);
  } catch (err) {
    res.status(500).json({ message: `Error: ${err.message}` }); // Return the error as JSON
  }
});


// this starts the express server and listens for incoming requests on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// (async () => {
//   const url = "https://www.tfrrs.org/lists/4718/Little_East_Outdoor_Performance_List";
//   const scores = await scrapeTeams(url);

//   console.log("Team Scores:");
//   console.log(scores);
// })();
