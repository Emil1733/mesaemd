"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../../page.module.css';
import { supabase } from '../../../lib/supabase';

export default function EastmarkClient() {
  const [formState, setFormState] = useState({
    poolType: 'Concrete',
    size: 'Medium',
    goal: 'Custom Patio / Outdoor Kitchen',
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

    // Eastmark base pricing — newer pools, flat clay terrain
    if (formState.poolType === 'Concrete') { min = 13000; max = 18000; }
    else if (formState.poolType === 'Fiberglass') { min = 9000; max = 13000; }
    else { min = 7000; max = 10500; }

    if (formState.size === 'Small') { min -= 1500; max -= 2000; }
    else if (formState.size === 'Large') { min += 3500; max += 5500; }

    // Goal-based compaction note
    if (formState.goal === 'Custom Patio / Outdoor Kitchen') {
      min += 500; max += 1000;
      note = '🏗️ Foundation-grade compaction (95%+) required for future patio slab or structure. We include this by default.';
    } else if (formState.goal === 'Larger Custom Pool') {
      note = '🏊 Compaction to 90% standard. The old shell footprint is fully excavated to allow your new pool contractor a clean, pre-graded dig zone.';
    } else {
      note = '🌿 Standard 90% compaction — suitable for turf, desert landscaping, or play yard use.';
    }

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
        pool_size: formState.size,
        full_name: formState.name,
        phone: formState.phone,
        estimated_price_range: estimate ? `$${estimate.min.toLocaleString()} – $${estimate.max.toLocaleString()} | Goal: ${formState.goal}` : 'N/A',
        source_page: 'Mesa EMD - Eastmark Neighborhood Page',
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
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=2000"
          alt="Modern backyard transformation after pool removal in Eastmark Mesa Arizona"
          fill
          priority
          className={styles.heroBg}
          style={{ opacity: 0.22, objectFit: 'cover' }}
        />
        <div className="container" style={{ position: 'relative', zIndex: 2, paddingTop: '2rem', paddingBottom: '4rem' }}>
          <div className={styles.heroGrid}>

            {/* LEFT: H1 + Trust */}
            <div className="fade-in">
              <div style={{ display: 'inline-block', background: 'var(--accent-primary)', color: '#000', padding: '0.4rem 1rem', fontWeight: 900, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.5rem' }}>
                Eastmark · Mesa, AZ 85212
              </div>
              <h1 className={styles.heroTitle} style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '1.5rem' }}>
                Eastmark Pool Removal{' '}
                <span style={{ color: 'var(--accent-primary)' }}>| Remove Your Builder Pool</span>{' '}
                & Build the Backyard You Actually Want
              </h1>
              <p className={styles.heroDesc} style={{ fontSize: '1.15rem', maxWidth: '600px' }}>
                Eastmark builder pools are typically small, poorly positioned, and designed for resale — not for your lifestyle. We remove them cleanly and compact the ground to whatever standard your next project requires.
              </p>
              <ul className={styles.trustBullets} style={{ marginTop: '2rem' }}>
                <li>Eastmark HOA notification and documentation handled by us</li>
                <li>Clay soil compaction to 95% for future patio or structure builds</li>
                <li>Pre-graded finish for new custom pool contractors</li>
                <li>3–4 day average completion — won&apos;t disrupt your neighborhood</li>
              </ul>
            </div>

            {/* RIGHT: CALCULATOR */}
            <div id="calculator" className={`${styles.calculatorBox} fade-in`} style={{ animationDelay: '0.2s' }}>
              <div className={styles.calcTitle}>Eastmark Removal Estimator</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '1.25rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border-light)' }}>
                🎯 Includes your next project&apos;s compaction spec
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
                    <label className={styles.formLabel}>What Are You Building Next?</label>
                    <select className={styles.formSelect} value={formState.goal} onChange={e => setFormState({ ...formState, goal: e.target.value })}>
                      <option>Custom Patio / Outdoor Kitchen</option>
                      <option>Larger Custom Pool</option>
                      <option>Turf / Landscaping / Play Area</option>
                    </select>
                  </div>
                  <button type="submit" className="btn btn-dark" style={{ width: '100%', marginTop: '0.5rem' }}>
                    Calculate My Eastmark Cost
                  </button>
                </form>
              )}

              {step === 2 && estimate && (
                <div style={{ animation: 'slideUp 0.3s ease-out forwards' }}>
                  <div style={{ background: 'var(--bg-dark)', padding: '1.25rem', marginBottom: '1rem', borderTop: '4px solid var(--accent-secondary)' }}>
                    <div style={{ color: '#9ca3af', fontSize: '0.8rem', textTransform: 'uppercase', fontWeight: 700, marginBottom: '0.4rem' }}>Estimated Removal Cost:</div>
                    <div className={styles.calcRange} style={{ fontSize: '2.5rem' }}>
                      ${estimate.min.toLocaleString()} – ${estimate.max.toLocaleString()}
                    </div>
                  </div>
                  <div style={{ background: '#f0fdf4', border: '1px solid #86efac', padding: '1rem', marginBottom: '1.5rem', fontSize: '0.9rem', fontWeight: 700, lineHeight: 1.6 }}>
                    {estimate.note}
                  </div>

                  {submitSuccess ? (
                    <div style={{ background: '#059669', color: '#fff', padding: '1.5rem', textAlign: 'center', borderRadius: '4px' }}>
                      <div style={{ fontSize: '1.1rem', fontWeight: 900, marginBottom: '0.5rem' }}>Estimate Locked ✓</div>
                      <div style={{ opacity: 0.9, fontSize: '0.9rem' }}>An Eastmark project specialist will reach out shortly.</div>
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

      {/* CORE ANSWER: WHY EASTMARK HOMEOWNERS REMOVE BUILDER POOLS */}
      <section className={styles.section} style={{ background: '#fff' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem', alignItems: 'start' }}>
            <div>
              <span className={styles.sectionLabel}>The Core Problem</span>
              <h2 className={styles.sectionTitle}>Why Eastmark Builder Pools Get Removed</h2>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, marginTop: '1.5rem' }}>
                Eastmark was developed from 2014 onward as one of Mesa&apos;s flagship master-planned communities. The builder pools installed in this era were designed to increase the sale price of the home — not to match what families actually want in their outdoor space.
              </p>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, marginTop: '1rem' }}>
                The most common complaints we hear from Eastmark homeowners: <strong>the pool is too small, it&apos;s in the wrong position relative to the patio, or it takes up the entire yard</strong> leaving no room for the outdoor kitchen, turf, or fire pit they actually planned to have.
              </p>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, marginTop: '1rem' }}>
                The solution is a complete pool removal with 95% compaction backfill — giving the next contractor (whether that&apos;s a patio installer, landscape architect, or custom pool company) a perfectly flat, structurally sound foundation to build on.
              </p>
            </div>

            <div style={{ display: 'grid', gap: '1.5rem' }}>
              <h3 style={{ fontSize: '1.5rem' }}>The 4 Most Common Eastmark Removal Reasons:</h3>
              {[
                { num: '01', title: 'Pool is Too Small for the Family', desc: 'Builder pools in Eastmark are typically 12x24 ft. Growing families quickly outgrow them. Removal and rebuild with a custom 16x32 is a popular upgrade path.' },
                { num: '02', title: 'Pool Blocks the Yard Layout', desc: 'Many Eastmark lots placed the pool dead-center, eliminating space for the outdoor living area the homeowner actually wants.' },
                { num: '03', title: 'Switching to a Zero-Maintenance Yard', desc: 'Desert landscaping and synthetic turf have surged in Eastmark. Removing a pool reduces chemical, water, and service costs by $3,000–$5,000 per year.' },
                { num: '04', title: 'Ready to Build a True Custom Pool', desc: 'Removing the builder pool and starting fresh with a custom shape, infinity edge, or negative-edge design is becoming increasingly popular in Eastmark.' },
              ].map(item => (
                <div key={item.num} style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '1rem', alignItems: 'start', padding: '1.25rem', background: 'var(--bg-light)', borderLeft: '4px solid var(--accent-primary)' }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--accent-primary)', fontFamily: 'var(--font-heading)', lineHeight: 1 }}>{item.num}</div>
                  <div>
                    <div style={{ fontWeight: 900, marginBottom: '0.3rem' }}>{item.title}</div>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CLAY SOIL + COMPACTION TECHNICAL SECTION */}
      <section className={styles.section} style={{ background: 'var(--bg-dark)' }}>
        <div className="container" style={{ maxWidth: '900px' }}>
          <span className={styles.sectionLabel}>Technical Requirement</span>
          <h2 className={styles.sectionTitle} style={{ color: '#fff', marginBottom: '1rem' }}>
            Eastmark Clay Soil: Why Compaction Spec Matters for Your Next Project
          </h2>
          <p style={{ color: 'var(--text-inverse-muted)', fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '3rem' }}>
            Unlike the caliche bedrock in North Mesa, Eastmark sits on expansive clay soil. Clay expands when wet and contracts when dry, which means a pool removal backfill with improper compaction will settle unevenly — cracking a future patio slab or shifting your landscaping within 2–3 years. We engineer the backfill to match your future build spec.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
            {[
              { title: 'Building a Patio / Structure', spec: '95% Proctor Density', desc: 'Required by Maricopa County for any structure placed over a former pool footprint. We provide the compaction report.' },
              { title: 'Installing a Custom Pool', spec: '90% Proctor Density', desc: 'The excavated zone is pre-graded and compacted to give your pool contractor a clean dig zone without rework.' },
              { title: 'Landscape / Turf / Play Area', spec: '85–90% Density', desc: 'Standard compaction suitable for non-structural surface use — turf, decomposed granite, or children\'s play areas.' },
            ].map(item => (
              <div key={item.title} style={{ background: 'rgba(255,255,255,0.05)', padding: '2rem', borderTop: '4px solid var(--accent-secondary)' }}>
                <div style={{ color: '#fff', fontWeight: 900, fontSize: '1.1rem', marginBottom: '0.5rem' }}>{item.title}</div>
                <div style={{ color: 'var(--accent-primary)', fontWeight: 900, fontSize: '1.4rem', fontFamily: 'var(--font-heading)', marginBottom: '0.75rem' }}>{item.spec}</div>
                <p style={{ color: 'var(--text-inverse-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOA SECTION */}
      <section className={styles.section} style={{ background: 'var(--bg-light)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', alignItems: 'center' }}>
            <div>
              <span className={styles.sectionLabel}>HOA Process</span>
              <h2 className={styles.sectionTitle}>Eastmark HOA: What You Need to Know</h2>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, marginTop: '1.5rem' }}>
                The <strong>Eastmark Community Association</strong> requires contractor registration and a project notification submission — but does not typically require a full pre-approval review like more restrictive HOAs. We submit the required notification package on your behalf, including our insurance certificates and project timeline.
              </p>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, marginTop: '1rem' }}>
                Key Eastmark HOA rules for pool removal: equipment noise prohibited before 7am and after 6pm, no street parking for equipment vehicles, and a mandatory site inspection before final landscape restoration. We know these rules and schedule accordingly.
              </p>
            </div>
            <div style={{ display: 'grid', gap: '1rem' }}>
              {[
                { icon: '📋', label: 'Contractor Registration', detail: 'Filed by us before project start' },
                { icon: '📬', label: 'HOA Notification Package', detail: 'Submitted with insurance + timeline' },
                { icon: '⏰', label: 'Work Hours', detail: '7am–6pm Mon–Sat only' },
                { icon: '🚧', label: 'Street Equipment Parking', detail: 'Not permitted — we stage on-site' },
                { icon: '✅', label: 'Final Site Inspection', detail: 'Coordinated by us before permit close' },
              ].map(item => (
                <div key={item.label} style={{ display: 'flex', gap: '1rem', alignItems: 'center', padding: '1rem', background: '#fff', border: '1px solid var(--border-light)' }}>
                  <div style={{ fontSize: '1.5rem', flexShrink: 0 }}>{item.icon}</div>
                  <div>
                    <div style={{ fontWeight: 900, fontSize: '0.95rem' }}>{item.label}</div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{item.detail}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className={styles.section} style={{ background: '#fff', borderTop: '6px solid var(--accent-primary)' }}>
        <div className="container" style={{ maxWidth: '800px', textAlign: 'center' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>⭐⭐⭐⭐⭐</div>
          <blockquote style={{ fontSize: '1.35rem', fontStyle: 'italic', lineHeight: 1.7, color: 'var(--text-main)', marginBottom: '2rem' }}>
            &ldquo;We paid the builder extra for the pool option and immediately regretted it — it took up our entire yard and was always too small for our kids. Pool removal was the best decision we made. Our outdoor kitchen and turf area is exactly what we pictured when we bought the house.&rdquo;
          </blockquote>
          <div style={{ fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)' }}>
            — K. and J. Morrison, Eastmark · Mesa, AZ 85212
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className={styles.section} style={{ background: 'var(--bg-dark)', color: '#fff' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <h2 className={styles.sectionTitle} style={{ color: '#fff', marginBottom: '3rem', textAlign: 'center' }}>
            Eastmark Pool Removal: Your Questions Answered
          </h2>
          <div style={{ display: 'grid', gap: '2rem' }}>
            {[
              {
                q: 'Can I remove the builder pool and install a custom pool in the same spot?',
                a: 'Yes. We remove the existing shell, haul debris, and compact the former footprint to 90% Proctor density — the standard new pool contractors require before excavating a new shell. We can coordinate timing so your new pool contractor begins within 1–2 weeks of our completion.'
              },
              {
                q: 'Will the Eastmark HOA require me to replace the pool area with something specific?',
                a: 'The Eastmark Community Association requires that the former pool area be finished with HOA-compliant landscaping materials. Approved options include decomposed granite, native desert plantings, synthetic turf, or a concrete slab. We provide the final grading and you choose the surface treatment.'
              },
              {
                q: 'How does Eastmark clay soil affect the backfill process?',
                a: 'Eastmark\'s expansive clay requires moisture-controlled backfill layered in 8-inch lifts with mechanical compaction at each layer. We use a GPS moisture sensor to verify compaction density at each lift before adding the next layer. This is what prevents future settling and surface cracking.'
              },
              {
                q: 'How long does pool removal take in Eastmark?',
                a: 'Most Eastmark pool removals take 3–4 days. The flat terrain and newer neighborhood infrastructure (wide streets, accessible side yards) makes Eastmark one of our faster-paced job sites compared to terrain-challenged areas like Las Sendas.'
              },
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
            Ready to Get the Backyard You Planned For?
          </h2>
          <p style={{ color: 'var(--accent-secondary)', fontSize: '1.25rem', fontWeight: 700, margin: '1.5rem 0 3rem 0' }}>
            Eastmark pool removal with HOA compliance, clay soil engineering, and a clean finish for your next project.
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
