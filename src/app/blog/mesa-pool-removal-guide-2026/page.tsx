import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../../page.module.css';

export const metadata: Metadata = {
  title: "Mesa Pool Removal Guide 2026 | Costs, Permits & Soil",
  description: "A homeowner guide to pool removal in Mesa, Arizona, covering full vs partial removal, cost factors, permits, caliche soil, access, and backfill considerations.",
  alternates: {
    canonical: 'https://mesapoolremoval.com/blog/mesa-pool-removal-guide-2026',
  },
};

export default function BlogPost() {
  return (
    <main className={styles.main} style={{ background: 'var(--bg-light)' }}>
      <section className={styles.hero} style={{ minHeight: '50vh' }}>
        <Image src="/hero_pool_demolition.jpg" alt="Mesa pool removal homeowner guide" fill priority className={styles.heroBg} sizes="100vw" style={{ filter: 'grayscale(100%) contrast(150%) opacity(30%)', objectFit: 'cover' }} />
        <div className={styles.heroOverlay} style={{ background: 'linear-gradient(180deg, rgba(10,10,10,0.8) 0%, rgba(10,10,10,1) 100%)' }}></div>
        <div className="container" style={{ position: 'relative', zIndex: 2, paddingTop: '2rem', paddingBottom: '4rem', textAlign: 'center', maxWidth: '900px' }}>
          <div className={styles.heroTag} style={{ marginBottom: '1rem', background: 'var(--bg-dark)', border: '1px solid var(--accent-primary)' }}>Homeowner Guide</div>
          <h1 className={styles.heroTitle} style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>Mesa Pool Removal Guide: Costs, Permits and Soil</h1>
          <p className={styles.heroDesc} style={{ margin: '0 auto', border: 'none', padding: 0 }}>Use this guide to understand the decisions that can affect a pool removal project before requesting estimates.</p>
        </div>
      </section>

      <section className={styles.section} style={{ paddingTop: '2rem' }}>
        <article className="container" style={{ maxWidth: '800px', background: 'var(--bg-card)', padding: '4rem', borderRadius: '4px', borderTop: '8px solid var(--accent-primary)', boxShadow: 'var(--shadow-heavy)', color: 'var(--text-main)', fontSize: '1.125rem', lineHeight: '1.8' }}>
          <div style={{ marginBottom: '3rem' }}>
            <p style={{ marginBottom: '1.5rem', fontSize: '1.25rem', fontWeight: 500 }}>If an aging or unused pool no longer fits your property plans, removal can turn the area back into usable yard space. The scope is not identical for every Mesa property.</p>
            <p style={{ marginBottom: '1.5rem' }}>Pool construction, backyard access, demolition method, soil conditions, hauling, backfill, permits, and the intended future use of the area can all affect the project. For service information, start with our <Link href="/" style={{ color: 'var(--accent-primary)', fontWeight: 'bold' }}>Mesa pool removal page</Link>.</p>
          </div>

          <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: 'var(--bg-dark)', borderBottom: '2px solid var(--border-light)', paddingBottom: '0.5rem' }}>Full Removal vs Partial Fill-In</h2>
          <p style={{ marginBottom: '1.5rem' }}>The two broad approaches differ in how much of the existing pool structure is removed. The right choice depends on local requirements, budget, site conditions, and what you may want to do with the area later.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))', gap: '2rem', marginBottom: '2rem' }}>
            <div style={{ background: '#f8fafc', padding: '2rem', border: '1px solid var(--border-light)' }}><h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--accent-primary)' }}>Partial Fill-In</h3><ul><li>Less of the pool structure is removed</li><li>Can involve less demolition and hauling</li><li>Future property plans should be considered before choosing it</li></ul></div>
            <div style={{ background: '#f8fafc', padding: '2rem', border: '1px solid var(--border-light)' }}><h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--bg-dark)' }}>Full Removal</h3><ul><li>More or all of the pool structure is removed</li><li>Usually involves more excavation and hauling</li><li>May be preferable when future use of the area is important</li></ul></div>
          </div>
          <p style={{ marginBottom: '3rem' }}>See our detailed <Link href="/full-vs-partial-pool-removal-arizona" style={{ color: 'var(--accent-primary)', fontWeight: 'bold', textDecoration: 'underline' }}>full vs partial pool removal comparison</Link>.</p>

          <div style={{ background: 'var(--bg-dark)', color: '#fff', padding: '3rem', margin: '3rem -4rem', borderLeft: '8px solid var(--accent-primary)' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: '#fff' }}>What Affects Pool Removal Cost in Mesa?</h2>
            <p style={{ marginBottom: '1.5rem', color: '#cbd5e1' }}>Pool type and size are only part of the estimate. Concrete thickness, equipment access, demolition method, debris hauling, soil conditions, backfill requirements, and permits can materially change the scope.</p>
            <Link href="/cost/mesa-pool-removal" className="btn btn-primary">See the Mesa cost guide →</Link>
          </div>

          <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: 'var(--bg-dark)' }}>Permits and Inspections</h2>
          <p style={{ marginBottom: '1.5rem' }}>Do not assume the same permit or inspection process applies to every address. Requirements can depend on the jurisdiction, property, utilities, demolition method, and proposed final condition.</p>
          <ul style={{ marginBottom: '2rem', paddingLeft: '1.5rem', listStyleType: 'square' }}><li>Confirm the applicable permitting authority before demolition.</li><li>Ask which inspections apply to the specific removal method.</li><li>Confirm how utilities and pool equipment should be disconnected.</li><li>Keep permit and project documentation for your property records.</li></ul>
          <p style={{ marginBottom: '3rem' }}>Our <Link href="/maricopa-county-pool-removal-permit" style={{ color: 'var(--accent-primary)', fontWeight: 'bold' }}>Maricopa County pool removal permit guide</Link> explains what to verify before work begins.</p>

          <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: 'var(--accent-primary)' }}>Caliche and Mesa Soil Conditions</h2>
          <p style={{ marginBottom: '1.5rem' }}>Caliche is a hardened, calcium-rich soil layer found in parts of the desert Southwest. Where it is present, excavation can require different equipment or more effort than loose soil.</p>
          <p style={{ marginBottom: '3rem' }}>Its depth and hardness vary by property, so it should not be assumed from a ZIP code alone. Learn more in our <Link href="/caliche-soil-pool-removal-mesa" style={{ color: 'var(--accent-primary)', fontWeight: 'bold' }}>Mesa caliche pool removal guide</Link>.</p>

          <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: 'var(--bg-dark)' }}>Typical Pool Removal Workflow</h2>
          <div style={{ marginBottom: '3rem' }}><div style={{ padding: '1rem', borderBottom: '1px solid var(--border-light)' }}><strong>1. Site review:</strong> Identify pool construction, access limitations, utilities, and future plans.</div><div style={{ padding: '1rem', borderBottom: '1px solid var(--border-light)' }}><strong>2. Permit planning:</strong> Confirm the required approvals and inspections.</div><div style={{ padding: '1rem', borderBottom: '1px solid var(--border-light)' }}><strong>3. Demolition:</strong> Remove or break the pool structure according to the selected method.</div><div style={{ padding: '1rem', borderBottom: '1px solid var(--border-light)' }}><strong>4. Hauling and backfill:</strong> Remove required debris and place suitable fill material.</div><div style={{ padding: '1rem' }}><strong>5. Final grading:</strong> Finish the area based on drainage and intended yard use.</div></div>

          <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: 'var(--bg-dark)' }}>How Long Does Pool Removal Take?</h2>
          <p style={{ marginBottom: '3rem' }}>There is no reliable one-size-fits-all timeline. Permitting, access, pool construction, demolition scope, soil conditions, equipment availability, hauling, inspections, and weather can all affect scheduling. A project-specific estimate should separate approval time from on-site work time.</p>

          <div style={{ background: '#fef2f2', border: '1px solid #fecaca', padding: '2rem', marginBottom: '3rem' }}><h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: '#991b1b' }}>Questions to Ask Before Hiring</h2><ul><li style={{ marginBottom: '1rem' }}>What removal method is being quoted?</li><li style={{ marginBottom: '1rem' }}>What demolition debris will be removed from the site?</li><li style={{ marginBottom: '1rem' }}>What backfill and compaction approach is proposed?</li><li style={{ marginBottom: '1rem' }}>Who is responsible for permits and inspections?</li><li>Does the estimate account for limited access or hard soil?</li></ul></div>

          <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: 'var(--bg-dark)' }}>Mesa Neighborhood Considerations</h2>
          <p style={{ marginBottom: '3rem' }}>Access, lot layout, slopes, landscaping, gates, walls, and HOA requirements can vary from property to property. See our neighborhood pages for <Link href="/mesa/eastmark-pool-removal">Eastmark</Link>, <Link href="/mesa/las-sendas-pool-removal">Las Sendas</Link>, <Link href="/mesa/dobson-ranch-pool-removal">Dobson Ranch</Link>, and <Link href="/mesa/red-mountain-ranch-pool-removal">Red Mountain Ranch</Link>.</p>

          <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: 'var(--bg-dark)' }}>Frequently Asked Questions</h2>
          <div style={{ marginBottom: '4rem' }}><div style={{ marginBottom: '1.5rem' }}><h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', fontWeight: 900 }}>Which removal method is best?</h3><p style={{ color: 'var(--text-muted)' }}>It depends on the property, local requirements, budget, and future use of the area. Compare the scope of full removal and partial fill-in before deciding.</p></div><div style={{ marginBottom: '1.5rem' }}><h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', fontWeight: 900 }}>Does every Mesa property have hard caliche?</h3><p style={{ color: 'var(--text-muted)' }}>No. Caliche conditions can vary significantly even within the same area, so site conditions should be evaluated rather than assumed.</p></div><div><h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', fontWeight: 900 }}>What should I compare between estimates?</h3><p style={{ color: 'var(--text-muted)' }}>Compare demolition scope, hauling, backfill, access assumptions, permit responsibilities, exclusions, and how the finished area will be graded.</p></div></div>
        </article>
      </section>

      <section className={`${styles.section} bg-hazard`} style={{ textAlign: 'center', padding: '4rem 0' }}><div className="container"><h2 className={styles.sectionTitle} style={{ color: '#fff' }}>Planning a Pool Removal in Mesa?</h2><p style={{ color: '#fff', fontSize: '1.2rem', margin: '1.5rem 0 3rem' }}>Use the calculator to get an initial project range based on pool type, size, and backyard access.</p><Link href="/#calculator" className="btn btn-primary" style={{ padding: '1.5rem 4rem', fontSize: '1.25rem' }}>Get a Mesa Pool Removal Estimate</Link></div></section>
    </main>
  );
}
