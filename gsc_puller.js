const { google } = require('googleapis');
const path = require('path');
const fs = require('fs');

// THE TARGET DOMAIN
const SITE_URL = 'https://mesapoolremoval.com';
const KEY_FILE = path.join(__dirname, 'gsc-credentials.json');
const OUTPUT_FILE = path.join(__dirname, 'gsc/05-04-2026.md');

async function pullGSCData() {
  console.log('--- STARTING MESA GSC PERFORMANCE PULL (7-DAY USA) ---');

  const auth = new google.auth.GoogleAuth({
    keyFile: KEY_FILE,
    scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
  });

  const searchconsole = google.searchconsole({ version: 'v1', auth: await auth.getClient() });

  try {
    const sites = await searchconsole.sites.list();
    const siteList = sites.data.siteEntry.map(s => s.siteUrl);
    const targetSite = siteList.find(s => s.includes('mesapoolremoval.com')) || SITE_URL;

    // Pull last 7 days of performance data (USA only)
    const res = await searchconsole.searchanalytics.query({
      siteUrl: targetSite,
      requestBody: {
        startDate: '2026-04-27',
        endDate: '2026-05-03',
        dimensions: ['query', 'page'],
        dimensionFilterGroups: [
          {
            filters: [
              {
                dimension: 'country',
                operator: 'equals',
                expression: 'usa'
              }
            ]
          }
        ],
        rowLimit: 500
      }
    });

    const rows = res.data.rows || [];
    let report = `# GSC Performance Audit (7-Day USA): ${SITE_URL}\n`;
    report += `Generated: 2026-05-04\n`;
    report += `Period: 2026-04-27 to 2026-05-03\n\n`;
    report += `| Query | Page | Clicks | Impressions | CTR | Position |\n`;
    report += `| :--- | :--- | :--- | :--- | :--- | :--- |\n`;

    rows.forEach(row => {
      const ctr = (row.ctr * 100).toFixed(2) + '%';
      const pos = row.position.toFixed(1);
      report += `| ${row.keys[0]} | ${row.keys[1].replace(SITE_URL, '')} | ${row.clicks} | ${row.impressions} | ${ctr} | ${pos} |\n`;
    });

    if (rows.length === 0) {
      report += `\n**No data found for this period.**\n`;
    }

    fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });
    fs.writeFileSync(OUTPUT_FILE, report);
    console.log(`[SUCCESS] Report written to ${OUTPUT_FILE}`);

  } catch (err) {
    console.error('[FATAL] GSC Pull Failed:', err.message);
  }
}

pullGSCData();
