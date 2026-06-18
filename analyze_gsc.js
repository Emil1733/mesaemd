const fs = require('fs');
const path = require('path');

const INPUT_FILE = path.join(__dirname, 'gsc/06-06-2026.json');
const OUTPUT_FILE = path.join(__dirname, 'gsc/06-06-2026.md');

const rawData = fs.readFileSync(INPUT_FILE, 'utf8');
const data = JSON.parse(rawData);

const recent = data.recent || [];
const previous = data.previous || [];

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

// Map by query
const prevMap = {};
previous.forEach(r => {
  prevMap[r.keys[0]] = r;
});

let report = `# GSC Performance Audit (30-Day Comparison): https://mesapoolremoval.com\n`;
report += `Generated: 2026-06-06\n`;
report += `Recent Period: 2026-05-07 to 2026-06-05\n`;
report += `Previous Period: 2026-04-07 to 2026-05-06\n\n`;

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
  const p = r.keys[1].replace('https://mesapoolremoval.com', '') || '/';
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

fs.writeFileSync(OUTPUT_FILE, report);
console.log(`[SUCCESS] Analysis written to ${OUTPUT_FILE}`);
