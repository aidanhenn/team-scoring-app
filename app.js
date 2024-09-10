const express = require("express");
const puppeteer = require("puppeteer");
// import the scrapeTeams function from a module names scraper.js
// const{scrapeTeams} uses object destructuring to extract the scrapeTeams function from the exports of the scraper.js module
const { scrapeTeams } = require("./scraper");
// use bodyparser to parse the form data
const bodyParser = require("body-parser");

// initialize an express app by calling express() which can be used to define routes and handle HTTP requests
const app = express();
const PORT = 3000;
app.use(express.static("public"));
app.use(bodyParser.json());

// define a route handler that listens for http GET requests made to the /scores endpoint
// when a user sends a request to the http://localhost:3000/scores endpoint this function will be executed

// req is for incoming requests from the client
// res if for outgoing response you will send back to the client
app.post("/scrape", async (req, res) => {
  const url = req.body.url;
  if (!url) {
    return res.status(400).json({ message: "No URL provided." });
  }

  try {
    console.log(`Starting Puppeteer scrape for URL: ${url}`);
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    //const page = await browser.newPage();
    //await page.goto(url, { waitUntil: "networkidle2" });

    const scores = await scrapeTeams(url)
    // Scrape data from the page
    // const pageContent = await page.evaluate(() => {
    //   return document.querySelector("body").innerText;
    // });

     await browser.close();
    // console.log(`Scraped content successfully: ${pageContent}`);

    // Send the scraped data back to the client
    console.log(scores)
    res.json(scores);
  } catch (err) {
    console.error(`Error occurred while scraping: ${err.message}`);
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
