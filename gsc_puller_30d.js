const { google } = require('googleapis');
const path = require('path');
const fs = require('fs');

const SITE_URL = 'https://mesapoolremoval.com';
const KEY_FILE = path.join(__dirname, 'gsc-credentials.json');
const OUTPUT_FILE = path.join(__dirname, 'gsc/06-06-2026.json');

async function pullGSCData() {
  console.log('--- STARTING MESA GSC PERFORMANCE PULL (30-DAY COMPARISON) ---');

  const auth = new google.auth.GoogleAuth({
    keyFile: KEY_FILE,
    scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
  });

  const searchconsole = google.searchconsole({ version: 'v1', auth: await auth.getClient() });

  try {
    const sites = await searchconsole.sites.list();
    const siteList = sites.data.siteEntry.map(s => s.siteUrl);
    const targetSite = siteList.find(s => s.includes('mesapoolremoval.com')) || SITE_URL;

    // Pull last 30 days (2026-05-07 to 2026-06-05)
    const resRecent = await searchconsole.searchanalytics.query({
      siteUrl: targetSite,
      requestBody: {
        startDate: '2026-05-07',
        endDate: '2026-06-05',
        dimensions: ['query', 'page'],
        dimensionFilterGroups: [{ filters: [{ dimension: 'country', operator: 'equals', expression: 'usa' }] }],
        rowLimit: 1000
      }
    });

    // Pull previous 30 days (2026-04-07 to 2026-05-06)
    const resPrevious = await searchconsole.searchanalytics.query({
      siteUrl: targetSite,
      requestBody: {
        startDate: '2026-04-07',
        endDate: '2026-05-06',
        dimensions: ['query', 'page'],
        dimensionFilterGroups: [{ filters: [{ dimension: 'country', operator: 'equals', expression: 'usa' }] }],
        rowLimit: 1000
      }
    });

    const recentRows = resRecent.data.rows || [];
    const previousRows = resPrevious.data.rows || [];

    const data = {
      recent: recentRows,
      previous: previousRows
    };

    fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(data, null, 2));
    console.log(`[SUCCESS] Data written to ${OUTPUT_FILE}`);

  } catch (err) {
    console.error('[FATAL] GSC Pull Failed:', err.message);
  }
}

pullGSCData();
