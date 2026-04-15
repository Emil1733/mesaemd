"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../../page.module.css';
import { supabase } from '../../../lib/supabase';

export default function LasSendasClient() {
  const [formState, setFormState] = useState({
    poolType: 'Concrete',
    size: 'Medium',
    access: 'Standard',
    name: '',
    phone: '',
  });
  const [step, setStep] = useState(1);
  const [estimate, setEstimate] = useState<{ min: number; max: number } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    let min = 0;
    let max = 0;

    // Base Las Sendas pricing — hard rock standard, higher than flat Mesa
    if (formState.poolType === 'Concrete') { min = 18000; max = 24000; }
    else if (formState.poolType === 'Fiberglass') { min = 13000; max = 17000; }
    else { min = 9000; max = 13000; }

    if (formState.size === 'Small') { min -= 2000; max -= 2500; }
    else if (formState.size === 'Large') { min += 4000; max += 6000; }

    // Las Sendas-specific terrain surcharge
    if (formState.access === 'Steep Grade') { min += 2500; max += 4000; }
    else if (formState.access === 'Very Steep + Narrow') { min += 4500; max += 7000; }

    setEstimate({ min, max });
    setStep(2);
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.phone || !formState.name) return;
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from('emd_leads_atlanta').insert([{
        pool_type: formState.poolType,
        pool_size: formState.size,
        full_name: formState.name,
        phone: formState.phone,
        estimated_price_range: estimate ? `$${estimate.min.toLocaleString()} – $${estimate.max.toLocaleString()}` : 'N/A',
        source_page: 'Mesa EMD - Las Sendas Neighborhood Page',
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

      {/* HERO + CALCULATOR */}
      <section className={styles.hero} style={{ minHeight: '70vh', background: '#0a0a0a' }}>
        <Image
          src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=2000"
          alt="Mountain-side excavation in Las Sendas Mesa Arizona"
          fill
          priority
          className={styles.heroBg}
          style={{ opacity: 0.25, objectFit: 'cover' }}
        />
        <div className="container" style={{ position: 'relative', zIndex: 2, paddingTop: '2rem', paddingBottom: '4rem' }}>
          <div className={styles.heroGrid}>

            {/* LEFT: H1 + Trust */}
            <div className="fade-in">
              <div style={{ display: 'inline-block', background: 'var(--accent-primary)', color: '#000', padding: '0.4rem 1rem', fontWeight: 900, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.5rem' }}>
                Las Sendas · Mesa, AZ 85212
              </div>
              <h1 className={styles.heroTitle} style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '1.5rem' }}>
                Las Sendas Pool Removal{' '}
                <span style={{ color: 'var(--accent-primary)' }}>| HOA-Compliant & Mountain Terrain Specialists</span>{' '}
                — Mesa, AZ
              </h1>
              <p className={styles.heroDesc} style={{ fontSize: '1.15rem', maxWidth: '600px' }}>
                Yes — but it requires mountain-grade compact equipment, direct HOA liaison coordination, and hydraulic hard-rock breaking. We do all three.
              </p>
              <ul className={styles.trustBullets} style={{ marginTop: '2rem' }}>
                <li>LSCA pre-approval paperwork handled by us</li>
                <li>3.5-ton compact excavators for steep-grade access</li>
                <li>Hydraulic breakers for Las Sendas caliche bedrock</li>
                <li>Desert landscape restoration to HOA standards</li>
              </ul>
            </div>

            {/* RIGHT: CALCULATOR */}
            <div id="calculator" className={`${styles.calculatorBox} fade-in`} style={{ animationDelay: '0.2s' }}>
              <div className={styles.calcTitle}>Las Sendas Instant Estimate</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '1.25rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border-light)' }}>
                ⚠️ Includes hard rock & HOA surcharges
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
                    <label className={styles.formLabel}>Pool Size</label>
                    <select className={styles.formSelect} value={formState.size} onChange={e => setFormState({ ...formState, size: e.target.value })}>
                      <option>Small</option>
                      <option>Medium</option>
                      <option>Large</option>
                    </select>
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Backyard Terrain</label>
                    <select className={styles.formSelect} value={formState.access} onChange={e => setFormState({ ...formState, access: e.target.value })}>
                      <option value="Standard">Standard / Flat</option>
                      <option value="Steep Grade">Steep Grade (15–30°)</option>
                      <option value="Very Steep + Narrow">Very Steep + Narrow Gate</option>
                    </select>
                  </div>
                  <button type="submit" className="btn btn-dark" style={{ width: '100%', marginTop: '0.5rem' }}>
                    Calculate Las Sendas Cost
                  </button>
                </form>
              )}

              {step === 2 && estimate && (
                <div style={{ animation: 'slideUp 0.3s ease-out forwards' }}>
                  <div style={{ fontWeight: 900, textTransform: 'uppercase', marginBottom: '0.5rem', color: '#9ca3af', fontSize: '0.85rem' }}>
                    Las Sendas Estimated Range:
                  </div>
                  <div className={styles.calcRange}>
                    ${estimate.min.toLocaleString()} – ${estimate.max.toLocaleString()}
                  </div>
                  <div className={styles.calcMicrocopy} style={{ marginBottom: '1.5rem' }}>
                    Includes hard rock breaking + HOA compliance overhead
                  </div>

                  {submitSuccess ? (
                    <div style={{ background: '#059669', color: '#fff', padding: '1.5rem', textAlign: 'center', borderRadius: '4px' }}>
                      <div style={{ fontSize: '1.1rem', fontWeight: 900, marginBottom: '0.5rem' }}>Estimate Locked ✓</div>
                      <div style={{ opacity: 0.9, fontSize: '0.9rem' }}>A Las Sendas project manager will contact you to verify terrain details.</div>
                    </div>
                  ) : (
                    <form onSubmit={handleLeadSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <input type="text" placeholder="Your Name" className={styles.formInput} value={formState.name} onChange={e => setFormState({ ...formState, name: e.target.value })} required />
                      <input type="tel" placeholder="Phone Number" className={styles.formInput} value={formState.phone} onChange={e => setFormState({ ...formState, phone: e.target.value })} required />
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

      {/* WHY LAS SENDAS IS DIFFERENT */}
      <section className={styles.section} style={{ background: '#fff' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'start' }}>
            <div>
              <span className={styles.sectionLabel}>The Real Problem</span>
              <h2 className={styles.sectionTitle} style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
                Why Standard Pool Removal Companies Refuse Las Sendas Jobs
              </h2>
              <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.8, marginTop: '1.5rem' }}>
                Las Sendas sits on the Usery Mountain foothills — one of the hardest excavation terrains in the East Valley. Most contractors take one look at the steep grade, the decomposed granite and hard caliche bedrock, and either walk away or quote numbers so high they feel dishonest.
              </p>
              <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.8, marginTop: '1rem' }}>
                The second problem is the <strong>Las Sendas Community Association (LSCA)</strong>. They enforce one of the most rigorous construction management protocols in Mesa — pre-approved excavation windows, mandatory site restoration, and strict equipment noise ordinances. A contractor who hasn&apos;t worked in Las Sendas before will generate violations.
              </p>
            </div>
            <div style={{ display: 'grid', gap: '1.5rem' }}>
              {[
                { title: 'Hard Caliche Bedrock', desc: 'Las Sendas properties sit on grade-3 hardpan caliche. Hydraulic breakers are required — standard excavators will stall.' },
                { title: 'Steep Slope Access', desc: 'Many backyards slope 15–30 degrees. We use compact 3.5-ton excavators that fit through narrow side-yard gates without rolling.' },
                { title: 'LSCA Noise Ordinance', desc: 'The HOA enforces a strict 7am–5pm construction window with zero deviation. We schedule all heavy equipment accordingly.' },
                { title: 'Site Restoration Standards', desc: 'Las Sendas requires the removal area be graded and desert-landscaped to match the community aesthetic prior to final inspection.' },
              ].map(item => (
                <div key={item.title} style={{ background: 'var(--bg-light)', padding: '1.5rem', borderLeft: '4px solid var(--accent-primary)' }}>
                  <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>{item.title}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* HOA PROCESS */}
      <section id="hoa" className={styles.section} style={{ background: 'var(--bg-dark)' }}>
        <div className="container" style={{ maxWidth: '900px' }}>
          <span className={styles.sectionLabel}>HOA Compliance</span>
          <h2 className={styles.sectionTitle} style={{ color: '#fff', marginBottom: '1rem' }}>
            Our Las Sendas Community Association Liaison Process
          </h2>
          <p style={{ color: 'var(--text-inverse-muted)', fontSize: '1.1rem', marginBottom: '3rem', lineHeight: 1.8 }}>
            We have done this before. We submit our insurance certificates, equipment list, and project timeline directly to the LSCA on your behalf before a single shovel hits the ground.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
            {[
              { step: '01', title: 'HOA Pre-Approval Package', desc: 'We submit contractor license, liability insurance ($2M), and a site restoration plan to LSCA before scheduling.' },
              { step: '02', title: 'Scheduled Construction Window', desc: 'All work is scheduled within the 7am–5pm Mon–Fri LSCA window. No weekend disruptions.' },
              { step: '03', title: 'Site Containment', desc: 'Debris containment tarps and wheel wash stations prevent rock and granite spillage on HOA streets.' },
              { step: '04', title: 'Final Grade & Restoration', desc: 'We finish to HOA desert-landscape grade standards. The inspection passes because we\'ve done this dozens of times.' },
            ].map(item => (
              <div key={item.step} style={{ borderTop: '4px solid var(--accent-primary)', paddingTop: '1.5rem' }}>
                <div style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--accent-primary)', lineHeight: 1, marginBottom: '0.5rem' }}>{item.step}</div>
                <h3 style={{ color: '#fff', fontSize: '1.1rem', marginBottom: '0.75rem' }}>{item.title}</h3>
                <p style={{ color: 'var(--text-inverse-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EQUIPMENT + COST */}
      <section className={styles.section} style={{ background: 'var(--bg-light)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem' }}>
            <div>
              <span className={styles.sectionLabel}>Equipment Deployed</span>
              <h2 className={styles.sectionTitle}>What We Bring to a Las Sendas Job</h2>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, marginTop: '1.5rem', marginBottom: '2rem' }}>
                Las Sendas terrain demands specialized gear. We don&apos;t send the same equipment used on a flat Dobson Ranch lot to a mountain-face property.
              </p>
              <ul style={{ listStyle: 'none', display: 'grid', gap: '1rem' }}>
                {[
                  '3.5-ton compact excavator (fits 36" side gates)',
                  'Hydraulic rock breaker for caliche bedrock',
                  '2-ton mini dump truck (navigates narrow HOA streets)',
                  'Debris containment tarps + wheel wash stations',
                  'GPS moisture sensor for backfill compaction verification',
                ].map(item => (
                  <li key={item} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', fontWeight: 700, fontSize: '0.95rem' }}>
                    <span style={{ color: 'var(--accent-primary)', flexShrink: 0 }}>■</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <span className={styles.sectionLabel}>Cost Reality</span>
              <h2 className={styles.sectionTitle}>What Pool Removal Costs in Las Sendas</h2>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, marginTop: '1.5rem', marginBottom: '2rem' }}>
                We will not quote you the same number as a flat Mesa property. The hard rock and HOA requirements add real cost.
              </p>
              <div style={{ display: 'grid', gap: '1rem' }}>
                {[
                  { label: 'Concrete Pool (Full Removal)', range: '$18,000 – $24,000' },
                  { label: 'Fiberglass Pool (Full Removal)', range: '$13,000 – $17,000' },
                  { label: 'Hard Rock Surcharge (per linear ft)', range: '$400 – $700/ft' },
                  { label: 'Steep Grade Access Surcharge', range: '$2,500 – $5,000' },
                ].map(item => (
                  <div key={item.label} style={{ background: '#fff', padding: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', border: '1px solid var(--border-light)', flexWrap: 'wrap' }}>
                    <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>{item.label}</span>
                    <span style={{ color: 'var(--accent-primary)', fontWeight: 900, fontFamily: 'var(--font-heading)', fontSize: '1.1rem', whiteSpace: 'nowrap' }}>{item.range}</span>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'var(--bg-dark)', color: 'var(--text-inverse-muted)', fontSize: '0.85rem', borderLeft: '4px solid var(--accent-secondary)' }}>
                Pricing based on 2025–2026 Las Sendas project data. Exact quotes require a site visit.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className={styles.section} style={{ background: '#fff', borderTop: '6px solid var(--accent-primary)' }}>
        <div className="container" style={{ maxWidth: '800px', textAlign: 'center' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>⭐⭐⭐⭐⭐</div>
          <blockquote style={{ fontSize: '1.4rem', fontStyle: 'italic', lineHeight: 1.7, color: 'var(--text-main)', marginBottom: '2rem' }}>
            &ldquo;We had a 22-year-old concrete pool on a steep lot in Las Sendas. Two other contractors refused the job. These guys handled the HOA, brought in compact equipment, and finished in 5 days. The yard looks better than before.&rdquo;
          </blockquote>
          <div style={{ fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)' }}>
            — M. Reyes, Las Sendas · Mesa, AZ 85212
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className={styles.section} style={{ background: 'var(--bg-dark)', color: '#fff' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <h2 className={styles.sectionTitle} style={{ color: '#fff', marginBottom: '3rem', textAlign: 'center' }}>
            Las Sendas Pool Removal: Answered
          </h2>
          <div style={{ display: 'grid', gap: '2rem' }}>
            {[
              { q: 'Does my HOA need to pre-approve pool removal in Las Sendas?', a: 'Yes. The Las Sendas Community Association requires contractor pre-registration, insurance proof, and an approved construction schedule before work begins. We handle this paperwork submission for you.' },
              { q: 'How do you get equipment into a steep backyard?', a: 'We use compact 3.5-ton excavators specifically because they fit through standard 36" side-yard gates and maintain stability on gradients up to 30 degrees. We never bring full-size equipment to a Las Sendas mountain-grade lot.' },
              { q: 'What is the hard caliche surcharge?', a: 'Las Sendas bedrock requires hydraulic breaking rather than standard digging. The hydraulic breaker tool plus the additional machine time is calculated per linear foot of pool wall. A typical 14x28 pool adds roughly $3,500–$6,000 to the base cost.' },
              { q: 'Will you restore the yard to Las Sendas HOA desert landscaping standards?', a: 'Yes. Final grade is completed to LSCA desert landscape specifications including leveling, compaction, and decomposed granite infill. We coordinate with the HOA inspector before closing the permit.' },
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
            Get a Las Sendas-Specific Pool Removal Quote
          </h2>
          <p style={{ color: 'var(--accent-secondary)', fontSize: '1.25rem', fontWeight: 700, margin: '1.5rem 0 3rem 0' }}>
            Mountain terrain. HOA compliance. Hard-rock breaking. We have done this before.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact" className="btn btn-primary" style={{ padding: '1.5rem 4rem', fontSize: '1.25rem' }}>
              Request Your Quote
            </Link>
            <a href="#calculator" className="btn btn-dark" style={{ padding: '1.5rem 4rem', fontSize: '1.25rem' }}>
              Use the Calculator ↑
            </a>
          </div>
        </div>
      </section>

    </main>
  );
}
