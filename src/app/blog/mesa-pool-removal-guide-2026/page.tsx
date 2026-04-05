import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../../page.module.css';

export const metadata: Metadata = {
  title: "Mesa Pool Removal Guide 2026 | Costs, Permits & Soil",
  description: "The definitive guide to swimming pool demolition in Mesa, Arizona. Learn about caliche excavation, engineered backfill, and property value impacts.",
};

export default function BlogPost() {
  return (
    <main className={styles.main} style={{ background: 'var(--bg-light)' }}>
      {/* 1. HERO - BLOG ARTICLE */ }
      <section className={styles.hero} style={{ minHeight: '50vh' }}>
        <Image 
          src="https://images.unsplash.com/photo-1541888062831-29177a644265?auto=format&fit=crop&q=80&w=2000" 
          alt="Mesa Pool Demolition Guide" 
          fill
          priority
          className={styles.heroBg}
          sizes="100vw"
          style={{ filter: 'grayscale(100%) contrast(150%) opacity(30%)', objectFit: 'cover' }}
        />
        <div className={styles.heroOverlay} style={{ background: 'linear-gradient(180deg, rgba(10,10,10,0.8) 0%, rgba(10,10,10,1) 100%)' }}></div>
        
        <div className="container" style={{ position: 'relative', zIndex: 2, paddingTop: '8rem', paddingBottom: '4rem', textAlign: 'center', maxWidth: '900px' }}>
          <div className={styles.heroTag} style={{ marginBottom: '1rem', background: 'var(--bg-dark)', border: '1px solid var(--accent-primary)' }}>Authority Guide</div>
          <h1 className={styles.heroTitle} style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
            The Complete Guide to Pool Removal in Mesa (2026)
          </h1>
          <p className={styles.heroDesc} style={{ margin: '0 auto', border: 'none', padding: 0 }}>
            Everything homeowners need to know about demolition, costs, permits, and soil conditions in Mesa, Arizona.
          </p>
        </div>
      </section>

      {/* ARTICLE BODY */}
      <section className={styles.section} style={{ paddingTop: '4rem' }}>
        <article className="container" style={{ maxWidth: '800px', background: 'var(--bg-card)', padding: '4rem', borderRadius: '4px', borderTop: '8px solid var(--accent-primary)', boxShadow: 'var(--shadow-heavy)', color: 'var(--text-main)', fontSize: '1.125rem', lineHeight: '1.8' }}>
          
          {/* 2. INTRO */}
          <div style={{ marginBottom: '3rem' }}>
            <p style={{ marginBottom: '1.5rem', fontSize: '1.25rem', fontWeight: 500 }}>
              Across the East Valley, thousands of swimming pools built in the 1980s and 90s have reached the end of their structural lifespan. If you own an aging pool in Mesa, you are likely facing skyrocketing maintenance costs, heavy chemical usage, and severe structural cracking.
            </p>
            <p style={{ marginBottom: '1.5rem' }}>
              Combined with the rising costs of water and strict drought management in Arizona, it’s no surprise that more Mesa homeowners are choosing high-quality pool removal over $25,000+ remodels. Removing an old, unused pool reclaims your backyard, eliminates liabilities, and dramatically cuts your utility expenditures. But getting it done right in the specific soil conditions of Mesa is an entirely different matter.
            </p>
          </div>

          {/* 3. TYPES OF POOL REMOVAL */}
          <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: 'var(--bg-dark)', borderBottom: '2px solid var(--border-light)', paddingBottom: '0.5rem' }}>Your Options for Pool Removal in Mesa</h2>
          <p style={{ marginBottom: '1.5rem' }}>When speaking with demolition experts, you’ll be offered two distinct paths. Choosing the wrong one can severely impact your property value down the line.</p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))', gap: '2rem', marginBottom: '3rem' }}>
            <div style={{ background: '#f8fafc', padding: '2rem', border: '1px solid var(--border-light)' }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--accent-primary)' }}>Partial Removal (Abandonment)</h3>
              <ul style={{ listStyle: 'none', marginLeft: 0 }}>
                <li style={{ marginBottom: '0.5rem' }}>✓ Lower overall cost</li>
                <li style={{ marginBottom: '0.5rem' }}>✓ Faster demolition timeline</li>
                <li style={{ marginBottom: '0.5rem', color: '#be123c', fontWeight: 700 }}>✗ Land is NOT buildable later</li>
              </ul>
            </div>
            <div style={{ background: '#f8fafc', padding: '2rem', border: '1px solid var(--border-light)' }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--bg-dark)' }}>Full Removal</h3>
              <ul style={{ listStyle: 'none', marginLeft: 0 }}>
                <li style={{ marginBottom: '0.5rem' }}>✓ Fully buildable land restored</li>
                <li style={{ marginBottom: '0.5rem' }}>✓ Better for future resale value</li>
                <li style={{ marginBottom: '0.5rem', color: 'var(--text-muted)' }}>✗ Higher upfront cost</li>
              </ul>
            </div>
          </div>
          <p style={{ marginBottom: '3rem' }}>*Read our detailed breakdown of <Link href="/pool-removal" style={{ color: 'var(--accent-primary)', fontWeight: 'bold', textDecoration: 'underline' }}>full vs partial removal</Link> to ensure you make the right structural choice for your property.</p>

          {/* 4. COST SECTION */}
          <div style={{ background: 'var(--bg-dark)', color: '#fff', padding: '3rem', margin: '3rem -4rem', borderLeft: '8px solid var(--accent-primary)' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: '#fff' }}>How Much Does Pool Removal Cost in Mesa?</h2>
            <p style={{ marginBottom: '1.5rem', color: '#cbd5e1' }}>While national averages vary wildly, you can expect an Arizona removal project to land strictly between <strong>$7,500 to $26,000</strong>.</p>
            <p style={{ color: '#cbd5e1', marginBottom: '1.5rem' }}>Why the huge gap? Factors like concrete thickness, access width, and geotechnical soil demands drastically impact real-world contractor pricing.</p>
            <Link href="/cost" className="btn btn-primary">See full breakdown → /cost/mesa-pool-removal</Link>
          </div>

          {/* 5. PERMITS & REGULATIONS */}
          <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: 'var(--bg-dark)' }}>Mesa Pool Removal Permits & Regulations</h2>
          <p style={{ marginBottom: '1.5rem' }}>Attempting an unpermitted "fill-in" is the fastest way to derail a future home sale. In Maricopa County, the demolition process is highly regulated.</p>
          <ul style={{ marginBottom: '3rem', paddingLeft: '1.5rem', listStyleType: 'square' }}>
            <li style={{ marginBottom: '0.5rem' }}><strong>Maricopa County Specifications:</strong> Permits for full demolition and abandonment are mandatorily required.</li>
            <li style={{ marginBottom: '0.5rem' }}><strong>City Inspections:</strong> Open hole, drainage, and final compaction inspections MUST occur during the project.</li>
            <li style={{ marginBottom: '0.5rem' }}><strong>Utility Disconnects:</strong> Proper severance of municipal water lines and gas/electrical circuits is not just code—it’s critical safety protocol.</li>
          </ul>

          {/* 6. SOIL CONDITIONS */}
          <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: 'var(--accent-primary)' }}>Why Mesa’s Caliche Soil Changes Everything</h2>
          <p style={{ marginBottom: '1.5rem' }}>If you take away nothing else from this guide, understand this: <strong>Mesa soil is not standard dirt.</strong></p>
          <p style={{ marginBottom: '1.5rem' }}>Much of the East Valley sits on dense <em>caliche layers</em>—a naturally occurring cement-like desert soil. When executing <Link href="/" style={{ color: 'var(--accent-primary)', fontWeight: 'bold' }}>pool removal in Mesa</Link>, a contractor cannot just show up with a small Bobcat. Heavy-duty hydraulic breakers are an absolute necessity.</p>
          <p style={{ marginBottom: '3rem', padding: '1.5rem', background: '#fffbeb', borderLeft: '4px solid var(--accent-secondary)' }}>
            Furthermore, excavating through caliche changes how backfill behaves. If engineered soil is not imported and aggressively compacted in 8-inch lifts, you run critical risks of severe settling and monsoon drainage failures.
          </p>

          {/* 7. STEP-BY-STEP PROCESS */}
          <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: 'var(--bg-dark)' }}>How Pool Removal Works (Step-by-Step)</h2>
          <div style={{ marginBottom: '3rem' }}>
            <div style={{ padding: '1rem', borderBottom: '1px solid var(--border-light)' }}><strong>1. Inspection:</strong> Deep structural evaluation and access planning.</div>
            <div style={{ padding: '1rem', borderBottom: '1px solid var(--border-light)' }}><strong>2. Permits:</strong> Municipal approvals and utility shutdowns.</div>
            <div style={{ padding: '1rem', borderBottom: '1px solid var(--border-light)' }}><strong>3. Demolition:</strong> Hydraulic breaking of the concrete or fiberglass shell.</div>
            <div style={{ padding: '1rem', borderBottom: '1px solid var(--border-light)' }}><strong>4. Backfill:</strong> Importation of foundation-safe dirt in strict lifts.</div>
            <div style={{ padding: '1rem' }}><strong>5. Compaction:</strong> Heavy vibrational rolling up to 95% Proctor density.</div>
          </div>

          {/* 8. TIMELINE EXPECTATION */}
          <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: 'var(--bg-dark)' }}>How Long Does Pool Removal Take in Mesa?</h2>
          <p style={{ marginBottom: '1.5rem' }}>The physical footprint of the project is surprisingly fast. Typical execution runs <strong>3–5 days</strong> upon mobilization.</p>
          <p style={{ marginBottom: '3rem' }}>However, delays happen. Expect timelines to stretch if obtaining permitting is dragged out by the city, if side-yard access requires micro-excavators instead of heavy loaders, or if the caliche soil necessitates days of heavy breaking.</p>

          {/* 9. COMMON MISTAKES */}
          <div style={{ background: '#fef2f2', border: '1px solid #fecaca', padding: '2rem', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: '#991b1b' }}>Mistakes Mesa Homeowners Make</h2>
            <ul style={{ listStyle: 'none', marginLeft: 0 }}>
              <li style={{ marginBottom: '1rem', color: '#7f1d1d' }}><strong>❌ Choosing the cheapest contractor:</strong> The lowest bid usually skips engineering-grade backfill.</li>
              <li style={{ marginBottom: '1rem', color: '#7f1d1d' }}><strong>❌ Ignoring Compaction:</strong> Resulting in massive sunken craters forming in your yard months later.</li>
              <li style={{ marginBottom: '1rem', color: '#7f1d1d' }}><strong>❌ Not checking permits:</strong> Triggering heavy municipal fines.</li>
              <li style={{ marginBottom: '1rem', color: '#7f1d1d' }}><strong>❌ Not planning future land use:</strong> Ordering a partial fill-in when they eventually want a gazebo or guest house.</li>
            </ul>
          </div>

          {/* 10. NEIGHBORHOOD TARGETING */}
          <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: 'var(--bg-dark)' }}>Pool Removal Across Mesa Neighborhoods</h2>
          <p style={{ marginBottom: '3rem' }}>
            Whether dealing with the complex HOA regulations in <strong>Eastmark</strong> and <strong>Las Sendas</strong>, maneuvering equipment through older plots in <strong>Dobson Ranch</strong>, or handling sloped elevations out in <strong>Red Mountain Ranch</strong>, the project dictates different tactical approaches. Hiring a crew deeply familiar with East Valley nuances streamlines everything from logistics to inspections.
          </p>

          {/* 11. FAQ SECTION */}
          <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: 'var(--bg-dark)' }}>Frequently Asked Questions</h2>
          <div style={{ marginBottom: '4rem' }}>
            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', fontWeight: 900 }}>Can I sell a house with a filled pool in Mesa?</h3>
              <p style={{ color: 'var(--text-muted)' }}>Yes, as long as it was permitted properly and disclosed. However, a "partial abandonment" must be explicitly revealed to buyers, whereas a full, geotechnically signed-off removal restores the land entirely.</p>
            </div>
            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', fontWeight: 900 }}>Is pool removal worth it in Arizona?</h3>
              <p style={{ color: 'var(--text-muted)' }}>Absolutely. With standard maintenance, chemicals, and pumping exceeding $2k-3k annually—and impending structural failure repairs frequently breaching $20k—removal offers rapid ROI while reclaiming valuable yard space.</p>
            </div>
            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', fontWeight: 900 }}>What’s the cheapest way to remove a pool?</h3>
              <p style={{ color: 'var(--text-muted)' }}>A partial abandonment is the lowest upfront cost, but be aware: you get what you pay for. Cutting costs on compaction to save a grand now will cost you ten times that when your yard collapses during monsoon season.</p>
            </div>
          </div>

        </article>
      </section>

      {/* 13. FINAL CTA */}
      <section className={`${styles.section} bg-hazard`} style={{ textAlign: 'center', padding: '4rem 0' }}>
        <div className="container">
          <h2 className={styles.sectionTitle} style={{ color: '#fff' }}>Ready to Remove Your Pool?</h2>
          <p style={{ color: 'var(--accent-primary)', fontSize: '1.5rem', fontWeight: 900, margin: '1.5rem 0 3rem 0', textTransform: 'uppercase' }}>
            Get a fast estimate and see your price range instantly.
          </p>
          <Link href="/#calculator" className="btn btn-primary" style={{ padding: '1.5rem 4rem', fontSize: '1.5rem' }}>
            Calculate Your Removal Cost
          </Link>
        </div>
      </section>


    </main>
  );
}
