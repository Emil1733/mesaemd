import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{ background: '#000', color: 'var(--text-inverse-muted)', padding: '4rem 0 2rem 0', textAlign: 'center', borderTop: '4px solid var(--accent-primary)' }}>
      <div className="container">
        <h3 style={{ color: '#fff', fontSize: '2rem', marginBottom: '0.5rem', fontFamily: 'var(--font-heading)', textTransform: 'uppercase' }}>Mesa Pool Removal Pros</h3>
        <p style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Serving Mesa, AZ 85201–85213</p>
        <p style={{ color: '#6b7280' }}>Serving Mesa & East Valley | Geotechnical Demolition Contractors</p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', margin: '2rem 0', flexWrap: 'wrap' }}>
          <Link href="/pool-removal" style={{ color: 'var(--text-inverse-muted)', fontWeight: 700 }}>Services</Link>
          <Link href="/service-areas" style={{ color: 'var(--text-inverse-muted)', fontWeight: 700 }}>Service Areas</Link>
          <Link href="/cost/mesa-pool-removal" style={{ color: 'var(--text-inverse-muted)', fontWeight: 700 }}>Cost Guide</Link>
          <Link href="/blog/mesa-pool-removal-guide-2026" style={{ color: 'var(--text-inverse-muted)', fontWeight: 700 }}>Mesa Blog</Link>
          <Link href="/contact" style={{ color: 'var(--text-inverse-muted)', fontWeight: 700 }}>Get an Estimate</Link>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginBottom: '1rem', flexWrap: 'wrap', borderTop: '1px solid #1f2937', paddingTop: '1.5rem' }}>
          <Link href="/mesa/las-sendas-pool-removal" style={{ color: '#6b7280', fontWeight: 600, fontSize: '0.85rem' }}>Las Sendas</Link>
          <Link href="/mesa/dobson-ranch-pool-removal" style={{ color: '#6b7280', fontWeight: 600, fontSize: '0.85rem' }}>Dobson Ranch</Link>
          <Link href="/mesa/eastmark-pool-removal" style={{ color: '#6b7280', fontWeight: 600, fontSize: '0.85rem' }}>Eastmark</Link>
          <Link href="/mesa/red-mountain-ranch-pool-removal" style={{ color: '#6b7280', fontWeight: 600, fontSize: '0.85rem' }}>Red Mountain Ranch</Link>
          <Link href="/caliche-soil-pool-removal-mesa" style={{ color: '#6b7280', fontWeight: 600, fontSize: '0.85rem' }}>Caliche Soil Guide</Link>
          <Link href="/fiberglass-vs-concrete-pool-removal" style={{ color: '#6b7280', fontWeight: 600, fontSize: '0.85rem' }}>Fiberglass vs. Concrete</Link>
          <Link href="/full-vs-partial-pool-removal-arizona" style={{ color: '#6b7280', fontWeight: 600, fontSize: '0.85rem' }}>Full vs. Partial</Link>
          <Link href="/maricopa-county-pool-removal-permit" style={{ color: '#6b7280', fontWeight: 600, fontSize: '0.85rem' }}>Permit Guide</Link>
        </div>
        <div style={{ marginTop: '3rem', borderTop: '1px solid #374151', paddingTop: '2rem' }}>
          <p style={{ fontSize: '0.875rem' }}>Licensed, Bonded, and Insured in Arizona.</p>
        </div>
      </div>
    </footer>
  );
}
