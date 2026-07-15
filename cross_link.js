const fs = require('fs');
const dirs = [
  'dobson-ranch-pool-removal/DobsonRanchClient.tsx', 
  'eastmark-pool-removal/EastmarkClient.tsx', 
  'las-sendas-pool-removal/LasSendasClient.tsx', 
  'red-mountain-ranch-pool-removal/RedMountainClient.tsx'
];

const crossLinkBlock = `
      {/* NEIGHBORHOOD CROSS-LINKS */}
      <section className={styles.section} style={{ background: 'var(--bg-light)', borderTop: '1px solid var(--border-light)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Other East Valley Service Areas</h2>
            <p style={{ color: 'var(--text-muted)' }}>Explore our specific expertise in other Mesa neighborhoods:</p>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
            <Link href="/mesa/eastmark-pool-removal"><span className={styles.neighborhoodTag || "badge"}>Eastmark</span></Link>
            <Link href="/mesa/las-sendas-pool-removal"><span className={styles.neighborhoodTag || "badge"}>Las Sendas</span></Link>
            <Link href="/mesa/dobson-ranch-pool-removal"><span className={styles.neighborhoodTag || "badge"}>Dobson Ranch</span></Link>
            <Link href="/mesa/red-mountain-ranch-pool-removal"><span className={styles.neighborhoodTag || "badge"}>Red Mountain Ranch</span></Link>
          </div>
        </div>
      </section>
`;

dirs.forEach(d => {
  let p = `src/app/mesa/${d}`;
  let c = fs.readFileSync(p, 'utf8');
  if(!c.includes('NEIGHBORHOOD CROSS-LINKS')) {
    c = c.replace('{/* FINAL CTA */}', crossLinkBlock + '\n      {/* FINAL CTA */}');
    fs.writeFileSync(p, c);
  }
});
console.log('Cross-links injected.');
