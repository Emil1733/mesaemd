const { google } = require('googleapis');
const path = require('path');
const fs = require('fs');

const SITE_URL = 'https://mesapoolremoval.com';
const KEY_FILE = path.join(__dirname, 'gsc-credentials.json');
const OUTPUT_DIR = path.join(__dirname, 'gsc/06-18-2026');
const OUTPUT_FILE = path.join(OUTPUT_DIR, '06-18-2026.md');

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

    // Pull last 30 days (2026-05-19 to 2026-06-17)
    const resRecent = await searchconsole.searchanalytics.query({
      siteUrl: targetSite,
      requestBody: {
        startDate: '2026-05-19',
        endDate: '2026-06-17',
        dimensions: ['query', 'page'],
        dimensionFilterGroups: [{ filters: [{ dimension: 'country', operator: 'equals', expression: 'usa' }] }],
        rowLimit: 1000
      }
    });

    // Pull previous 30 days (2026-04-19 to 2026-05-18)
    const resPrevious = await searchconsole.searchanalytics.query({
      siteUrl: targetSite,
      requestBody: {
        startDate: '2026-04-19',
        endDate: '2026-05-18',
        dimensions: ['query', 'page'],
        dimensionFilterGroups: [{ filters: [{ dimension: 'country', operator: 'equals', expression: 'usa' }] }],
        rowLimit: 1000
      }
    });

    const recent = resRecent.data.rows || [];
    const previous = resPrevious.data.rows || [];

    const getStats = (rows) => {
      let totalClicks = 0;
      let totalImpressions = 0;
      rows.forEach(r => {
        totalClicks += r.clicks;
        totalImpressions += r.impressions;
      });
      return { totalClicks, totalImpressions, uniqueQueries: rows.length };
    };

    const recentStats = getStats(recent);
    const previousStats = getStats(previous);

    const prevMap = {};
    previous.forEach(r => {
      prevMap[r.keys[0]] = r;
    });

    let report = `# GSC Performance Audit (30-Day Comparison): ${SITE_URL}\n`;
    report += `Generated: 2026-06-18\n`;
    report += `Recent Period: 2026-05-19 to 2026-06-17\n`;
    report += `Previous Period: 2026-04-19 to 2026-05-18\n\n`;

    report += `## 1. High-Level Metrics\n\n`;
    report += `| Metric | Previous 30 Days | Last 30 Days | Change |\n`;
    report += `| :--- | :--- | :--- | :--- |\n`;
    report += `| **Unique Queries** | ${previousStats.uniqueQueries} | ${recentStats.uniqueQueries} | ${recentStats.uniqueQueries - previousStats.uniqueQueries > 0 ? '+' : ''}${recentStats.uniqueQueries - previousStats.uniqueQueries} |\n`;
    report += `| **Total Impressions** | ${previousStats.totalImpressions} | ${recentStats.totalImpressions} | ${recentStats.totalImpressions - previousStats.totalImpressions > 0 ? '+' : ''}${recentStats.totalImpressions - previousStats.totalImpressions} |\n`;
    report += `| **Total Clicks** | ${previousStats.totalClicks} | ${recentStats.totalClicks} | ${recentStats.totalClicks - previousStats.totalClicks > 0 ? '+' : ''}${recentStats.totalClicks - previousStats.totalClicks} |\n\n`;

    report += `## 2. Top Queries (Recent 30 Days)\n\n`;
    report += `| Query | Page | Clicks | Impr | CTR | Pos | Prev Pos | Pos Change |\n`;
    report += `| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |\n`;

    recent.sort((a, b) => b.impressions - a.impressions);

    recent.forEach(r => {
      const q = r.keys[0];
      const p = r.keys[1].replace(SITE_URL, '') || '/';
      const c = r.clicks;
      const i = r.impressions;
      const ctr = (r.ctr * 100).toFixed(2) + '%';
      const pos = r.position.toFixed(1);
      
      const prevRow = prevMap[q];
      const prevPos = prevRow ? prevRow.position.toFixed(1) : 'N/A';
      let posChange = '-';
      if (prevRow) {
        const diff = prevRow.position - r.position;
        if (diff > 0) posChange = `+${diff.toFixed(1)} \u2191`; // improved
        else if (diff < 0) posChange = `${diff.toFixed(1)} \u2193`; // declined
      } else {
        posChange = 'NEW \u2b50';
      }

      report += `| ${q} | ${p} | ${c} | ${i} | ${ctr} | ${pos} | ${prevPos} | ${posChange} |\n`;
    });

    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    }
    fs.writeFileSync(OUTPUT_FILE, report);
    console.log(`[SUCCESS] Analysis written to ${OUTPUT_FILE}`);

  } catch (err) {
    console.error('[FATAL] GSC Pull Failed:', err.message);
  }
}

pullGSCData();
