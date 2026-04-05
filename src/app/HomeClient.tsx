"use client";

import { useState } from 'react';
import Image from 'next/image';
import styles from './page.module.css';
import { supabase } from '../lib/supabase';

export default function HomeClient() {
  const [formState, setFormState] = useState({
    poolType: 'Concrete',
    size: 'Medium',
    access: 'Easy'
  });

  const [estimate, setEstimate] = useState<{ min: number, max: number } | null>(null);
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    let min = 0;
    let max = 0;

    // Base cost
    if (formState.poolType === 'Concrete') {
      min = 12000; max = 16000;
    } else if (formState.poolType === 'Fiberglass') {
      min = 8000; max = 12000;
    } else { // Vinyl
      min = 6000; max = 9500;
    }

    // Size modifier
    if (formState.size === 'Small') {
      max -= 2000; min -= 1500;
    } else if (formState.size === 'Large') {
      max += 4000; min += 3000;
    }

    // Access modifier
    if (formState.access === 'Limited') {
      min += 1500; max += 2000;
    } else if (formState.access === 'Tight alley') {
      min += 3500; max += 5000;
    }

    setEstimate({ min, max });
    setStep(2);
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || !name) return;
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from('emd_leads_atlanta')
        .insert([{
          pool_type: formState.poolType,
          pool_size: formState.size,
          full_name: name,
          phone: phone,
          estimated_price_range: estimate ? `$${estimate.min} - $${estimate.max} | Access: ${formState.access}` : 'N/A',
          source_page: 'Mesa EMD - Homepage Inline Calculator'
        }]);

      if (error) throw error;
      
      setSubmitSuccess(true);
    } catch (err: any) {
      console.error('Submission error:', err);
      alert('There was a problem locking your estimate. Please call instead.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className={styles.main}>
      {/* 1. HERO SECTION (ABOVE THE FOLD) */}
      <section className={styles.hero}>
        <Image 
          src="https://images.unsplash.com/photo-1541888062831-29177a644265?auto=format&fit=crop&q=80&w=2000" 
          alt="Heavy machinery excavation in Mesa Arizona" 
          fill
          priority
          className={styles.heroBg}
          sizes="100vw"
          style={{ objectFit: 'cover' }}
        />
        <div className={styles.heroOverlay}></div>
        
        <div className={`container ${styles.heroGrid}`}>
          <div className="fade-in">
            <h1 className={styles.heroTitle}>
              Mesa Pool Removal & Demolition
            </h1>
            <p className={styles.heroDesc}>
              Concrete & fiberglass pool removal in Mesa with engineered caliche excavation and 95% compaction backfill. Most projects completed in 3–5 days.
            </p>
            

            <ul className={styles.trustBullets}>
              <li>Licensed & insured in Arizona</li>
              <li>Maricopa County permit handling</li>
              <li>Compaction-ready for future builds</li>
              <li>HOA & access-restricted property specialists</li>
            </ul>
          </div>

          {/* 2. INLINE CALCULATOR (VISIBLE) */}
          <div id="calculator" className={`${styles.calculatorBox} fade-in`} style={{ animationDelay: '0.2s' }}>
            <div className={styles.calcTitle}>Instant Estimate Calculator</div>
            
            {step === 1 && (
              <form onSubmit={handleCalculate} style={{ animation: 'slideUp 0.3s ease-out forwards' }}>
                <div className={styles.formGroup}>
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
                
                <div className={styles.formGroup}>
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

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Backyard Access</label>
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

                <button type="submit" className="btn btn-dark" style={{ width: '100%', marginTop: '0.5rem' }}>
                  Calculate Now
                </button>
              </form>
            )}

            {step === 2 && estimate && (
              <div className={styles.calcResult} style={{ animation: 'slideUp 0.3s ease-out forwards' }}>
                <div style={{ fontWeight: 900, textTransform: 'uppercase', marginBottom: '0.5rem', color: '#9ca3af' }}>
                  Estimated Range:
                </div>
                <div className={styles.calcRange}>
                  ${estimate.min.toLocaleString()} – ${estimate.max.toLocaleString()}
                </div>
                
                {submitSuccess ? (
                  <div style={{ background: '#059669', color: '#fff', padding: '1.5rem', marginTop: '1.5rem', textAlign: 'center', borderRadius: '4px' }}>
                    <div style={{ fontSize: '1.25rem', fontWeight: 900, marginBottom: '0.5rem' }}>Estimate Locked! ✓</div>
                    <div style={{ opacity: 0.9 }}>An East Valley project manager will text you shortly to verify site access details.</div>
                  </div>
                ) : (
                  <form onSubmit={handleLeadSubmit} style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <input type="text" placeholder="Your Name" className={styles.formInput} value={name} onChange={e => setName(e.target.value)} required />
                    <input type="tel" placeholder="Phone Number" className={styles.formInput} value={phone} onChange={e => setPhone(e.target.value)} required />
                    <button type="submit" disabled={isSubmitting} className="btn btn-primary" style={{ width: '100%', opacity: isSubmitting ? 0.7 : 1 }}>
                      {isSubmitting ? 'Locking...' : 'Lock this estimate'}
                    </button>
                    <button type="button" onClick={() => setStep(1)} style={{ width: '100%', padding: '0.75rem', background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', textDecoration: 'underline' }}>
                      ← Back to recalculate
                    </button>
                  </form>
                )}

                <div className={styles.calcMicrocopy}>
                  Most Mesa pools are concrete with caliche base — excavation can increase cost.
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 3. LOCAL AUTHORITY BLOCK */}
      <section className={`${styles.section} ${styles.sectionDark}`}>
        <div className={`container ${styles.splitLayout}`}>
          <div>
            <h2 className={styles.sectionTitle}>Why Pool Removal in Mesa Requires Caliche Excavation Expertise</h2>
            <p className={styles.sectionDesc} style={{ marginBottom: '1.5rem' }}>
              Speak to a contractor who has done 100 jobs in Mesa. We understand the specific geotechnical hurdles your property sits on.
            </p>
            <ul className={styles.dangerList}>
              <li>Caliche layer (hard desert soil) demands jackhammer / breaker requirements</li>
              <li>Drainage + soil expansion issues if backfilled wrong</li>
              <li>Compaction is critically important for resale and future structures</li>
            </ul>
          </div>
          
          <div className={styles.dangerBox}>
            <div style={{ color: '#9ca3af', fontWeight: 'bold', marginBottom: '1rem', textTransform: 'uppercase' }}>
              Strict Maricopa Requirements
            </div>
            <ul className={styles.dangerList}>
              <li>We perform specialized <strong>caliche excavation</strong> using heavy-duty breakers.</li>
              <li>We meet or exceed <strong>Maricopa County compaction expectations</strong>.</li>
              <li>Every job receives <strong>foundation-safe backfill</strong>.</li>
              <li>We stand by standard <strong>Proctor density testing</strong>.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 4. SERVICE TYPES SECTION */}
      <section className={`${styles.section} ${styles.sectionLight}`}>
        <div className="container">
          <div className={styles.sectionHeader} style={{ textAlign: 'center', margin: '0 auto 4rem auto' }}>
            <h2 className={styles.sectionTitle}>Full Removal vs Partial Pool Fill-In in Mesa</h2>
            <p className={styles.sectionDesc} style={{ fontWeight: 700, color: 'var(--accent-primary)' }}>
              In Arizona, partial removal is often referred to as "pool abandonment."
            </p>
          </div>

          <div className={styles.grid2}>
            <div className={styles.serviceCol} style={{ borderTop: '6px solid var(--accent-primary)' }}>
              <h3 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Full Removal</h3>
              <ul>
                <li>Entire shell removed completely</li>
                <li>Required for future construction over area</li>
                <li>Higher cost, definitively higher property value</li>
              </ul>
            </div>
            
            <div className={styles.serviceCol} style={{ borderTop: '6px solid var(--bg-dark)' }}>
              <h3 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Partial (Abandonment)</h3>
              <ul>
                <li>Shell broken at top and buried</li>
                <li>Budget-friendly option</li>
                <li>Common in older Mesa homes</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 5. 3-STEP PROCESS */}
      <section className={`${styles.section} bg-hazard`}>
        <div className="container">
          <div className={styles.sectionHeader} style={{ textAlign: 'center', margin: '0 auto 4rem auto' }}>
            <h2 className={styles.sectionTitle} style={{ color: '#fff' }}>Our Mesa Pool Removal Process</h2>
          </div>

          <div className={styles.grid3}>
            <div className={styles.processCard}>
              <div className={styles.processNum}>1</div>
              <div className={styles.processContent}>
                <h3>Inspection & Permit Setup</h3>
                <p style={{ color: 'var(--text-muted)' }}>We evaluate access, soil conditions, and HOA restrictions across all Mesa neighborhoods.</p>
              </div>
            </div>
            <div className={styles.processCard}>
              <div className={styles.processNum}>2</div>
              <div className={styles.processContent}>
                <h3>Demolition & Excavation</h3>
                <p style={{ color: 'var(--text-muted)' }}>Concrete break-up and advanced caliche removal using heavy equipment and breakers.</p>
              </div>
            </div>
            <div className={styles.processCard}>
              <div className={styles.processNum}>3</div>
              <div className={styles.processContent}>
                <h3>Engineered Backfill & Compaction</h3>
                <p style={{ color: 'var(--text-muted)' }}>Layered fill combined with aggressive compaction for long-term geotechnical stability.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. HYPER-LOCAL NEIGHBORHOOD SECTION */}
      <section className={`${styles.section} ${styles.sectionLight}`}>
        <div className="container">
          <div className={styles.sectionHeader} style={{ textAlign: 'center', margin: '0 auto 3rem auto' }}>
            <h2 className={styles.sectionTitle}>Serving Mesa Neighborhoods & Surrounding Areas</h2>
            <p className={styles.sectionDesc}>We intimately understand the strict ordinances and property layouts throughout the East Valley.</p>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center', marginBottom: '2rem' }}>
            <span className={styles.neighborhoodTag}>Eastmark</span>
            <span className={styles.neighborhoodTag}>Las Sendas</span>
            <span className={styles.neighborhoodTag}>Dobson Ranch</span>
            <span className={styles.neighborhoodTag}>Red Mountain Ranch</span>
            <span className={styles.neighborhoodTag}>Alta Mesa</span>
          </div>
          
          <p style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '1.2rem', color: 'var(--text-muted)' }}>
            We also service nearby areas including Gilbert and Chandler.
          </p>
        </div>
      </section>

      {/* 7. TRUST / TESTIMONIALS */}
      <section className={`${styles.section} ${styles.sectionDark}`}>
        <div className="container">
          <h2 className={styles.sectionTitle} style={{ textAlign: 'center', marginBottom: '4rem' }}>
            Recent Pool Removal Projects in Mesa
          </h2>

          <div className={styles.grid2}>
            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '3rem', borderLeft: '4px solid var(--accent-primary)' }}>
              <p style={{ fontSize: '1.2rem', fontStyle: 'italic', marginBottom: '1.5rem', lineHeight: 1.8 }}>
                “The crew handled our tight backyard in Las Sendas without damaging anything. The compaction report helped us pass inspection when selling.”
              </p>
              <h4 style={{ color: 'var(--accent-primary)', fontSize: '1.2rem' }}>— Las Sendas Resident</h4>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '3rem', borderLeft: '4px solid var(--accent-primary)' }}>
              <p style={{ fontSize: '1.2rem', fontStyle: 'italic', marginBottom: '1.5rem', lineHeight: 1.8 }}>
                “We removed a 90s concrete pool in Dobson Ranch — they handled permits and left the yard perfectly level amidst a massive mess of caliche.”
              </p>
              <h4 style={{ color: 'var(--accent-primary)', fontSize: '1.2rem' }}>— Dobson Ranch Resident</h4>
            </div>
          </div>
        </div>
      </section>

      {/* 8. COST EXPECTATION BLOCK */}
      <section className={`${styles.section} ${styles.sectionLight}`} style={{ textAlign: 'center' }}>
        <div className="container">
          <h2 className={styles.sectionTitle}>Average Pool Removal Cost in Mesa (2026)</h2>
          
          <div className={styles.grid2} style={{ marginTop: '3rem' }}>
            <div className={styles.costExpectation} style={{ margin: 0 }}>
              <h3 style={{ fontSize: '2rem' }}>Concrete Pools</h3>
              <div className={styles.costPrice}>$12k – $20k</div>
              <p style={{ fontWeight: 'bold' }}>Access difficulty impacts cost.</p>
            </div>
            
            <div className={styles.costExpectation} style={{ margin: 0, background: 'var(--bg-dark)', color: '#fff' }}>
              <h3 style={{ fontSize: '2rem', color: '#fff' }}>Fiberglass Pools</h3>
              <div className={styles.costPrice} style={{ color: 'var(--accent-primary)' }}>$8k – $15k</div>
              <p style={{ color: '#9ca3af' }}>Caliche increases excavation cost.</p>
            </div>
          </div>
          
          <div style={{ marginTop: '2rem' }}>
            <a href="#calculator" className="btn btn-primary">
              Use the estimator above for a real-time quote
            </a>
          </div>
        </div>
      </section>

      {/* 9. PERMIT + COMPLIANCE BLOCK */}
      <section className={`${styles.section} ${styles.sectionDark}`}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <h2 className={styles.sectionTitle}>Mesa & Maricopa County Permit Requirements</h2>
          
          <div style={{ display: 'inline-block', textAlign: 'left', background: 'var(--bg-light)', padding: '3rem', border: '1px solid var(--border-light)', marginTop: '2rem' }}>
            <ul className={styles.dangerList} style={{ marginBottom: '2rem' }}>
              <li style={{ color: 'var(--text-main)' }}>Demolition permits are legally required.</li>
              <li style={{ color: 'var(--text-main)' }}>Inspection requirements MUST be met prior to backfill.</li>
              <li style={{ color: 'var(--text-main)' }}>Professional compaction may be required for future structures.</li>
            </ul>
            
            <div style={{ background: 'var(--accent-primary)', color: '#fff', padding: '1.5rem', fontWeight: 900, textTransform: 'uppercase', textAlign: 'center' }}>
              We handle all permit coordination for Mesa and Maricopa County.
            </div>
          </div>
        </div>
      </section>

      {/* 10. FINAL CTA */}
      <section className={`${styles.section} bg-hazard`} style={{ textAlign: 'center', padding: '4rem 0' }}>
        <div className="container">
          <h2 className={styles.sectionTitle} style={{ color: '#fff' }}>Get Your Mesa Pool Removal Estimate</h2>
          <p style={{ color: 'var(--accent-primary)', fontSize: '1.5rem', fontWeight: 900, margin: '1.5rem 0 3rem 0', textTransform: 'uppercase' }}>
            Most Mesa projects are booked 1–2 weeks in advance.
          </p>
          <a href="#calculator" className="btn btn-primary" style={{ padding: '1.5rem 4rem', fontSize: '1.5rem' }}>
            Get My Estimate
          </a>
        </div>
      </section>

    </main>
  );
}
