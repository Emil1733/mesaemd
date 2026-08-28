const { google } = require('googleapis');
const path = require('path');
const fs = require('fs');

const SITE_URL = 'https://mesapoolremoval.com';
const KEY_FILE = path.join(__dirname, 'gsc-credentials.json');
const OUTPUT_JSON = path.join(__dirname, 'gsc/08-28-2026.json');
const OUTPUT_MD = path.join(__dirname, 'gsc/08-28-2026.md');

// We use an end date 3 days ago because GSC data is delayed by 3 days.
const RECENT_START = '2026-07-27';
const RECENT_END = '2026-08-25';
const PREV_START = '2026-06-27';
const PREV_END = '2026-07-26';

async function pullAndAnalyze() {
  console.log(`--- STARTING MESA GSC PERFORMANCE PULL (${RECENT_START} to ${RECENT_END}) ---`);

  const auth = new google.auth.GoogleAuth({
    keyFile: KEY_FILE,
    scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
  });

  const searchconsole = google.searchconsole({ version: 'v1', auth: await auth.getClient() });

  try {
    const sites = await searchconsole.sites.list();
    const siteList = sites.data.siteEntry.map(s => s.siteUrl);
    const targetSite = siteList.find(s => s.includes('mesapoolremoval.com')) || SITE_URL;

    // Pull recent 30 days
    const resRecent = await searchconsole.searchanalytics.query({
      siteUrl: targetSite,
      requestBody: {
        startDate: RECENT_START,
        endDate: RECENT_END,
        dimensions: ['query', 'page'],
        dimensionFilterGroups: [{ filters: [{ dimension: 'country', operator: 'equals', expression: 'usa' }] }],
        rowLimit: 1000
      }
    });

    // Pull previous 30 days
    const resPrevious = await searchconsole.searchanalytics.query({
      siteUrl: targetSite,
      requestBody: {
        startDate: PREV_START,
        endDate: PREV_END,
        dimensions: ['query', 'page'],
        dimensionFilterGroups: [{ filters: [{ dimension: 'country', operator: 'equals', expression: 'usa' }] }],
        rowLimit: 1000
      }
    });

    const recent = resRecent.data.rows || [];
    const previous = resPrevious.data.rows || [];

    // Save JSON
    fs.mkdirSync(path.dirname(OUTPUT_JSON), { recursive: true });
    fs.writeFileSync(OUTPUT_JSON, JSON.stringify({ recent, previous }, null, 2));
    console.log(`[SUCCESS] JSON Data written to ${OUTPUT_JSON}`);

    // Analyze and save Markdown
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
    report += `Generated: 2026-08-28\n`;
    report += `Recent Period: ${RECENT_START} to ${RECENT_END}\n`;
    report += `Previous Period: ${PREV_START} to ${PREV_END}\n\n`;

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

    fs.writeFileSync(OUTPUT_MD, report);
    console.log(`[SUCCESS] Analysis Markdown written to ${OUTPUT_MD}`);

  } catch (err) {
    console.error('[FATAL] GSC Pull Failed:', err.message);
  }
}

pullAndAnalyze();
