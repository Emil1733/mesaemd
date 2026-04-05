"use client";

import { useState } from 'react';
import Image from 'next/image';
import styles from '../page.module.css';

export default function PoolRemovalClient() {
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

    // Base cost
    if (formState.poolType === 'Concrete') {
      min = 14000; max = 20000;
      timeline = "4-5 Days";
    } else if (formState.poolType === 'Fiberglass') {
      min = 10000; max = 15000;
      timeline = "3-4 Days";
    } else { // Vinyl
      min = 7500; max = 12000;
      timeline = "2-3 Days";
    }

    // Size modifier
    if (formState.size === 'Small') {
      max -= 2000; min -= 1500;
    } else if (formState.size === 'Large') {
      max += 5000; min += 3500;
      if (formState.poolType === 'Concrete') timeline = "5-7 Days";
    }

    // Access modifier
    if (formState.access === 'Limited') {
      min += 2000; max += 2500;
      timeline = "Add 1 Day for Access";
    } else if (formState.access === 'Tight alley') {
      min += 4000; max += 6000;
      timeline = "Add 2 Days for Micro-Equipment";
    }

    setEstimate({ min, max, timeline });
  };

  return (
    <main className={styles.main}>
      {/* 1. HERO SECTION & 2. CTA STRIP */}
      <section className={styles.hero} style={{ minHeight: '60vh' }}>
        <Image 
          src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=2000" 
          alt="Technical Pool Demolition Site" 
          fill
          priority
          className={styles.heroBg}
          sizes="100vw"
          style={{ objectFit: 'cover' }}
        />
        <div className={styles.heroOverlay} style={{ background: 'linear-gradient(90deg, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.7) 100%)' }}></div>
        
        <div className="container" style={{ position: 'relative', zIndex: 2, padding: '4rem 0' }}>
          <div className="fade-in" style={{ maxWidth: '850px' }}>
            <h1 className={styles.heroTitle} style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}>
              Pool Removal & <span style={{ color: 'var(--accent-primary)' }}>Demolition in Mesa</span>
            </h1>
            <p className={styles.heroDesc} style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>
              Engineered full & partial pool removal with certified compaction for Arizona caliche soil.
            </p>
            
            <div style={{ background: 'var(--accent-primary)', padding: '1.5rem', display: 'inline-block', borderRadius: '4px' }}>
              <a href="#calculator" className="btn btn-dark" style={{ border: '2px solid #000' }}>
                Get Mesa Pool Removal Estimate
              </a>
              <p style={{ marginTop: '0.75rem', fontWeight: 900, color: '#fff', fontSize: '0.9rem', textTransform: 'uppercase' }}>
                Most Mesa projects completed in 3–5 days. Permit handling included.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SERVICE TYPES BREAKDOWN */}
      <section className={`${styles.section} ${styles.sectionLight}`}>
        <div className="container">
          <div className={styles.grid2}>
            <div className={styles.serviceCol} style={{ borderTop: '6px solid var(--accent-primary)' }}>
              <h3 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Full Pool Removal <span style={{ display: 'block', fontSize: '1rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>(Best for resale/building)</span></h3>
              <ul>
                <li>Break & remove entire structure</li>
                <li>Haul debris completely offsite</li>
                <li>Backfill + density compaction (90–95%)</li>
              </ul>
              <div style={{ padding: '1rem', background: '#ffe4e6', color: '#be123c', fontWeight: 700, marginTop: '1.5rem', borderRadius: '4px' }}>
                Required if you plan to build a structure on the former pool area in many Maricopa County zones.
              </div>
            </div>
            
            <div className={styles.serviceCol} style={{ borderTop: '6px solid var(--bg-dark)' }}>
              <h3 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Partial (Abandonment) <span style={{ display: 'block', fontSize: '1rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>(Budget-friendly)</span></h3>
              <ul>
                <li>Punch deep holes for drainage</li>
                <li>Collapse structural walls inward</li>
                <li>Backfill + cap with soil/gravel</li>
              </ul>
              <div style={{ padding: '1rem', background: '#f3f4f6', color: '#374151', fontWeight: 700, marginTop: '1.5rem', borderRadius: '4px' }}>
                Lower cost option but may definitively limit future construction due to Arizona abandonment guidelines.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. COST SECTION */}
      <section className={`${styles.section} ${styles.sectionDark}`}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 className={styles.sectionTitle}>Mesa Pool Removal Cost (2026 Guide)</h2>
          
          <div className={styles.grid2} style={{ marginTop: '3rem', textAlign: 'left' }}>
            <div style={{ background: '#111827', padding: '3rem', border: '1px solid #374151' }}>
              <h3 style={{ color: '#fff', fontSize: '1.5rem', marginBottom: '1rem' }}>Cost Ranges:</h3>
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ color: '#9ca3af', textTransform: 'uppercase', fontSize: '0.875rem', fontWeight: 700 }}>Partial Removal</div>
                <div style={{ color: 'var(--accent-primary)', fontSize: '2.5rem', fontWeight: 900 }}>$7,500 – $13,000</div>
              </div>
              <div>
                <div style={{ color: '#9ca3af', textTransform: 'uppercase', fontSize: '0.875rem', fontWeight: 700 }}>Full Removal</div>
                <div style={{ color: 'var(--accent-primary)', fontSize: '2.5rem', fontWeight: 900 }}>$14,000 – $26,000</div>
              </div>
            </div>
            
            <div style={{ background: 'var(--accent-secondary)', padding: '3rem', color: '#000' }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Mesa-Specific Cost Drivers:</h3>
              <ul className={styles.dangerList} style={{ color: '#000' }}>
                <li style={{ color: '#000' }}><strong>Caliche Hardness:</strong> A major cost factor requiring heavy breakers.</li>
                <li style={{ color: '#000' }}><strong>Equipment Access:</strong> Tight side yards in East Mesa increase manual labor.</li>
                <li style={{ color: '#000' }}><strong>Size & Depth:</strong> Larger footprint equals more engineered backfill dirt.</li>
                <li style={{ color: '#000' }}><strong>HOA Requirements:</strong> Stringent in areas like Las Sendas and Eastmark.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 5. INLINE CALCULATOR */}
      <section id="calculator" className={`${styles.section} ${styles.sectionLight} bg-hazard`} style={{ padding: '4rem 0' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div className={styles.calculatorBox} style={{ borderTop: '8px solid var(--text-main)' }}>
            <div className={styles.calcTitle}>Detailed Project Estimator</div>
            
            <form onSubmit={handleCalculate}>
              <div className={styles.grid2} style={{ gap: '1.5rem' }}>
                <div className={styles.formGroup} style={{ marginBottom: 0 }}>
                  <label className={styles.formLabel}>Pool Type</label>
                  <select 
                    className={styles.formSelect}
                    value={formState.poolType}
                    onChange={(e) => setFormState({...formState, poolType: e.target.value})}
                  >
                    <option>Concrete</option>
                    <option>Fiberglass</option>
                    <option>Vinyl</option>
                  </select>
                </div>
                
                <div className={styles.formGroup} style={{ marginBottom: 0 }}>
                  <label className={styles.formLabel}>Pool Size</label>
                  <select 
                    className={styles.formSelect}
                    value={formState.size}
                    onChange={(e) => setFormState({...formState, size: e.target.value})}
                  >
                    <option>Small</option>
                    <option>Medium</option>
                    <option>Large</option>
                  </select>
                </div>
              </div>

              <div className={styles.formGroup} style={{ marginTop: '1.5rem' }}>
                <label className={styles.formLabel}>Site Access Restrictions</label>
                <select 
                  className={styles.formSelect}
                  value={formState.access}
                  onChange={(e) => setFormState({...formState, access: e.target.value})}
                >
                  <option>Easy</option>
                  <option>Limited</option>
                  <option>Tight alley</option>
                </select>
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem', padding: '1.5rem' }}>
                Calculate Pricing & Timeline
              </button>
            </form>

            {estimate && (
              <div className={styles.calcResult} style={{ background: '#f8fafc', color: 'var(--text-main)', border: '2px solid var(--accent-primary)', textAlign: 'left' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div>
                    <div style={{ fontWeight: 900, textTransform: 'uppercase', color: 'var(--text-muted)' }}>Estimated Range:</div>
                    <div className={styles.calcRange} style={{ fontSize: '3rem' }}>
                      ${estimate.min.toLocaleString()} – ${estimate.max.toLocaleString()}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontWeight: 900, textTransform: 'uppercase', color: 'var(--text-muted)' }}>Estimated Timeline:</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{estimate.timeline}</div>
                  </div>
                </div>
                
                <form style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <input type="text" placeholder="Your Phone Number" className={styles.formInput} style={{ borderColor: '#64748b' }} required />
                  <button type="button" className="btn btn-dark" style={{ width: '100%' }}>
                    Lock this Estimate Profile
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 6. AUTHORITY SECTION */}
      <section className={`${styles.section} ${styles.sectionCardBg}`}>
        <div className={`container ${styles.splitLayout}`}>
          <div>
            <span className={styles.sectionLabel}>Technical Authority</span>
            <h2 className={styles.sectionTitle}>Why Pool Removal in Mesa Requires Specialized Equipment</h2>
            <p className={styles.sectionDesc}>
              Mesa soil isn’t standard dirt. Most properties sit on dense <strong>caliche layers</strong> that require hydraulic breakers—not basic excavation equipment. Improper removal strictly leads to uneven settling, drainage issues during monsoons, and failed structural inspections during resale.
            </p>
          </div>
          <div className={styles.dangerBox} style={{ background: '#fff', border: '2px solid var(--border-light)', borderLeft: '6px solid var(--accent-primary)' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>We Specifically Deploy:</h3>
            <ul className={styles.dangerList}>
              <li style={{ color: 'var(--text-main)' }}>Caliche-grade heavy excavation equipment</li>
              <li style={{ color: 'var(--text-main)' }}>Layered geotechnical compaction (8–12 inch lifts)</li>
              <li style={{ color: 'var(--text-main)' }}>Rigid moisture-controlled backfill procedures</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 7. PROCESS */}
      <section className={`${styles.section} ${styles.sectionDark}`}>
        <div className="container">
          <div className={styles.sectionHeader} style={{ textAlign: 'center', margin: '0 auto 4rem auto' }}>
            <h2 className={styles.sectionTitle}>Our 3-Step Pool Removal Process</h2>
          </div>

          <div className={styles.grid3}>
            <div style={{ borderTop: '4px solid var(--accent-primary)', paddingTop: '1.5rem' }}>
              <div style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--accent-primary)', marginBottom: '0.5rem', lineHeight: 1 }}>01</div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#fff' }}>Inspection & Planning</h3>
              <p style={{ color: '#9ca3af' }}>We heavily evaluate access corridors, soil types, and specialized permit requirements across all Mesa neighborhoods.</p>
            </div>
            <div style={{ borderTop: '4px solid var(--accent-primary)', paddingTop: '1.5rem' }}>
              <div style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--accent-primary)', marginBottom: '0.5rem', lineHeight: 1 }}>02</div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#fff' }}>Demolition & Excavation</h3>
              <p style={{ color: '#9ca3af' }}>We shatter the concrete shell, extract debris completely from the property, and heavily prep the subgrade.</p>
            </div>
            <div style={{ borderTop: '4px solid var(--accent-primary)', paddingTop: '1.5rem' }}>
              <div style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--accent-primary)', marginBottom: '0.5rem', lineHeight: 1 }}>03</div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#fff' }}>Compaction & Final Grade</h3>
              <p style={{ color: '#9ca3af' }}>We rapidly backfill, aggressively compact in lifts, and precisely level the entire footprint for future structural use.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. PERMITS & COMPLIANCE & 9. SERVICE AREAS */}
      <section className={`${styles.section} ${styles.sectionLight}`}>
        <div className={`container ${styles.splitLayout}`}>
          <div>
            <h2 className={styles.sectionTitle}>Mesa Permit & Inspection Requirements</h2>
            <ul className={styles.serviceCol} style={{ padding: '2rem', listStyle: 'none' }}>
              <li style={{ borderBottom: '1px solid #e5e7eb', padding: '1rem 0', fontWeight: 700 }}>■ Maricopa County demolition permits required</li>
              <li style={{ borderBottom: '1px solid #e5e7eb', padding: '1rem 0', fontWeight: 700 }}>■ Inspections needed for strict Drainage Compliance</li>
              <li style={{ borderBottom: '1px solid #e5e7eb', padding: '1rem 0', fontWeight: 700 }}>■ Verified Soil Compaction evaluations</li>
              <li style={{ padding: '1rem 0', fontWeight: 700 }}>■ Strict HOA approvals (common in East Mesa communities)</li>
            </ul>
          </div>

          <div>
            <h2 className={styles.sectionTitle}>Mesa Service Expansion</h2>
            <p className={styles.sectionDesc} style={{ marginBottom: '1.5rem' }}>Operating heavily throughout:</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
              {['East Mesa', 'Las Sendas', 'Eastmark', 'Dobson Ranch', 'Red Mountain Ranch'].map(area => (
                <span key={area} style={{ background: 'var(--bg-dark)', color: '#fff', padding: '0.5rem 1rem', fontWeight: 900, borderRadius: '2px' }}>
                  {area}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 10. TESTIMONIALS & 11. FINAL CTA */}
      <section className={`${styles.section} ${styles.sectionCardBg}`} style={{ textAlign: 'center', borderTop: '6px solid var(--accent-primary)' }}>
        <div className="container" style={{ maxWidth: '900px' }}>
          
          <div style={{ marginBottom: '4rem', fontStyle: 'italic', fontSize: '1.5rem', color: 'var(--text-main)', padding: '2rem', background: '#f8fafc', borderLeft: '8px solid var(--accent-primary)' }}>
            “We removed a 20-year-old pool in East Mesa. The crew handled the caliche perfectly and left the yard precisely level for our patio build.”
            <div style={{ marginTop: '1rem', fontStyle: 'normal', fontWeight: 900, color: 'var(--bg-dark)' }}>— Jason M., Mesa AZ</div>
          </div>

          <h2 className={styles.sectionTitle} style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>Get Your Mesa Pool Removal Estimate Today</h2>
          <p style={{ fontSize: '1.25rem', fontWeight: 700, margin: '1rem 0 2.5rem 0', color: 'var(--text-muted)' }}>
            Fast pricing. No obligation. Engineered for Arizona soil conditions.
          </p>

          <a href="#calculator" className="btn btn-primary" style={{ padding: '1.5rem 4rem', fontSize: '1.5rem' }}>
            Calculate Your Price Now
          </a>
        </div>
      </section>

    </main>
  );
}
