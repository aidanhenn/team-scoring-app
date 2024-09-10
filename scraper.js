const puppeteer = require("puppeteer");

async function scrapeTeams(url) {
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
  
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2' });
  
    let teamNameandScores = [];
    let teams = [];
    let teamScores = [];
    let addtoscore = 10;
  
    for (let j = 0; j <= 81; j++) {
      if (
        (await page.$(
          `#list_data > div.panel-body.frame-loading-hide > div.row.gender_m.standard_event_hnd_${j}`
        )) !== null
      ) {
        const rows = await page.$$(
          `#list_data > div.panel-body.frame-loading-hide > div.row.gender_m.standard_event_hnd_${j} tbody tr`
        );
        const numrows = Math.min(rows.length, 6);
  
        for (let i = 0; i < numrows; i++) {
          const row = rows[i];
          const headerName = await page.$eval(
            `#list_data > div.panel-body.frame-loading-hide > div.row.gender_m.standard_event_hnd_${j} > div > div.custom-table-title`,
            (element) => element.textContent
          );
  
          let teamName;
          if (headerName.includes("Relay")) {
            teamName = await row.$eval("td:nth-of-type(2)", (element) => element.textContent);
          } else {
            teamName = await row.$eval("td:nth-of-type(4)", (element) => element.textContent);
          }
  
          const index = teams.indexOf(teamName);
          if (index === -1) {
            teams.push(teamName);
            teamScores.push(addtoscore);
          } else {
            teamScores[index] += addtoscore;
          }
  
          addtoscore = addtoscore === 2 ? 1 : addtoscore - 2;
        }
        addtoscore = 10;
      }
    }
  
    for (let i = 0; i < teams.length; i++) {
      teamNameandScores.push({ name: teams[i], score: teamScores[i] });
    }
    
    teamNameandScores.sort((a, b) => b.score - a.score);
    await browser.close();
  
    return teamNameandScores;
  }
  
  module.exports = { scrapeTeams };
