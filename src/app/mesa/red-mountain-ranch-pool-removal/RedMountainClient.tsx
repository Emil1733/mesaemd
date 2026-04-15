"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../../page.module.css';
import { supabase } from '../../../lib/supabase';

export default function RedMountainClient() {
  const [formState, setFormState] = useState({
    poolType: 'Concrete',
    terrain: 'Moderate Slope',
    access: 'Standard Gate',
    name: '',
    phone: '',
  });
  const [step, setStep] = useState(1);
  const [estimate, setEstimate] = useState<{ min: number; max: number; note: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    let min = 0;
    let max = 0;
    let note = '';

    // Red Mountain base pricing — very high hard rock risk
    if (formState.poolType === 'Concrete') { min = 17500; max = 23500; }
    else if (formState.poolType === 'Fiberglass') { min = 12500; max = 16500; }
    else { min = 8500; max = 12500; }

    // Terrain modifier
    if (formState.terrain === 'High Slope / Canyonside') { min += 3500; max += 6000; note = '🏔️ Sloped terrain requires anchored equipment and safety spotters.'; }
    else { min += 1000; max += 2000; note = '🌵 Standard desert grade — steady caliche breaking required.'; }

    setEstimate({ min, max, note });
    setStep(2);
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.phone || !formState.name) return;
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from('emd_leads_atlanta').insert([{
        pool_type: formState.poolType,
        pool_size: formState.terrain,
        full_name: formState.name,
        phone: formState.phone,
        estimated_price_range: estimate ? `$${estimate.min.toLocaleString()} – $${estimate.max.toLocaleString()}` : 'N/A',
        source_page: 'Mesa EMD - Red Mountain Ranch Neighborhood Page',
      }]);
      if (error) throw error;
      setSubmitSuccess(true);
    } catch (err) {
      console.error(err);
      alert('Problem submitting. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className={styles.main}>

      {/* HERO SECTION */}
      <section className={styles.hero} style={{ minHeight: '65vh', background: '#0a0a0a' }}>
        <Image
          src="https://images.unsplash.com/photo-1449034446853-66c86144b0ad?auto=format&fit=crop&q=80&w=2000"
          alt="High-altitude desert backyard in Red Mountain Ranch Mesa"
          fill
          priority
          className={styles.heroBg}
          style={{ opacity: 0.25, objectFit: 'cover' }}
        />
        <div className="container" style={{ position: 'relative', zIndex: 2, paddingTop: '2rem', paddingBottom: '4rem' }}>
          <div className={styles.heroGrid}>

            {/* LEFT */}
            <div className="fade-in">
              <div style={{ display: 'inline-block', background: 'var(--accent-primary)', color: '#000', padding: '0.4rem 1rem', fontWeight: 900, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.5rem' }}>
                Red Mountain · Mesa, AZ 85215
              </div>
              <h1 className={styles.heroTitle} style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '1.5rem' }}>
                Red Mountain Ranch Pool Removal{' '}
                <span style={{ color: 'var(--accent-primary)' }}>| Sloped Access & HOA Specialists</span>{' '}
                — Mesa, AZ
              </h1>
              <p className={styles.heroDesc} style={{ fontSize: '1.15rem', maxWidth: '600px' }}>
                High-elevation pool removal in Red Mountain Ranch means dealing with sloped desert lots and grade-3 caliche. We handle the technical excavation and the HOA documentation simultaneously.
              </p>
              <ul className={styles.trustBullets} style={{ marginTop: '2rem' }}>
                <li>Specialized slope-stable compact machinery</li>
                <li>RMR Social Club & HOA liaison service included</li>
                <li>95% compaction for mountain-side drainage integrity</li>
                <li>Hydraulic breakers for North Mesa hardpan soil</li>
              </ul>
            </div>

            {/* RIGHT: CALCULATOR */}
            <div id="calculator" className={`${styles.calculatorBox} fade-in`} style={{ animationDelay: '0.2s' }}>
              <div className={styles.calcTitle}>Red Mountain Cost Estimator</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '1.25rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border-light)' }}>
                ⛰️ Built for sloped desert terrain
              </div>

              {step === 1 && (
                <form onSubmit={handleCalculate}>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Pool Type</label>
                    <select className={styles.formSelect} value={formState.poolType} onChange={e => setFormState({ ...formState, poolType: e.target.value })}>
                      <option>Concrete</option>
                      <option>Fiberglass</option>
                      <option>Vinyl</option>
                    </select>
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Lot Elevation / Slope</label>
                    <select className={styles.formSelect} value={formState.terrain} onChange={e => setFormState({ ...formState, terrain: e.target.value })}>
                      <option>Moderate Slope</option>
                      <option>High Slope / Canyonside</option>
                      <option>Flat (Rare for RMR)</option>
                    </select>
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Side-Yard Access</label>
                    <select className={styles.formSelect} value={formState.access} onChange={e => setFormState({ ...formState, access: e.target.value })}>
                      <option>Standard Gate (8ft+)</option>
                      <option>Narrow Area (36-48in)</option>
                      <option>Street-to-Yard Elevation Gap</option>
                    </select>
                  </div>
                  <button type="submit" className="btn btn-dark" style={{ width: '100%', marginTop: '0.5rem' }}>
                    Calculate Red Mountain Quote
                  </button>
                </form>
              )}

              {step === 2 && estimate && (
                <div style={{ animation: 'slideUp 0.3s ease-out forwards' }}>
                  <div style={{ background: 'var(--bg-dark)', padding: '1.25rem', marginBottom: '1rem', borderTop: '4px solid var(--accent-secondary)' }}>
                    <div style={{ color: '#9ca3af', fontSize: '0.8rem', textTransform: 'uppercase', fontWeight: 700, marginBottom: '0.4rem' }}>Estimated Range:</div>
                    <div className={styles.calcRange} style={{ fontSize: '2.5rem' }}>
                      ${estimate.min.toLocaleString()} – ${estimate.max.toLocaleString()}
                    </div>
                  </div>
                  <div style={{ background: '#fffbeb', border: '1px solid var(--accent-secondary)', padding: '1rem', marginBottom: '1.5rem', fontSize: '0.9rem', fontWeight: 700, lineHeight: 1.6 }}>
                    {estimate.note}
                  </div>

                  {submitSuccess ? (
                    <div style={{ background: '#059669', color: '#fff', padding: '1.5rem', textAlign: 'center', borderRadius: '4px' }}>
                      <div style={{ fontSize: '1.1rem', fontWeight: 900, marginBottom: '0.5rem' }}>Estimate Sent ✓</div>
                      <div style={{ opacity: 0.9, fontSize: '0.9rem' }}>We&apos;ll call to schedule a terrain walk-through.</div>
                    </div>
                  ) : (
                    <form onSubmit={handleLeadSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <input type="text" placeholder="Your Name" className={styles.formInput} required value={formState.name} onChange={e => setFormState({ ...formState, name: e.target.value })} />
                      <input type="tel" placeholder="Phone Number" className={styles.formInput} required value={formState.phone} onChange={e => setFormState({ ...formState, phone: e.target.value })} />
                      <button type="submit" disabled={isSubmitting} className="btn btn-primary" style={{ width: '100%', opacity: isSubmitting ? 0.7 : 1 }}>
                        {isSubmitting ? 'Locking...' : 'Lock This Estimate'}
                      </button>
                      <button type="button" onClick={() => setStep(1)} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', textDecoration: 'underline', padding: '0.5rem' }}>
                        ← Recalculate
                      </button>
                    </form>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CORE CONTENT: THE SLOPED TERRAIN CHALLENGE */}
      <section className={styles.section} style={{ background: '#fff' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem', alignItems: 'start' }}>
            <div>
              <span className={styles.sectionLabel}>Technical Engineering</span>
              <h2 className={styles.sectionTitle}>Why Red Mountain Ranch Needs Specialist Demolition</h2>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, marginTop: '1.5rem' }}>
                Red Mountain Ranch isn&apos;t just another Mesa neighborhood. Built into the foothills of the Usery Mountains, the lot geometry here presents two critical challenges: <strong>extreme elevation changes</strong> and <strong>high-grade caliche hardpan</strong>.
              </p>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, marginTop: '1rem' }}>
                Many RMR pools are &ldquo;view-tier&rdquo; pools, meaning they are built on the edge of local slopes or tiered backyards. Removing these requires compact equipment with a low center of gravity and safety-anchored operation. Standard flat-land contractors frequently roll equipment or damage mountain-side retaining walls because they lack sloped-terrain experience.
              </p>
            </div>

            <div style={{ display: 'grid', gap: '1.5rem' }}>
              <h3 style={{ fontSize: '1.5rem' }}>The RMR Authority Checklist:</h3>
              {[
                { title: 'Sloped-Stability Excavation', desc: 'We only deploy 3.5-ton wide-track excavators for RMR jobs to maintain safety on desert gradients.' },
                { title: 'Retaining Wall Preservation', desc: 'Pools in RMR are often integrated into slope retaining systems. We ensure the removal maintains structural hill integrity.' },
                { title: 'Hydraulic Breaker Deployed', desc: 'The hard rock of Red Mountain requires 3,000+ ft-lb breakers. We come prepared on day one.' },
                { title: 'Drainage Engineering', desc: 'Mountain-side backfills require 95% compaction to prevent erosion during heavy monsoon sheet-flows.' },
              ].map(item => (
                <div key={item.title} style={{ background: 'var(--bg-light)', padding: '1.5rem', borderLeft: '4px solid var(--accent-primary)' }}>
                  <div style={{ fontWeight: 900, marginBottom: '0.5rem' }}>{item.title}</div>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* HOA SECTION */}
      <section className={styles.section} style={{ background: 'var(--bg-dark)', color: '#fff' }}>
        <div className="container" style={{ maxWidth: '900px' }}>
          <span className={styles.sectionLabel}>HOA Management</span>
          <h2 className={styles.sectionTitle} style={{ color: '#fff', marginBottom: '1.5rem' }}>Red Mountain Ranch Social Club & HOA Compliance</h2>
          <p style={{ color: 'var(--text-inverse-muted)', fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '3rem' }}>
            The <strong>Red Mountain Ranch Community Association</strong> maintains strict aesthetic standards. They require that any pool removal area be restored to desert-landscaped grade to prevent scarring of the mountain view. We manage the notification, insurance filings, and site restoration to ensure you remain in 100% compliance.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
            <div style={{ border: '1px solid rgba(255,255,255,0.1)', padding: '2rem' }}>
              <div style={{ color: 'var(--accent-primary)', fontWeight: 900, marginBottom: '0.5rem' }}>Noise Ordinance</div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-inverse-muted)' }}>Heavy breaking restricted to 7am–5pm. We schedule high-decibel work during mid-day to minimize neighborhood impact.</p>
            </div>
            <div style={{ border: '1px solid rgba(255,255,255,0.1)', padding: '2rem' }}>
              <div style={{ color: 'var(--accent-primary)', fontWeight: 900, marginBottom: '0.5rem' }}>Debris Protocol</div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-inverse-muted)' }}>Street staging is prohibited. All concrete debris is loaded directly onto specialized 2-ton mountain trucks for immediate haul-off.</p>
            </div>
          </div>
        </div>
      </section>

      {/* COST TABLE */}
      <section className={styles.section} style={{ background: '#fff' }}>
        <div className="container">
          <h2 className={styles.sectionTitle} style={{ textAlign: 'center', marginBottom: '3rem' }}>Red Mountain Cost Realities</h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
              <thead>
                <tr style={{ textAlign: 'left', borderBottom: '3px solid var(--bg-dark)' }}>
                  <th style={{ padding: '1rem' }}>Surcharge Factor</th>
                  <th style={{ padding: '1rem' }}>Impact on Price</th>
                  <th style={{ padding: '1rem' }}>Why it Happens</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { f: 'Grade 3 Caliche', p: '+$5,500 – $8,000', w: 'Bedrock density near the Usery foothills.' },
                  { f: 'Sloped Access', p: '+$3,000 – $5,500', w: 'Anchored machine operation and safety spotters.' },
                  { f: 'Narrow Side-Yard', p: '+$1,500 – $2,500', w: 'Requires slower 36-inch micro-machinery.' },
                  { f: 'HOA Staging', p: '+$1,000 – $1,500', w: 'Mandatory direct-loading (no street piling).' },
                ].map((row, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid var(--border-light)' }}>
                    <td style={{ padding: '1.25rem', fontWeight: 700 }}>{row.f}</td>
                    <td style={{ padding: '1.25rem', color: 'var(--accent-primary)', fontWeight: 900 }}>{row.p}</td>
                    <td style={{ padding: '1.25rem', color: 'var(--text-muted)' }}>{row.w}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className={styles.section} style={{ background: 'var(--bg-dark)', color: '#fff' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <h2 className={styles.sectionTitle} style={{ color: '#fff', textAlign: 'center', marginBottom: '3rem' }}>Red Mountain Ranch FAQ</h2>
          <div style={{ display: 'grid', gap: '2rem' }}>
            {[
              { q: 'Will pool removal affect my mountain-side retaining walls?', a: 'Only if done by an inexperienced crew. We assess the proximity of the shell to any high-load retaining systems and use vibrational-isolated breaking techniques to preserve the wall\'s structural integrity.' },
              { q: 'Can we build an outdoor view-deck over the old pool footprint?', a: 'Yes — provided you choose a Full Removal. We compact RMR backfills to 95% Proctor density, allowing you to build heavy view-decks, fire pits, or gazebos without fear of mountain-side settling.' },
              { q: 'How do you handle the hard rock in Red Mountain?', a: 'RMR sits on volcanic and sedimentary hardpan. We use specialized 4,000 ft-lb hydraulic rock breakers. We don\'t "try to dig it"—we shatter it systematically.' },
            ].map(item => (
              <div key={item.q} style={{ borderBottom: '1px solid var(--border-dark)', paddingBottom: '1.5rem' }}>
                <h3 style={{ color: 'var(--accent-primary)', fontSize: '1.1rem', marginBottom: '0.75rem' }}>{item.q}</h3>
                <p style={{ color: 'var(--text-inverse-muted)', lineHeight: 1.7 }}>{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className={`${styles.section} bg-hazard`} style={{ textAlign: 'center', padding: '6rem 0' }}>
        <div className="container">
          <h2 className={styles.sectionTitle} style={{ color: '#fff', fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
            Get a Red Mountain-Specific Quote.
          </h2>
          <p style={{ color: 'var(--accent-secondary)', fontSize: '1.25rem', fontWeight: 700, margin: '1.5rem 0 3rem 0' }}>
            Sloped terrain experts. Hard rock preparation. HOA approved.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact" className="btn btn-primary" style={{ padding: '1.5rem 4rem', fontSize: '1.25rem' }}>
              Request Your Free Assessment
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
