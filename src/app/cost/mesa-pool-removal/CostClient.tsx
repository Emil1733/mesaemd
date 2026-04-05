"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../../page.module.css';

export default function CostClient() {
  const [formState, setFormState] = useState({
    poolType: 'Concrete',
    size: 'Medium',
    access: 'Easy'
  });

  const [estimate, setEstimate] = useState<{ min: number, max: number, timeline: string } | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    let min = 0;
    let max = 0;
    let timeline = "3-4 Days";

    if (formState.poolType === 'Concrete') { min = 14000; max = 22000; timeline = "4-5 Days"; }
    else if (formState.poolType === 'Fiberglass') { min = 10000; max = 15000; timeline = "3-4 Days"; }
    else { min = 7500; max = 12000; timeline = "2-3 Days"; }

    if (formState.size === 'Small') { max -= 2000; min -= 1500; }
    else if (formState.size === 'Large') { max += 5000; min += 3500; if (formState.poolType === 'Concrete') timeline = "5-7 Days"; }

    if (formState.access === 'Tight') { min += 1500; max += 2500; timeline = "Add 1 Day for Micro-Equipment"; }
    else if (formState.access === 'Crane Needed') { min += 5000; max += 8000; timeline = "Add 2 Days for Crane Ops"; }

    setEstimate({ min, max, timeline });
  };

  return (
    <main className={styles.main} style={{ background: 'var(--bg-light)' }}>
      
      {/* 1 & 2. HERO & IMMEDIATE VALUE */}
      <section className={styles.hero} style={{ minHeight: '75vh', borderBottom: '8px solid var(--accent-primary)' }}>
        <Image 
          src="https://images.unsplash.com/photo-1541888062831-29177a644265?auto=format&fit=crop&q=80&w=2000" 
          alt="Heavy machinery excavation" 
          fill
          priority
          className={styles.heroBg}
          sizes="100vw"
          style={{ opacity: 0.15, filter: 'grayscale(100%)', objectFit: 'cover' }}
        />
        <div className="container" style={{ position: 'relative', zIndex: 2, paddingTop: '8rem', paddingBottom: '4rem' }}>
          
          <div className={styles.grid2} style={{ alignItems: 'flex-start' }}>
            
            <div className="fade-in">
              <div className={styles.heroTag} style={{ marginBottom: '1.5rem' }}>Financial Precision</div>
              <h1 className={styles.heroTitle} style={{ fontSize: 'clamp(3rem, 5vw, 4.5rem)' }}>
                Cost to Remove a Pool in Mesa (2026 Guide)
              </h1>
              <p className={styles.heroDesc} style={{ fontSize: '1.25rem', marginBottom: '3rem', border: 'none', paddingLeft: 0, color: 'var(--text-inverse)' }}>
                Real pricing based on caliche soil density, access widths, and pool type — no generic estimates.
              </p>
              
              {/* IMMEDIACY VALUE BOX */}
              <div style={{ background: 'var(--bg-card)', color: 'var(--text-main)', padding: '2.5rem', borderRadius: '4px', borderLeft: '6px solid var(--accent-primary)', boxShadow: 'var(--shadow-float)' }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', textTransform: 'uppercase', fontWeight: 900, color: 'var(--text-muted)' }}>Mesa Averages at a Glance</h3>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-light)', paddingBottom: '1rem', marginBottom: '1rem' }}>
                  <span style={{ fontWeight: 700 }}>Partial Removal:</span>
                  <span style={{ fontWeight: 900, color: 'var(--accent-primary)' }}>$7,500 – $13,000</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-light)', paddingBottom: '1rem', marginBottom: '1rem' }}>
                  <span style={{ fontWeight: 700 }}>Full Removal:</span>
                  <span style={{ fontWeight: 900, color: 'var(--accent-primary)' }}>$14,000 – $26,000</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontWeight: 700 }}>Timeline:</span>
                  <span style={{ fontWeight: 900 }}>3–5 Days</span>
                </div>
                <p style={{ marginTop: '1.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>*Most Mesa homeowners fall within this range depending on strict soil hardness and structural access.</p>
              </div>
            </div>

            {/* 3. INLINE CALCULATOR */}
            <div className={`${styles.calculatorBox} fade-in`} style={{ animationDelay: '0.2s', borderTop: 'none', border: '2px solid var(--accent-primary)', marginTop: '2rem' }}>
              <div className={styles.calcTitle}>Instant Pool Removal Cost Calculator</div>
              
              <form onSubmit={handleCalculate}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Pool Type</label>
                  <select className={styles.formSelect} value={formState.poolType} onChange={e => setFormState({...formState, poolType: e.target.value})}>
                    <option>Concrete</option><option>Fiberglass</option><option>Vinyl</option>
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Pool Size</label>
                  <select className={styles.formSelect} value={formState.size} onChange={e => setFormState({...formState, size: e.target.value})}>
                    <option>Small</option><option>Medium</option><option>Large</option>
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Access (Excavator Path)</label>
                  <select className={styles.formSelect} value={formState.access} onChange={e => setFormState({...formState, access: e.target.value})}>
                    <option>Easy</option><option>Tight</option><option>Crane Needed</option>
                  </select>
                </div>
                
                <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
                  Calculate Range Now →
                </button>
              </form>

              {estimate && (
                <div style={{ animation: 'slideUp 0.3s ease-out forwards', marginTop: '2rem' }}>
                  <div style={{ background: 'var(--bg-dark)', padding: '1.5rem', marginBottom: '1.5rem', textAlign: 'center', borderTop: '4px solid var(--accent-secondary)' }}>
                    <div style={{ color: 'var(--text-inverse-muted)', fontSize: '0.85rem', textTransform: 'uppercase', fontWeight: 700, marginBottom: '0.5rem' }}>Estimated Cost:</div>
                    <div style={{ color: 'var(--accent-primary)', fontSize: '2.5rem', fontWeight: 900, fontFamily: 'var(--font-heading)' }}>
                      ${estimate.min.toLocaleString()} – ${estimate.max.toLocaleString()}
                    </div>
                    <div style={{ color: '#fff', fontWeight: 700, marginTop: '0.5rem' }}>{estimate.timeline}</div>
                  </div>

                  <form>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))', gap: '1rem' }}>
                      <input type="text" className={styles.formInput} placeholder="Name" required />
                      <input type="tel" className={styles.formInput} placeholder="Phone Number" required />
                    </div>
                    <button type="button" className="btn btn-dark" style={{ width: '100%', marginTop: '1rem' }}>
                      Lock this exact quote logic
                    </button>
                  </form>
                </div>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* 4. COST BREAKDOWN (SEO + TRUST) */}
      <section className={styles.section} style={{ background: 'var(--bg-light)' }}>
        <div className="container">
          <div className={styles.sectionHeader} style={{ textAlign: 'center', margin: '0 auto 4rem auto' }}>
            <span className={styles.sectionLabel}>Financial Variables</span>
            <h2 className={styles.sectionTitle}>What Affects Pool Removal Cost in Mesa?</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))', gap: '2rem' }}>
            <div style={{ background: '#fff', padding: '2rem', borderTop: '4px solid #ef4444' }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--bg-dark)' }}>1. Caliche Soil Hardness</h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '0.5rem' }}><strong>Biggest cost driver.</strong> Requires heavy-duty hydraulic breaking equipment.</p>
              <p style={{ color: '#ef4444', fontWeight: 900 }}>Adds $2k–$6k depending on density.</p>
            </div>
            
            <div style={{ background: '#fff', padding: '2rem', borderTop: '4px solid var(--accent-primary)' }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--bg-dark)' }}>2. Pool Size & Depth</h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Larger and deeper pools equal exponentially more debris haul-off and clean backfill importation.</p>
              <p style={{ color: 'var(--accent-primary)', fontWeight: 900 }}>Directly impacts labor + material volume.</p>
            </div>
            
            <div style={{ background: '#fff', padding: '2rem', borderTop: '4px solid var(--accent-secondary)' }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--bg-dark)' }}>3. Access to Backyard</h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Tight access (common in Mesa subdivisions) demands smaller equipment, heavy hand-labor, or crane lifts.</p>
            </div>
            
            <div style={{ background: '#fff', padding: '2rem', borderTop: '4px solid var(--border-dark)' }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--bg-dark)' }}>4. Pool Type</h3>
              <ul style={{ color: 'var(--text-muted)' }}>
                <li><strong>Concrete:</strong> Most Expensive</li>
                <li><strong>Fiberglass:</strong> Moderate</li>
                <li><strong>Vinyl:</strong> Cheapest</li>
              </ul>
            </div>

            <div style={{ background: '#fff', padding: '2rem', borderTop: '4px solid var(--bg-dark)' }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--bg-dark)' }}>5. HOA + Permit Requirements</h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Eastmark, Las Sendas, and Red Mountain Ranch require architectural approvals. Permit fees and exact inspections scale locally.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FULL VS PARTIAL COST COMPARISON */}
      <section className={styles.section} style={{ background: 'var(--bg-dark)', color: '#fff' }}>
        <div className="container" style={{ maxWidth: '900px' }}>
          <h2 className={styles.sectionTitle} style={{ textAlign: 'center', marginBottom: '4rem', color: '#fff' }}>Full vs Partial Pool Removal Cost in Mesa</h2>
          
          <table style={{ width: '100%', borderCollapse: 'collapse', background: '#111827', borderRadius: '8px', overflow: 'hidden' }}>
            <thead>
              <tr style={{ background: '#1f2937', textAlign: 'left' }}>
                <th style={{ padding: '1.5rem', fontSize: '1.25rem', borderBottom: '2px solid #374151' }}>Type</th>
                <th style={{ padding: '1.5rem', fontSize: '1.25rem', borderBottom: '2px solid #374151' }}>Cost Range</th>
                <th style={{ padding: '1.5rem', fontSize: '1.25rem', borderBottom: '2px solid #374151' }}>Best For</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: '1.5rem', borderBottom: '1px solid #374151', fontWeight: 900 }}>Partial Removal</td>
                <td style={{ padding: '1.5rem', borderBottom: '1px solid #374151', color: 'var(--accent-secondary)' }}>Lower</td>
                <td style={{ padding: '1.5rem', borderBottom: '1px solid #374151', color: 'var(--text-inverse-muted)' }}>Budget-focused homeowners restoring flat landscaping.</td>
              </tr>
              <tr>
                <td style={{ padding: '1.5rem', fontWeight: 900, color: 'var(--accent-primary)' }}>Full Removal</td>
                <td style={{ padding: '1.5rem', color: 'var(--accent-secondary)' }}>Higher</td>
                <td style={{ padding: '1.5rem', color: 'var(--text-inverse-muted)' }}>Resale advantage, building structures, long-term soil stability.</td>
              </tr>
            </tbody>
          </table>

          <div style={{ marginTop: '2rem', background: 'rgba(249,115,22,0.1)', padding: '1.5rem', borderLeft: '4px solid var(--accent-primary)', fontWeight: 700 }}>
            Full removal is often heavily preferred in Arizona by civil engineers due to future property values and long-term soil stability concerns.
          </div>
        </div>
      </section>

      {/* 6. REAL PROJECT EXAMPLES */}
      <section className={styles.section} style={{ background: 'var(--bg-light)' }}>
        <div className="container">
          <div className={styles.sectionHeader} style={{ textAlign: 'center', margin: '0 auto 4rem auto' }}>
            <h2 className={styles.sectionTitle}>Real Mesa Pool Removal Costs</h2>
            <p className={styles.sectionDesc}>Absolute transparency. Here's exactly what your neighbors recently paid.</p>
          </div>

          <div className={styles.grid3}>
            <div className={styles.priceCard} style={{ borderTop: '6px solid var(--bg-dark)' }}>
              <div style={{ color: 'var(--accent-primary)', fontWeight: 900, marginBottom: '1rem', fontSize: '0.85rem', textTransform: 'uppercase' }}>Example 1</div>
              <ul style={{ listStyle: 'none', marginBottom: '1.5rem' }}>
                <li style={{ marginBottom: '0.5rem' }}><strong>Location:</strong> East Mesa</li>
                <li style={{ marginBottom: '0.5rem' }}><strong>Pool:</strong> Medium Concrete</li>
                <li style={{ marginBottom: '0.5rem' }}><strong>Access:</strong> Standard</li>
              </ul>
              <div style={{ fontSize: '2.5rem', fontWeight: 900, fontFamily: 'var(--font-heading)', color: 'var(--text-main)' }}>~$16,500</div>
            </div>

            <div className={styles.priceCard} style={{ borderTop: '6px solid var(--accent-primary)', transform: 'scale(1.05)' }}>
              <div style={{ color: 'var(--accent-primary)', fontWeight: 900, marginBottom: '1rem', fontSize: '0.85rem', textTransform: 'uppercase' }}>Example 2</div>
              <ul style={{ listStyle: 'none', marginBottom: '1.5rem' }}>
                <li style={{ marginBottom: '0.5rem' }}><strong>Location:</strong> Las Sendas</li>
                <li style={{ marginBottom: '0.5rem' }}><strong>Pool:</strong> Large Concrete + Caliche</li>
                <li style={{ marginBottom: '0.5rem' }}><strong>Access:</strong> Medium</li>
              </ul>
              <div style={{ fontSize: '2.5rem', fontWeight: 900, fontFamily: 'var(--font-heading)', color: 'var(--text-main)' }}>~$22,000</div>
            </div>

            <div className={styles.priceCard} style={{ borderTop: '6px solid var(--bg-dark)' }}>
              <div style={{ color: 'var(--accent-primary)', fontWeight: 900, marginBottom: '1rem', fontSize: '0.85rem', textTransform: 'uppercase' }}>Example 3</div>
              <ul style={{ listStyle: 'none', marginBottom: '1.5rem' }}>
                <li style={{ marginBottom: '0.5rem' }}><strong>Location:</strong> Dobson Ranch</li>
                <li style={{ marginBottom: '0.5rem' }}><strong>Pool:</strong> Small Partial Removal</li>
                <li style={{ marginBottom: '0.5rem' }}><strong>Access:</strong> Tight</li>
              </ul>
              <div style={{ fontSize: '2.5rem', fontWeight: 900, fontFamily: 'var(--font-heading)', color: 'var(--text-main)' }}>~$9,800</div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. WHY CHEAP QUOTES FAIL & 8. COMPACTION */}
      <section className={styles.section} style={{ background: '#fff' }}>
        <div className={`container ${styles.splitLayout}`}>
          <div className={styles.dangerBox}>
            <h2 className={styles.dangerTitle} style={{ fontSize: '2.5rem', lineHeight: 1.1 }}>Why Some Mesa Quotes Are Too Low</h2>
            <p style={{ color: '#d1d5db', marginBottom: '1.5rem' }}>Cheap contractors will lowball to win the bid. This means they often:</p>
            <ul className={styles.dangerList}>
              <li style={{ color: '#fca5a5' }}>Skip proper 90%+ compaction</li>
              <li style={{ color: '#fca5a5' }}>Don't handle the harsh caliche correctly</li>
              <li style={{ color: '#fca5a5' }}>Leave subsurface voids leading to future sinking</li>
            </ul>
            <div style={{ marginTop: '2rem', padding: '1rem', background: 'rgba(239,68,68,0.2)', borderLeft: '4px solid #ef4444', color: '#fff', fontWeight: 900 }}>
              The Result: Homeowners pay twice when the yard collapses.
            </div>
          </div>

          <div style={{ padding: '3rem', border: '1px solid var(--border-light)' }}>
            <span className={styles.sectionLabel}>The Professional Standard</span>
            <h2 className={styles.sectionTitle} style={{ fontSize: '2rem' }}>Compaction Matters More Than Price</h2>
            <ul style={{ listStyle: 'none', marginTop: '1.5rem' }}>
              <li style={{ marginBottom: '1rem', fontWeight: 700 }}>■ 90–95% geotechnical compaction standard</li>
              <li style={{ marginBottom: '1rem', fontWeight: 700 }}>■ Layered structural backfill (8–12 inch lifts)</li>
              <li style={{ fontWeight: 700 }}>■ Highly Required For:</li>
            </ul>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
              <span style={{ padding: '0.5rem 1rem', background: 'var(--bg-light)', borderRadius: '4px', fontSize: '0.85rem', fontWeight: 900 }}>Future Patios</span>
              <span style={{ padding: '0.5rem 1rem', background: 'var(--bg-light)', borderRadius: '4px', fontSize: '0.85rem', fontWeight: 900 }}>Room Additions</span>
              <span style={{ padding: '0.5rem 1rem', background: 'var(--bg-light)', borderRadius: '4px', fontSize: '0.85rem', fontWeight: 900 }}>Property Resale</span>
            </div>
          </div>
        </div>
      </section>

      {/* 9. FAQ */}
      <section className={styles.section} style={{ background: 'var(--bg-dark)', color: '#fff' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <h2 className={styles.sectionTitle} style={{ textAlign: 'center', marginBottom: '4rem', color: '#fff' }}>Frequently Asked Cost Questions</h2>
          <div style={{ display: 'grid', gap: '2rem' }}>
            <div style={{ paddingBottom: '1.5rem', borderBottom: '1px solid #374151' }}>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--accent-primary)', marginBottom: '0.5rem' }}>How long does pool removal take in Mesa?</h3>
              <p style={{ color: 'var(--text-inverse-muted)' }}>Typically 3-5 days. If structural crane lifts or extreme caliche breakout is required, expect an additional day or two.</p>
            </div>
            <div style={{ paddingBottom: '1.5rem', borderBottom: '1px solid #374151' }}>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--accent-primary)', marginBottom: '0.5rem' }}>Do I need a permit in Mesa AZ?</h3>
              <p style={{ color: 'var(--text-inverse-muted)' }}>Absolutely. Maricopa County laws mandate demolition permits prior to utility severance and excavation. We handle this inherently.</p>
            </div>
            <div style={{ paddingBottom: '1.5rem', borderBottom: '1px solid #374151' }}>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--accent-primary)', marginBottom: '0.5rem' }}>Can I build on top after removal?</h3>
              <p style={{ color: 'var(--text-inverse-muted)' }}>Yes, but ONLY if you execute a Full Removal verified with 95% minimum soil compaction.</p>
            </div>
            <div>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--accent-primary)', marginBottom: '0.5rem' }}>Is partial removal allowed in Arizona?</h3>
              <p style={{ color: 'var(--text-inverse-muted)' }}>It is legally allowed and often referred to as "pool abandonment." It is cheaper but places permanent structural limitations on that specific land quadrant.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 10. FINAL CTA */}
      <section className={`${styles.section} bg-hazard`} style={{ textAlign: 'center', padding: '4rem 0' }}>
        <div className="container">
          <h2 className={styles.sectionTitle} style={{ color: '#fff' }}>Get Your Exact Pool Removal Cost in Mesa</h2>
          <p style={{ color: 'var(--accent-primary)', fontSize: '1.5rem', fontWeight: 900, margin: '1.5rem 0 3rem 0', textTransform: 'uppercase' }}>
            No guessing. No hidden costs. Instant estimate in seconds.
          </p>
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="btn btn-primary" style={{ padding: '1.5rem 4rem', fontSize: '1.5rem' }}>
            Calculate My Immediate Cost
          </button>
        </div>
      </section>

    </main>
  );
}
