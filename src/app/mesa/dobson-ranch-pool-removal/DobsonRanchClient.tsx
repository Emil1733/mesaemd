"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../../page.module.css';
import { supabase } from '../../../lib/supabase';

export default function DobsonRanchClient() {
  const [formState, setFormState] = useState({
    poolType: 'Concrete',
    size: 'Medium',
    poolAge: '20–35 Years',
    name: '',
    phone: '',
  });
  const [step, setStep] = useState(1);
  const [estimate, setEstimate] = useState<{ min: number; max: number; verdict: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    let min = 0;
    let max = 0;
    let verdict = '';

    // Base Dobson Ranch pricing — flat terrain, faster than Las Sendas
    if (formState.poolType === 'Concrete') { min = 12000; max = 16000; }
    else if (formState.poolType === 'Fiberglass') { min = 8500; max = 12000; }
    else { min = 6500; max = 9500; }

    if (formState.size === 'Small') { min -= 1500; max -= 2000; }
    else if (formState.size === 'Large') { min += 3000; max += 5000; }

    // Age-based verdict logic
    if (formState.poolAge === '40+ Years (Pre-1985)') {
      min += 1500; max += 2500;
      verdict = '⚠️ High Repair Risk — Removal is strongly recommended. Pre-1985 shells have aged plumbing and shell fatigue that will require continuous repair.';
    } else if (formState.poolAge === '20–35 Years') {
      verdict = '📊 Decision Point — Compare your last 3 years of repair costs. If over $4,000 total, removal likely pays off within 2 years.';
    } else {
      verdict = '✅ Repair May Still Be Viable — Pools under 20 years can often be resurfaced. We can verify during the free site assessment.';
    }

    setEstimate({ min, max, verdict });
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
        estimated_price_range: estimate ? `$${estimate.min.toLocaleString()} – $${estimate.max.toLocaleString()} | Age: ${formState.poolAge}` : 'N/A',
        source_page: 'Mesa EMD - Dobson Ranch Neighborhood Page',
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
          src="https://images.unsplash.com/photo-1541888062831-29177a644265?auto=format&fit=crop&q=80&w=2000"
          alt="Concrete pool demolition in Dobson Ranch Mesa Arizona"
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
                Dobson Ranch · Mesa, AZ 85202
              </div>
              <h1 className={styles.heroTitle} style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '1.5rem' }}>
                Dobson Ranch Pool Removal{' '}
                <span style={{ color: 'var(--accent-primary)' }}>| Is Your Aging Pool Worth Repairing</span>{' '}
                — or Remove It?
              </h1>
              <p className={styles.heroDesc} style={{ fontSize: '1.15rem', maxWidth: '600px' }}>
                Most 1970s Dobson Ranch concrete pools have already exceeded their structural lifespan. We give you the honest numbers — repair cost vs. removal cost — so you can decide with no pressure.
              </p>
              <ul className={styles.trustBullets} style={{ marginTop: '2rem' }}>
                <li>Flat terrain — faster job than Las Sendas or Red Mountain</li>
                <li>No HOA pre-approval required in most Dobson Ranch zones</li>
                <li>3–4 day average completion for standard concrete pools</li>
                <li>Maricopa County demolition permits handled by us</li>
              </ul>
            </div>

            {/* RIGHT: CALCULATOR */}
            <div id="calculator" className={`${styles.calculatorBox} fade-in`} style={{ animationDelay: '0.2s' }}>
              <div className={styles.calcTitle}>Repair vs. Remove Calculator</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '1.25rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border-light)' }}>
                🔍 Includes age-based verdict + removal cost
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
                    <label className={styles.formLabel}>Estimated Pool Size</label>
                    <select className={styles.formSelect} value={formState.size} onChange={e => setFormState({ ...formState, size: e.target.value })}>
                      <option>Small</option>
                      <option>Medium</option>
                      <option>Large</option>
                    </select>
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Pool Age (Approx.)</label>
                    <select className={styles.formSelect} value={formState.poolAge} onChange={e => setFormState({ ...formState, poolAge: e.target.value })}>
                      <option>Under 20 Years</option>
                      <option>20–35 Years</option>
                      <option>40+ Years (Pre-1985)</option>
                    </select>
                  </div>
                  <button type="submit" className="btn btn-dark" style={{ width: '100%', marginTop: '0.5rem' }}>
                    Get My Repair vs. Remove Verdict
                  </button>
                </form>
              )}

              {step === 2 && estimate && (
                <div style={{ animation: 'slideUp 0.3s ease-out forwards' }}>
                  <div style={{ background: 'var(--bg-dark)', padding: '1.25rem', marginBottom: '1rem', borderTop: '4px solid var(--accent-secondary)' }}>
                    <div style={{ color: '#9ca3af', fontSize: '0.8rem', textTransform: 'uppercase', fontWeight: 700, marginBottom: '0.4rem' }}>Removal Cost Range:</div>
                    <div className={styles.calcRange} style={{ fontSize: '2.5rem' }}>
                      ${estimate.min.toLocaleString()} – ${estimate.max.toLocaleString()}
                    </div>
                  </div>
                  <div style={{ background: '#fffbeb', border: '1px solid var(--accent-secondary)', padding: '1rem', marginBottom: '1.5rem', fontSize: '0.9rem', fontWeight: 700, lineHeight: 1.6 }}>
                    {estimate.verdict}
                  </div>

                  {submitSuccess ? (
                    <div style={{ background: '#059669', color: '#fff', padding: '1.5rem', textAlign: 'center', borderRadius: '4px' }}>
                      <div style={{ fontSize: '1.1rem', fontWeight: 900, marginBottom: '0.5rem' }}>Estimate Locked ✓</div>
                      <div style={{ opacity: 0.9, fontSize: '0.9rem' }}>A Dobson Ranch specialist will reach out to confirm the site details.</div>
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

      {/* THE CORE ANSWER — REPAIR VS REMOVE */}
      <section className={styles.section} style={{ background: '#fff' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem', alignItems: 'start' }}>
            <div>
              <span className={styles.sectionLabel}>The Honest Answer</span>
              <h2 className={styles.sectionTitle}>When Does Removing a Dobson Ranch Pool Beat Repairing It?</h2>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, marginTop: '1.5rem' }}>
                Dobson Ranch was built predominantly between 1972 and 1986. The concrete pools installed during that era used older plaster technology, thinner shell construction, and original copper plumbing that is now corroding at the joints.
              </p>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, marginTop: '1rem' }}>
                The economics tip toward removal when you hit a combination of any two of these: <strong>shell cracking, leaking at the main drain, plumbing rerouting needed, or a heater/pump replacement cost over $2,500</strong>. At that point, you are paying to extend the life of a pool that will need the same repair in 3–5 years.
              </p>
              <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'var(--bg-dark)', color: '#fff', borderLeft: '6px solid var(--accent-primary)' }}>
                <div style={{ fontWeight: 900, fontSize: '1.1rem', marginBottom: '0.5rem' }}>The 50% Rule:</div>
                <p style={{ color: 'var(--text-inverse-muted)', lineHeight: 1.6, fontSize: '0.95rem' }}>
                  If the cost of required repairs exceeds 50% of the removal cost, removal is the financially superior decision in nearly every case — especially if you plan to sell within 5 years.
                </p>
              </div>
            </div>

            {/* COMPARISON TABLE */}
            <div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Repair vs. Removal: Real Numbers</h3>
              <div style={{ display: 'grid', gap: '0' }}>
                {[
                  { item: 'Shell Resurfacing (plaster)', repair: '$8,000–$15,000', removes: 'Included in removal' },
                  { item: 'Main Drain Replacement', repair: '$3,500–$6,000', removes: 'Eliminated permanently' },
                  { item: 'Plumbing Re-route', repair: '$4,000–$8,000', removes: 'Eliminated permanently' },
                  { item: 'Heater + Pump Replacement', repair: '$3,000–$5,500', removes: 'Eliminated permanently' },
                  { item: 'Annual Maintenance (chemicals, service)', repair: '$2,400–$4,800/yr', removes: '$0 forever' },
                ].map((row, i) => (
                  <div key={row.item} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '0', borderBottom: '1px solid var(--border-light)', background: i % 2 === 0 ? '#f9fafb' : '#fff' }}>
                    <div style={{ padding: '0.75rem', fontWeight: 700, fontSize: '0.85rem' }}>{row.item}</div>
                    <div style={{ padding: '0.75rem', color: '#dc2626', fontWeight: 900, fontSize: '0.85rem', textAlign: 'center' }}>{row.repair}</div>
                    <div style={{ padding: '0.75rem', color: '#059669', fontWeight: 900, fontSize: '0.85rem', textAlign: 'center' }}>{row.removes}</div>
                  </div>
                ))}
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', background: 'var(--bg-dark)', color: '#fff' }}>
                  <div style={{ padding: '1rem', fontWeight: 900, textTransform: 'uppercase', fontSize: '0.85rem' }}>10-Year Total</div>
                  <div style={{ padding: '1rem', color: '#f87171', fontWeight: 900, textAlign: 'center' }}>$40k–$70k+</div>
                  <div style={{ padding: '1rem', color: '#34d399', fontWeight: 900, textAlign: 'center' }}>$12k–$20k</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DOBSON RANCH-SPECIFIC CONTEXT */}
      <section className={styles.section} style={{ background: 'var(--bg-dark)' }}>
        <div className="container" style={{ maxWidth: '900px' }}>
          <span className={styles.sectionLabel}>Local Knowledge</span>
          <h2 className={styles.sectionTitle} style={{ color: '#fff', marginBottom: '1rem' }}>
            What We Know About Dobson Ranch Pools Specifically
          </h2>
          <p style={{ color: 'var(--text-inverse-muted)', fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '3rem' }}>
            We have worked in Dobson Ranch extensively. The neighborhood&apos;s flat terrain and wider side-yard access means faster jobs — but the original 1970s shell construction means we always bring a hydraulic hammer backup in case the shell is unusually brittle or connected to aging clay sewer lines.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
            {[
              { num: '3–4', label: 'Days Average Completion', desc: 'Flat terrain and wide access makes Dobson Ranch one of our fastest job sites.' },
              { num: '85%', label: 'Full Removal Recommendation Rate', desc: 'Of the Dobson Ranch properties we assess, the majority qualify for full removal as the superior financial decision.' },
              { num: '$0', label: 'HOA Pre-Approval Fees', desc: 'Most Dobson Ranch HOA zones do not require pre-approval for pool removal — only notification.' },
              { num: '1', label: 'Permit Required', desc: 'A single Maricopa County demolition permit is required. We file and manage it from start to final sign-off.' },
            ].map(item => (
              <div key={item.label} style={{ borderTop: '4px solid var(--accent-secondary)', paddingTop: '1.5rem' }}>
                <div style={{ fontSize: '3.5rem', fontWeight: 900, color: 'var(--accent-primary)', lineHeight: 1, marginBottom: '0.5rem', fontFamily: 'var(--font-heading)' }}>{item.num}</div>
                <div style={{ color: '#fff', fontWeight: 900, marginBottom: '0.5rem' }}>{item.label}</div>
                <p style={{ color: 'var(--text-inverse-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className={styles.section} style={{ background: '#fff', borderTop: '6px solid var(--accent-primary)' }}>
        <div className="container" style={{ maxWidth: '800px', textAlign: 'center' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>⭐⭐⭐⭐⭐</div>
          <blockquote style={{ fontSize: '1.35rem', fontStyle: 'italic', lineHeight: 1.7, color: 'var(--text-main)', marginBottom: '2rem' }}>
            &ldquo;Our pool was from 1978 and had been leaking for two summers. We called three companies — two wanted to repair it for $12,000. These guys walked us through the numbers and showed us that removal at $14,500 made more sense. Yard is now a patio and looks incredible.&rdquo;
          </blockquote>
          <div style={{ fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)' }}>
            — T. Alvarez, Dobson Ranch · Mesa, AZ 85202
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className={styles.section} style={{ background: 'var(--bg-dark)', color: '#fff' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <h2 className={styles.sectionTitle} style={{ color: '#fff', marginBottom: '3rem', textAlign: 'center' }}>
            Dobson Ranch Pool Removal: Your Questions Answered
          </h2>
          <div style={{ display: 'grid', gap: '2rem' }}>
            {[
              {
                q: 'Does the Dobson Ranch HOA require approval before pool removal?',
                a: 'Most Dobson Ranch HOA zones only require written notification, not pre-approval. This is very different from Las Sendas or Red Mountain Ranch. We send the notification letter on your behalf as part of our standard process.'
              },
              {
                q: 'How do I know if my 1970s pool is worth repairing?',
                a: 'The key indicators are shell cracks below the waterline, leaking at the main drain fitting, and corroded copper plumbing. If two or more of these are present on a pre-1985 pool, repair costs will compound every 3–5 years. In those cases, removal is almost always the better long-term investment.'
              },
              {
                q: 'Will pool removal affect my property value in Dobson Ranch?',
                a: 'In most cases, removing an aging, high-maintenance pool in Dobson Ranch has a neutral-to-positive impact on resale value. Buyers either want a pool in excellent condition or no pool at all. A cracked, leaking pool is a liability — a compacted, level yard is an asset they can develop.'
              },
              {
                q: 'How long does a standard Dobson Ranch pool removal take?',
                a: 'The flat terrain and wider access yards in Dobson Ranch allow us to complete most projects in 3–4 days. This includes breaking, hauling debris, engineered backfill, and final compaction.'
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
            Get a Dobson Ranch Pool Removal Quote Today
          </h2>
          <p style={{ color: 'var(--accent-secondary)', fontSize: '1.25rem', fontWeight: 700, margin: '1.5rem 0 3rem 0' }}>
            Flat terrain. Fast turnaround. Honest pricing. No obligation.
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
