"use client";

import { useState } from 'react';
import Image from 'next/image';
import styles from '../page.module.css';
import { supabase } from '../../lib/supabase';

export default function ContactClient() {
  const [formState, setFormState] = useState({
    poolType: 'Concrete',
    size: 'Medium',
    access: 'Easy',
    zipCode: '',
    city: 'Mesa',
    name: '',
    phone: '',
    email: '',
  });

  const [step, setStep] = useState(1);
  const [estimate, setEstimate] = useState<{ min: number, max: number } | null>(null);

  const calculateEstimate = () => {
    let min = 0;
    let max = 0;
    if (formState.poolType === 'Concrete') { min = 12000; max = 16000; }
    else if (formState.poolType === 'Fiberglass') { min = 8000; max = 12000; }
    else { min = 6000; max = 9500; }
    if (formState.size === 'Small') { max -= 2000; min -= 1500; }
    else if (formState.size === 'Large') { max += 4000; min += 3000; }
    if (formState.access === 'Limited') { min += 1500; max += 2000; }
    else if (formState.access === 'Tight alley') { min += 3500; max += 5000; }
    setEstimate({ min, max });
    setStep(2);
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [debugError, setDebugError] = useState<any>(null);

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setDebugError(null);
    
    try {
      const { error } = await supabase
        .from('emd_leads_atlanta')
        .insert([{
          pool_type: formState.poolType,
          pool_size: formState.size,
          full_name: `${formState.name} ${formState.email ? `(${formState.email})` : ''} - [${formState.zipCode}, ${formState.city}]`,
          phone: formState.phone,
          estimated_price_range: estimate ? `$${estimate.min} - $${estimate.max} | Access: ${formState.access}` : 'N/A',
          source_page: 'Mesa EMD - Contact Page'
        }]);

      if (error) throw error;
      
      alert('Estimate locked successfully! We will contact you within 24 hours.');
      setStep(1); // Reset
    } catch (err: any) {
      console.error('Submission error:', err);
      setDebugError(err);
      alert('There was a problem submitting your request. See the debug logs attached below.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className={styles.main} style={{ background: 'var(--bg-light)' }}>
      
      {/* 1. HERO & PRIMARY FORM - Above the fold */}
      <section className={styles.hero} style={{ minHeight: '85vh', alignContent: 'center', background: '#0a0a0a', borderBottom: '8px solid var(--accent-primary)' }}>
        <Image 
          src="https://images.unsplash.com/photo-1541888062831-29177a644265?auto=format&fit=crop&q=80&w=2000" 
          alt="Heavy machinery excavation" 
          fill
          priority
          className={styles.heroBg}
          sizes="100vw"
          style={{ opacity: 0.15, filter: 'grayscale(100%)', objectFit: 'cover' }}
        />
        <div className="container" style={{ position: 'relative', zIndex: 2, paddingTop: '6rem', paddingBottom: '4rem' }}>
          
          <div className={styles.grid2} style={{ alignItems: 'flex-start' }}>
            
            {/* Left Col: Direct Headers & Trust */}
            <div className="fade-in">
              <h1 className={styles.heroTitle} style={{ fontSize: 'clamp(3rem, 5vw, 4.5rem)' }}>
                Get Your Pool Removal Estimate in Mesa
              </h1>
              <p className={styles.heroDesc} style={{ fontSize: '1.25rem', marginBottom: '2rem' }}>
                Fast quotes. No pressure. Know your price before you commit to anything.
              </p>
              
              <ul className={styles.trustBullets} style={{ marginBottom: '3rem' }}>
                <li>Licensed & insured in Arizona</li>
                <li>Maricopa County permit handling directly from us</li>
                <li>Compaction-ready backfills for safe future buildings</li>
                <li>3–5 day average completion timeframe</li>
              </ul>

              {/* 5. PHONE CTA */}
              <div style={{ background: 'rgba(255,255,255,0.05)', padding: '2rem', borderLeft: '4px solid var(--accent-primary)' }}>
                <h3 style={{ color: '#fff', fontSize: '1.25rem', marginBottom: '0.5rem' }}>Prefer to Talk?</h3>
                <p style={{ color: 'var(--text-inverse-muted)', marginBottom: '1rem' }}>Call now to speak directly with an East Valley pool demolition specialist.</p>
                <a href="tel:4805550000" style={{ color: 'var(--accent-primary)', fontSize: '2rem', fontWeight: 900, fontFamily: 'var(--font-heading)' }}>📞 (480) 555-XXXX</a>
              </div>
            </div>

            {/* Right Col: The Core Form */}
            <div className={`${styles.calculatorBox} fade-in`} style={{ animationDelay: '0.2s', borderTop: 'none', border: '2px solid var(--accent-primary)' }}>
              
              {/* MICRO TRUST STRIP */}
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '1rem' }}>
                <span>🔒 No spam. No obligation.</span>
                <span>⚡ Response within 24 hours</span>
              </div>

              {step === 1 && (
                <div style={{ animation: 'slideUp 0.3s ease-out forwards' }}>
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', fontFamily: 'var(--font-heading)' }}>Step 1: Project Info</h3>
                  
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Pool Type</label>
                    <select className={styles.formSelect} value={formState.poolType} onChange={e => setFormState({...formState, poolType: e.target.value})}>
                      <option>Concrete</option>
                      <option>Fiberglass</option>
                      <option>Vinyl</option>
                    </select>
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Estimated Size</label>
                    <select className={styles.formSelect} value={formState.size} onChange={e => setFormState({...formState, size: e.target.value})}>
                      <option>Small</option><option>Medium</option><option>Large</option>
                    </select>
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Access (Excavator Path)</label>
                    <select className={styles.formSelect} value={formState.access} onChange={e => setFormState({...formState, access: e.target.value})}>
                      <option>Easy</option><option>Limited</option><option>Tight alley</option>
                    </select>
                  </div>
                  
                  <button onClick={calculateEstimate} className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
                    Calculate Range Now →
                  </button>
                </div>
              )}

              {step === 2 && estimate && (
                <div style={{ animation: 'slideUp 0.3s ease-out forwards' }}>
                  <div style={{ background: 'var(--bg-dark)', padding: '1.5rem', marginBottom: '2rem', textAlign: 'center', borderRadius: '4px', borderTop: '4px solid var(--accent-secondary)' }}>
                    <div style={{ color: 'var(--text-inverse-muted)', fontSize: '0.85rem', textTransform: 'uppercase', fontWeight: 700, marginBottom: '0.5rem' }}>Estimated Range in Mesa:</div>
                    <div style={{ color: 'var(--accent-primary)', fontSize: '2.5rem', fontWeight: 900, fontFamily: 'var(--font-heading)' }}>
                      ${estimate.min.toLocaleString()} – ${estimate.max.toLocaleString()}
                    </div>
                  </div>

                  <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', fontFamily: 'var(--font-heading)' }}>Enter details to receive exact quote + timeline:</h3>
                  
                  <form onSubmit={handleFinalSubmit}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))', gap: '1rem' }}>
                      <div className={styles.formGroup}>
                        <label className={styles.formLabel}>ZIP Code</label>
                        <input type="text" className={styles.formInput} placeholder="8520_" required value={formState.zipCode} onChange={e => setFormState({...formState, zipCode: e.target.value})} />
                      </div>
                      <div className={styles.formGroup}>
                        <label className={styles.formLabel}>City</label>
                        <input type="text" className={styles.formInput} value={formState.city} readOnly style={{ background: '#e5e7eb', color: '#6b7280' }} />
                      </div>
                    </div>

                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Name</label>
                      <input type="text" className={styles.formInput} required value={formState.name} onChange={e => setFormState({...formState, name: e.target.value})} />
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Phone Number</label>
                      <input type="tel" className={styles.formInput} required value={formState.phone} onChange={e => setFormState({...formState, phone: e.target.value})} />
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Email (Optional)</label>
                      <input type="email" className={styles.formInput} value={formState.email} onChange={e => setFormState({...formState, email: e.target.value})} />
                    </div>

                    <button type="submit" disabled={isSubmitting} className="btn btn-dark" style={{ width: '100%', marginTop: '1rem', opacity: isSubmitting ? 0.7 : 1 }}>
                      {isSubmitting ? 'Locking...' : 'Lock This Estimate'}
                    </button>
                    <button type="button" onClick={() => setStep(1)} style={{ width: '100%', padding: '1rem', background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', textDecoration: 'underline', marginTop: '0.5rem' }}>
                      ← Back to recalculate
                    </button>
                    
                    {debugError && (
                      <div style={{ background: '#fef2f2', color: '#b91c1c', border: '1px solid #ef4444', padding: '1rem', marginTop: '1.5rem', fontSize: '0.8rem', textAlign: 'left' }}>
                        <strong style={{ display: 'block', fontSize: '1rem', marginBottom: '0.5rem' }}>Supabase Debugger Output:</strong>
                        <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'monospace' }}>
                          {JSON.stringify(debugError, null, 2)}
                        </pre>
                      </div>
                    )}
                  </form>
                </div>
              )}

            </div>
          </div>
        </div>
      </section>

      {/* 7. PROCESS EXPECTATION */}
      <section className={styles.section} style={{ background: 'var(--bg-light)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div className={styles.sectionHeader} style={{ margin: '0 auto 4rem auto' }}>
            <span className={styles.sectionLabel}>Next steps</span>
            <h2 className={styles.sectionTitle}>What Happens After You Submit?</h2>
            <p className={styles.sectionDesc}>Removing uncertainty from the first click.</p>
          </div>

          <div className={styles.grid2} style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            <div style={{ background: '#fff', border: '1px solid var(--border-light)', padding: '2rem' }}>
              <div style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--accent-secondary)' }}>1</div>
              <h4 style={{ fontSize: '1.25rem', marginTop: '1rem' }}>We Review Your Project</h4>
            </div>
            <div style={{ background: '#fff', border: '1px solid var(--border-light)', padding: '2rem' }}>
              <div style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--accent-secondary)' }}>2</div>
              <h4 style={{ fontSize: '1.25rem', marginTop: '1rem' }}>Confirm Estimate Range</h4>
            </div>
            <div style={{ background: '#fff', border: '1px solid var(--border-light)', padding: '2rem' }}>
              <div style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--accent-secondary)' }}>3</div>
              <h4 style={{ fontSize: '1.25rem', marginTop: '1rem' }}>Schedule Inspection</h4>
            </div>
            <div style={{ background: '#fff', border: '1px solid var(--border-light)', padding: '2rem' }}>
              <div style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--accent-secondary)' }}>4</div>
              <h4 style={{ fontSize: '1.25rem', marginTop: '1rem' }}>Lock the Timeline</h4>
            </div>
          </div>
        </div>
      </section>

      {/* 8. FAQ (OBJECTION HANDLING) */}
      <section className={styles.section} style={{ background: 'var(--bg-dark)', color: '#fff' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <h2 className={styles.sectionTitle} style={{ textAlign: 'center', marginBottom: '4rem', color: '#fff' }}>Common Concerns Handled</h2>
          
          <div style={{ borderBottom: '1px solid #374151', paddingBottom: '2rem', marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--accent-primary)' }}>Do I need to commit after submitting?</h3>
            <p style={{ color: 'var(--text-inverse-muted)' }}>Absolutely not. Submitting simply allows us to verify your provided pool dimensions and access routes to give you a definitive price. You are under zero obligation.</p>
          </div>

          <div style={{ borderBottom: '1px solid #374151', paddingBottom: '2rem', marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--accent-primary)' }}>How accurate is the estimate?</h3>
            <p style={{ color: 'var(--text-inverse-muted)' }}>Highly accurate. Because we constantly handle caliche soil and tight Mesa access points, our algorithm calculates the heavy machinery and haul-off volume costs reliably. We only finalize the quote after a visual verification.</p>
          </div>

          <div style={{ borderBottom: '1px solid #374151', paddingBottom: '2rem', marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--accent-primary)' }}>Do you handle permits in Mesa?</h3>
            <p style={{ color: 'var(--text-inverse-muted)' }}>Yes. We process all Maricopa County demolition permits, HOA documentation, and schedule the mandatory municipal inspections internally.</p>
          </div>

          <div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--accent-primary)' }}>Can I finance the project?</h3>
            <p style={{ color: 'var(--text-inverse-muted)' }}>Yes, through strategic lending partners. Let us know during the finalized quote and we'll walk you through standard home improvement financing options.</p>
          </div>
        </div>
      </section>

      {/* 6. SERVICE AREA REASSURANCE */}
      <section className={styles.section} style={{ background: '#fff', textAlign: 'center', padding: '4rem 0' }}>
         <div className="container">
           <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', textTransform: 'uppercase' }}>Serving Mesa & Surrounding Areas</h2>
           <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Deeply integrated into East Valley subdivisions including:</p>
           <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
             <span style={{ padding: '0.5rem 1rem', background: 'var(--bg-light)', border: '1px solid var(--border-light)', borderRadius: '2px', fontWeight: 700 }}>Eastmark</span>
             <span style={{ padding: '0.5rem 1rem', background: 'var(--bg-light)', border: '1px solid var(--border-light)', borderRadius: '2px', fontWeight: 700 }}>Las Sendas</span>
             <span style={{ padding: '0.5rem 1rem', background: 'var(--bg-light)', border: '1px solid var(--border-light)', borderRadius: '2px', fontWeight: 700 }}>Dobson Ranch</span>
             <span style={{ padding: '0.5rem 1rem', background: 'var(--bg-light)', border: '1px solid var(--border-light)', borderRadius: '2px', fontWeight: 700 }}>Red Mountain Ranch</span>
           </div>
         </div>
      </section>

      {/* 9. FINAL CTA */}
      <section className={styles.section} style={{ background: 'var(--bg-light)', textAlign: 'center', paddingBottom: '8rem' }}>
        <div className="container">
          <h2 className={styles.sectionTitle}>Get Your Estimate Today</h2>
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="btn btn-primary" style={{ padding: '1.5rem 4rem', fontSize: '1.5rem', marginTop: '1.5rem' }}>
            See My Pool Removal Cost
          </button>
        </div>
      </section>

    </main>
  );
}
