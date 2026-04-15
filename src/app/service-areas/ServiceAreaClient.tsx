"use client";

import Image from 'next/image';
import Link from 'next/link';
import styles from '../page.module.css';

const areas = [
  {
    name: "Mesa",
    suburbs: ["Dobson Ranch", "Las Sendas", "Eastmark", "Red Mountain Ranch", "Alta Mesa"],
    description: "Our primary hub. We handle the strict city of Mesa demolition permits and heavy caliche soil breakout standard in the East Valley.",
    id: "mesa",
    neighborhoods: [
      { name: 'Las Sendas', href: '/mesa/las-sendas-pool-removal', tag: 'Mountain Terrain + HOA' },
      { name: 'Dobson Ranch', href: '/mesa/dobson-ranch-pool-removal', tag: '1970s Pools — Repair vs Remove' },
      { name: 'Eastmark', href: '/mesa/eastmark-pool-removal', tag: 'Builder Pool Upgrades' },
      { name: 'Red Mountain Ranch', href: '/mesa/red-mountain-ranch-pool-removal', tag: 'Sloped Terrain Experts' },
    ]
  },
  {
    name: "San Tan Valley",
    suburbs: ["Johnson Ranch", "Skyline Estates", "San Tan Heights", "Circle Cross Ranch"],
    description: "We serve the sprawling Pinal County developments. Many San Tan Valley pools are builder-grade entries that now require professional removal to save on maintenance.",
    id: "san-tan-valley"
  },
  {
    name: "Queen Creek",
    suburbs: ["Sossaman Estates", "Villages of Queen Creek", "Cortina", "Hastings Farms"],
    description: "Operating across Maricopa and Pinal county lines. We specialize in large-lot pool removals and technical access challenges common in Queen Creek.",
    id: "queen-creek"
  },
  {
    name: "Gilbert",
    suburbs: ["Agritopia", "Val Vista Lakes", "Power Ranch", "The Islands"],
    description: "Providing high-compaction pool removal for families reclaiming their yards for new patios and landscaping in Gilbert neighborhoods.",
    id: "gilbert"
  },
  {
    name: "Chandler",
    suburbs: ["Ocotillo", "Sun Lakes", "Circle G", "Pecos Vistas"],
    description: "Specialized in tight-access demolition for residential Chandler properties. We ensure all utility caps meet city engineering standards.",
    id: "chandler"
  }
];

export default function ServiceAreaClient() {
  return (
    <main className={styles.main}>
      {/* HERO SECTION */}
      <section className={styles.hero} style={{ minHeight: '50vh', background: '#0a0a0a' }}>
        <Image 
          src="https://images.unsplash.com/photo-1541888062831-29177a644265?auto=format&fit=crop&q=80&w=2000" 
          alt="Heavy machinery serving the East Valley" 
          fill
          priority
          className={styles.heroBg}
          style={{ opacity: 0.2, objectFit: 'cover' }}
        />
        <div className="container" style={{ position: 'relative', zIndex: 2, paddingTop: '6rem' }}>
          <h1 className={styles.heroTitle} style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
            Areas We Serve Across <span style={{ color: 'var(--accent-primary)' }}>Arizona</span>
          </h1>
          <p className={styles.heroDesc} style={{ maxWidth: '800px' }}>
            From central Mesa to the furthest edges of San Tan Valley, we provide engineered pool removal and specialized caliche excavation services for East Valley homeowners.
          </p>
        </div>
      </section>

      {/* CORE CONTENT: ENTITY CLUSTER */}
      <section className={styles.section} style={{ background: '#fff' }}>
        <div className="container">
          <div style={{ marginBottom: '4rem', maxWidth: '900px' }}>
            <h2 className={styles.sectionTitle}>Regional Expertise: Not Just Another Contractor</h2>
            <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', lineHeight: 1.8 }}>
              Operating in the Phoenix East Valley requires more than just a backhoe. Our crews are trained specifically on the <strong>Maricopa and Pinal County soil compositions</strong>. Whether you are dealing with the rocky caliche layers of North Mesa or the expansive clay of San Tan Valley, we ensure your pool removal is performed with 95% geotechnical compaction standards.
            </p>
          </div>

          <div style={{ display: 'grid', gap: '3rem' }}>
            {areas.map((area) => (
              <div key={area.id} id={area.id} style={{ border: '1px solid var(--border-light)', padding: '3rem', borderRadius: '4px', background: 'var(--bg-light)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', alignItems: 'start' }}>
                <div>
                  <h3 style={{ fontSize: '2.5rem', color: 'var(--bg-dark)', marginBottom: '1rem' }}>{area.name}</h3>
                  <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem', lineHeight: 1.6 }}>{area.description}</p>
                  <Link href="/contact" className="btn btn-dark" style={{ padding: '0.75rem 2rem', fontSize: '1rem' }}>
                    Request Quote in {area.name}
                  </Link>
                </div>
                <div>
                  <h4 style={{ textTransform: 'uppercase', fontSize: '0.9rem', fontWeight: 900, color: 'var(--accent-primary)', marginBottom: '1rem', letterSpacing: '0.05em' }}>Neighborhoods We Support:</h4>
                  <ul style={{ listStyle: 'none', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                    {area.suburbs.map(s => (
                      <li key={s} style={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ color: 'var(--accent-secondary)' }}>■</span> {s}
                      </li>
                    ))}
                  </ul>
                  <div style={{ marginTop: '2rem', padding: '1rem', background: '#fff', borderLeft: '4px solid var(--accent-secondary)', fontSize: '0.85rem', fontWeight: 700 }}>
                    Permit Processing & HOA Liaison services included for all {area.name} residential projects.
                  </div>
                  {'neighborhoods' in area && area.neighborhoods && (
                    <div style={{ marginTop: '1.5rem' }}>
                      <h4 style={{ textTransform: 'uppercase', fontSize: '0.9rem', fontWeight: 900, color: 'var(--bg-dark)', marginBottom: '0.75rem', letterSpacing: '0.05em' }}>Dedicated Guides:</h4>
                      <div style={{ display: 'grid', gap: '0.5rem' }}>
                        {area.neighborhoods.map((n: { name: string; href: string; tag: string }) => (
                          <Link key={n.href} href={n.href} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem 1rem', background: 'var(--bg-dark)', color: '#fff', fontWeight: 700, fontSize: '0.9rem', gap: '1rem' }}>
                            <span>{n.name} Pool Removal →</span>
                            <span style={{ color: 'var(--accent-secondary)', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{n.tag}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ / AUTHORITY SECTION (ANTI-THIN CONTENT) */}
      <section className={styles.section} style={{ background: 'var(--bg-dark)', color: '#fff' }}>
        <div className="container" style={{ maxWidth: '900px' }}>
          <h2 className={styles.sectionTitle} style={{ color: '#fff', textAlign: 'center', marginBottom: '3rem' }}>East Valley Pool Removal FAQ</h2>
          
          <div style={{ display: 'grid', gap: '2rem' }}>
            <div style={{ borderBottom: '1px solid var(--border-dark)', paddingBottom: '1.5rem' }}>
              <h3 style={{ color: 'var(--accent-primary)', fontSize: '1.25rem', marginBottom: '0.5rem' }}>Do you serve unincorporated areas of Pinal County?</h3>
              <p style={{ color: 'var(--text-inverse-muted)' }}>
                Yes. We frequently operate in San Tan Valley and other Pinal County pockets. We manage the Pinal County development permits so you don't have to navigate the paperwork yourself.
              </p>
            </div>
            <div style={{ borderBottom: '1px solid var(--border-dark)', paddingBottom: '1.5rem' }}>
              <h3 style={{ color: 'var(--accent-primary)', fontSize: '1.25rem', marginBottom: '0.5rem' }}>How do you handle HOA approvals in Las Sendas or Eastmark?</h3>
              <p style={{ color: 'var(--text-inverse-muted)' }}>
                HOAs in these premium Mesa neighborhoods have strict requirements regarding construction debris and equipment hours. We provide the necessary documentation and insurance certificates directly to the association to ensure a frictionless approval process.
              </p>
            </div>
            <div style={{ borderBottom: '1px solid var(--border-dark)', paddingBottom: '1.5rem' }}>
              <h3 style={{ color: 'var(--accent-primary)', fontSize: '1.25rem', marginBottom: '0.5rem' }}>Will these areas have a travel fee?</h3>
              <p style={{ color: 'var(--text-inverse-muted)' }}>
                No. All locations listed under our Service Areas (Mesa, Gilbert, Chandler, Queen Creek, San Tan Valley) are within our standard operating radius. Our pricing models account for the local soil conditions in each of these specific cities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className={`${styles.section} bg-hazard`} style={{ textAlign: 'center', padding: '5rem 0' }}>
        <div className="container">
          <h2 className={styles.sectionTitle} style={{ color: '#fff' }}>Ready to Reclaim Your Arizona Backyard?</h2>
          <p style={{ color: 'var(--accent-primary)', fontSize: '1.5rem', fontWeight: 900, marginBottom: '2.5rem' }}>
            Serving the entire Phoenix East Valley with Engineered Pool Demolition.
          </p>
          <Link href="/contact" className="btn btn-primary" style={{ padding: '1.5rem 4rem', fontSize: '1.5rem' }}>
            Get Your Regional Estimate
          </Link>
        </div>
      </section>
    </main>
  );
}
