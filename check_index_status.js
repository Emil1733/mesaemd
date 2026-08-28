const { google } = require('googleapis');
const path = require('path');

const SITE_URL = 'https://mesapoolremoval.com';
const KEY_FILE = path.join(__dirname, 'gsc-credentials.json');

async function checkIndexStatus() {
  console.log('--- CHECKING INDEX STATUS ---');

  const auth = new google.auth.GoogleAuth({
    keyFile: KEY_FILE,
    scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
  });

  const searchconsole = google.searchconsole({ version: 'v1', auth: await auth.getClient() });

  const sites = await searchconsole.sites.list();
  const siteList = sites.data.siteEntry.map(s => s.siteUrl);
  const targetSite = siteList.find(s => s.includes('mesapoolremoval.com')) || SITE_URL;

  const urlsToCheck = [
    'https://mesapoolremoval.com/',
    'https://mesapoolremoval.com/maricopa-county-pool-removal-permit',
    'https://mesapoolremoval.com/caliche-soil-pool-removal-mesa',
    'https://mesapoolremoval.com/mesa/dobson-ranch-pool-removal',
    'https://mesapoolremoval.com/mesa/las-sendas-pool-removal',
    'https://mesapoolremoval.com/mesa/eastmark-pool-removal',
    'https://mesapoolremoval.com/full-vs-partial-pool-removal-arizona'
  ];

  for (const url of urlsToCheck) {
    try {
      const res = await searchconsole.urlInspection.index.inspect({
        requestBody: {
          inspectionUrl: url,
          siteUrl: targetSite,
          languageCode: 'en-US'
        }
      });
      const result = res.data.inspectionResult.indexStatusResult;
      console.log(`URL: ${url}`);
      console.log(`Coverage State: ${result.coverageState}`);
      console.log(`Last Crawl: ${result.lastCrawlTime}`);
      console.log('-------------------------');
    } catch (err) {
      console.error(`Error checking ${url}: ${err.message}`);
    }
    // Sleep to avoid rate limits
    await new Promise(r => setTimeout(r, 1000));
  }
}

checkIndexStatus();
