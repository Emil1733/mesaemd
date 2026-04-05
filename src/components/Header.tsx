import Link from 'next/link';

export default function Header() {
  return (
    <header style={{ background: '#0a0a0a', borderBottom: '2px solid var(--accent-primary)', padding: '1rem 0', position: 'sticky', top: 0, zIndex: 100 }}>
      <div className="container header-wrapper">
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
           <div style={{ background: 'var(--accent-primary)', color: '#0a0a0a', padding: '0.25rem 0.75rem', fontWeight: 900, fontSize: '1.25rem', fontFamily: 'var(--font-heading)', letterSpacing: '0.02em', borderRadius: '2px', boxShadow: '2px 2px 0px rgba(255,255,255,0.1)' }}>
              MESA
           </div>
           <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
             <span style={{ color: '#fff', fontSize: '0.9rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.15em', lineHeight: 1 }}>Pool</span>
             <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', lineHeight: 1, marginTop: '2px' }}>Removal</span>
           </div>
        </Link>
        <nav className="header-nav">
          <Link href="/pool-removal" style={{ color: '#d1d5db', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.85rem' }}>Services</Link>
          <Link href="/cost/mesa-pool-removal" style={{ color: '#d1d5db', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.85rem' }}>Cost Guide</Link>
          <Link href="/blog/mesa-pool-removal-guide-2026" style={{ color: '#d1d5db', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.85rem' }}>Authority Blog</Link>
          <Link href="/contact" className="btn btn-primary" style={{ padding: '0.75rem 1.5rem', fontSize: '0.85rem' }}>Get Estimate</Link>
        </nav>
      </div>
    </header>
  );
}
