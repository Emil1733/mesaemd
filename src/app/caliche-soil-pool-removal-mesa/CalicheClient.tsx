"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../page.module.css';
import { supabase } from '../../lib/supabase';

export default function CalicheClient() {
  const [grade, setGrade] = useState('Grade 2 — Moderate');
  const [poolSize, setPoolSize] = useState('Medium');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [step, setStep] = useState(1);
  const [result, setResult] = useState<{ surcharge: string; total: string; days: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    let surchargeMin = 0;
    let surchargeMax = 0;
    let baseCost = poolSize === 'Small' ? 10000 : poolSize === 'Medium' ? 14000 : 19000;
    let baseCostMax = poolSize === 'Small' ? 13000 : poolSize === 'Medium' ? 18000 : 24000;
    let extraDays = '';

    if (grade === 'Grade 1 — Soft Caliche') {
      surchargeMin = 1500; surchargeMax = 3000; extraDays = '+0–1 day';
    } else if (grade === 'Grade 2 — Moderate') {
      surchargeMin = 3000; surchargeMax = 5500; extraDays = '+1 day';
    } else {
      surchargeMin = 5500; surchargeMax = 8500; extraDays = '+2 days';
    }

    setResult({
      surcharge: `$${surchargeMin.toLocaleString()} – $${surchargeMax.toLocaleString()}`,
      total: `$${(baseCost + surchargeMin).toLocaleString()} – $${(baseCostMax + surchargeMax).toLocaleString()}`,
      days: extraDays,
    });
    setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from('emd_leads_atlanta').insert([{
        pool_type: 'Unknown — Caliche Assessment',
        pool_size: poolSize,
        full_name: name,
        phone: phone,
        estimated_price_range: result?.total ?? 'N/A',
        source_page: `Mesa EMD - Caliche Soil Page | Grade: ${grade}`,
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

      {/* HERO */}
      <section className={styles.hero} style={{ minHeight: '65vh', background: '#0a0a0a' }}>
        <Image
          src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=2000"
          alt="Hydraulic rock breaker excavating through caliche bedrock in Mesa Arizona"
          fill
          priority
          className={styles.heroBg}
          style={{ opacity: 0.25, objectFit: 'cover' }}
        />
        <div className="container" style={{ position: 'relative', zIndex: 2, paddingTop: '2rem', paddingBottom: '4rem' }}>
          <div className={styles.heroGrid}>

            {/* LEFT */}
            <div className="fade-in">
              <div style={{ display: 'inline-block', background: 'var(--accent-secondary)', color: '#000', padding: '0.4rem 1rem', fontWeight: 900, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.5rem' }}>
                Mesa, AZ · Soil Engineering
              </div>
              <h1 className={styles.heroTitle} style={{ fontSize: 'clamp(2.5rem, 5vw, 3.75rem)', marginBottom: '1.5rem' }}>
                Caliche Soil Pool Removal Mesa AZ{' '}
                <span style={{ color: 'var(--accent-primary)' }}>| How Much Does It Add to Your Cost?</span>
              </h1>
              <p className={styles.heroDesc} style={{ fontSize: '1.15rem', maxWidth: '600px' }}>
                Caliche bedrock is present across most of Mesa and adds $3,500–$8,500 to pool removal costs. Use our grade-based calculator to see your exact surcharge before committing to anything.
              </p>
              <ul className={styles.trustBullets} style={{ marginTop: '2rem' }}>
                <li>Hydraulic breakers deployed for Grade 2+ caliche</li>
                <li>Free caliche grade assessment with every site visit</li>
                <li>Surcharge calculated per linear foot — not estimated blindly</li>
                <li>Serving Las Sendas, Red Mountain Ranch & all North Mesa</li>
              </ul>
            </div>

            {/* RIGHT: CALCULATOR */}
            <div id="calculator" className={`${styles.calculatorBox} fade-in`} style={{ animationDelay: '0.2s' }}>
              <div className={styles.calcTitle}>Caliche Surcharge Calculator</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '1.25rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border-light)' }}>
                🪨 Select your neighborhood&apos;s likely caliche grade
              </div>

              {step === 1 && (
                <form onSubmit={handleCalculate}>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Caliche Grade</label>
                    <select className={styles.formSelect} value={grade} onChange={e => setGrade(e.target.value)}>
                      <option>Grade 1 — Soft Caliche</option>
                      <option>Grade 2 — Moderate</option>
                      <option>Grade 3 — Hardpan (Las Sendas / Red Mtn)</option>
                    </select>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>
                      Not sure? Pick Grade 2 — we verify on-site at no cost.
                    </div>
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Pool Size</label>
                    <select className={styles.formSelect} value={poolSize} onChange={e => setPoolSize(e.target.value)}>
                      <option>Small</option>
                      <option>Medium</option>
                      <option>Large</option>
                    </select>
                  </div>
                  <button type="submit" className="btn btn-dark" style={{ width: '100%', marginTop: '0.5rem' }}>
                    Calculate My Caliche Surcharge
                  </button>
                </form>
              )}

              {step === 2 && result && (
                <div style={{ animation: 'slideUp 0.3s ease-out forwards' }}>
                  <div style={{ display: 'grid', gap: '0.75rem', marginBottom: '1.5rem' }}>
                    <div style={{ background: '#fef3c7', border: '1px solid var(--accent-secondary)', padding: '1rem' }}>
                      <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 900, color: '#92400e', marginBottom: '0.25rem' }}>Caliche Surcharge:</div>
                      <div style={{ fontSize: '1.75rem', fontWeight: 900, color: '#92400e', fontFamily: 'var(--font-heading)' }}>{result.surcharge}</div>
                    </div>
                    <div style={{ background: 'var(--bg-dark)', padding: '1rem' }}>
                      <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 900, color: '#9ca3af', marginBottom: '0.25rem' }}>Total Estimated Range:</div>
                      <div className={styles.calcRange} style={{ fontSize: '2rem' }}>{result.total}</div>
                    </div>
                    <div style={{ background: 'var(--bg-light)', padding: '0.75rem', display: 'flex', gap: '0.5rem', alignItems: 'center', fontWeight: 700, fontSize: '0.9rem', borderLeft: '4px solid var(--accent-primary)' }}>
                      ⏱ Timeline Impact: <span style={{ color: 'var(--accent-primary)' }}>{result.days}</span>
                    </div>
                  </div>

                  {submitSuccess ? (
                    <div style={{ background: '#059669', color: '#fff', padding: '1.5rem', textAlign: 'center' }}>
                      <div style={{ fontWeight: 900, marginBottom: '0.25rem' }}>Estimate Locked ✓</div>
                      <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>We will confirm caliche grade during your free on-site assessment.</div>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <input type="text" placeholder="Your Name" className={styles.formInput} value={name} onChange={e => setName(e.target.value)} required />
                      <input type="tel" placeholder="Phone Number" className={styles.formInput} value={phone} onChange={e => setPhone(e.target.value)} required />
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

      {/* WHAT IS CALICHE — ENTITY DEFINITION */}
      <section className={styles.section} style={{ background: '#fff' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem', alignItems: 'start' }}>
            <div>
              <span className={styles.sectionLabel}>Soil Science</span>
              <h2 className={styles.sectionTitle}>What Is Caliche and Why Does It Exist Under Mesa Properties?</h2>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, marginTop: '1.5rem' }}>
                Caliche (pronounced <em>ka-LEE-chee</em>) is a naturally occurring layer of soil sediment cemented together by calcium carbonate. Over thousands of years, rainwater percolates downward through the desert soil and deposits calcium minerals at a consistent depth — typically <strong>2 to 6 feet below grade</strong> in the Mesa, AZ region.
              </p>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, marginTop: '1rem' }}>
                The result is a layer that can range from soft, chalky material (easily broken by a standard excavator) to an almost concrete-hard plate that requires a hydraulic rock breaker to penetrate. The difference between these grades determines whether your pool removal costs $13,000 or $22,000.
              </p>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, marginTop: '1rem' }}>
                The original pool builders in Mesa worked around caliche during construction — but they left the untouched caliche walls intact beneath the pool shell. When you remove the pool, <strong>our excavators must break through those walls to achieve the proper depth and slope for engineered backfill</strong>.
              </p>
            </div>

            {/* GRADE BREAKDOWN */}
            <div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Mesa Caliche Grades: What Each One Means</h3>
              <div style={{ display: 'grid', gap: '1.25rem' }}>
                {[
                  {
                    grade: 'Grade 1',
                    label: 'Soft / Powdery',
                    color: '#fef9c3',
                    border: '#eab308',
                    desc: 'Breaks apart with standard excavator bucket. Common in central and west Mesa. Adds 0–1 days and $1,500–$3,000 to removal cost.',
                    areas: 'Central Mesa, Dobson Ranch, West Mesa',
                  },
                  {
                    grade: 'Grade 2',
                    label: 'Moderate / Cemented',
                    color: '#ffedd5',
                    border: '#f97316',
                    desc: 'Requires hydraulic hammer for efficient removal. Most common grade across the East Valley. Adds 1 day and $3,000–$5,500 to removal cost.',
                    areas: 'Eastmark, Chandler Borders, Gilbert',
                  },
                  {
                    grade: 'Grade 3',
                    label: 'Hardpan / Petro-caliche',
                    color: '#fee2e2',
                    border: '#ef4444',
                    desc: 'Near-concrete density. Only hydraulic rock breakers can penetrate. Requires slower work and additional haul-off loads. Adds 1–2 days and $5,500–$8,500+.',
                    areas: 'Las Sendas, Red Mountain Ranch, North Mesa',
                  },
                ].map(item => (
                  <div key={item.grade} style={{ background: item.color, borderLeft: `6px solid ${item.border}`, padding: '1.25rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                      <span style={{ fontWeight: 900, fontSize: '1.1rem' }}>{item.grade} — {item.label}</span>
                    </div>
                    <p style={{ fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '0.5rem' }}>{item.desc}</p>
                    <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#6b7280' }}>Typical areas: {item.areas}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EQUIPMENT SECTION */}
      <section className={styles.section} style={{ background: 'var(--bg-dark)' }}>
        <div className="container" style={{ maxWidth: '900px' }}>
          <span className={styles.sectionLabel}>Equipment & Process</span>
          <h2 className={styles.sectionTitle} style={{ color: '#fff', marginBottom: '1rem' }}>
            How We Break Through Caliche During Pool Removal
          </h2>
          <p style={{ color: 'var(--text-inverse-muted)', fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '3rem' }}>
            Most contractors rent a hydraulic hammer for the day and hope for the best. We own our own breaker attachments and size them to the specific caliche grade on-site. This removes scheduling uncertainty and cuts the breaking time in half on Grade 3 jobs.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2rem' }}>
            {[
              { icon: '⛏️', title: 'Hydraulic Rock Breaker', desc: 'Our primary tool for Grade 2–3 caliche. 3,000–4,000 ft-lb impact force. Can penetrate 6" of hardpan per strike cycle.' },
              { icon: '🚛', title: 'Additional Haul-Off', desc: 'Broken caliche is denser than pool shell concrete. Grade 3 jobs typically require 1–2 additional dump truck loads per average-size pool.' },
              { icon: '💧', title: 'Moisture-Controlled Backfill', desc: 'We use broken caliche as backfill aggregate, layered in 8" lifts with moisture and mechanical compaction — maximizing what\'s already on-site.' },
              { icon: '📊', title: 'Compaction Verification', desc: 'A GPS moisture-density gauge confirms each layer reaches required Proctor density before the next lift is added, resulting in zero future settling.' },
            ].map(item => (
              <div key={item.title} style={{ background: 'rgba(255,255,255,0.05)', padding: '1.5rem', borderTop: '4px solid var(--accent-primary)' }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{item.icon}</div>
                <h3 style={{ color: '#fff', fontSize: '1rem', marginBottom: '0.5rem' }}>{item.title}</h3>
                <p style={{ color: 'var(--text-inverse-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INTERNAL LINKING — NEIGHBORHOOD CONTEXT */}
      <section className={styles.section} style={{ background: 'var(--bg-light)' }}>
        <div className="container">
          <h2 className={styles.sectionTitle} style={{ textAlign: 'center', marginBottom: '1rem' }}>Caliche Impact by Mesa Neighborhood</h2>
          <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '3rem', maxWidth: '700px', margin: '0 auto 3rem auto' }}>
            Each Mesa community has a distinct caliche profile. Here is what you can expect and what it means for your project budget.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {[
              { name: 'Las Sendas', grade: 'Grade 3 Hardpan', impact: '+$5,500–$8,500', href: '/mesa/las-sendas-pool-removal', note: 'Usery Mountain foothills — hardest caliche in Mesa. Hydraulic breakers required on every job.' },
              { name: 'Dobson Ranch', grade: 'Grade 1–2', impact: '+$1,500–$4,000', href: '/mesa/dobson-ranch-pool-removal', note: 'Flat central Mesa terrain — softer caliche. Standard excavator handles most of the work.' },
              { name: 'Eastmark', grade: 'Grade 2', impact: '+$3,000–$5,000', href: '/mesa/eastmark-pool-removal', note: 'East Mesa clay and caliche mix. Moderate hardness — hydraulic hammer used as backup.' },
            ].map(item => (
              <div key={item.name} style={{ background: '#fff', border: '1px solid var(--border-light)', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <h3 style={{ fontSize: '1.5rem' }}>{item.name}</h3>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <span style={{ background: 'var(--bg-dark)', color: '#fff', padding: '0.3rem 0.75rem', fontWeight: 700, fontSize: '0.8rem' }}>{item.grade}</span>
                  <span style={{ background: 'var(--accent-primary)', color: '#fff', padding: '0.3rem 0.75rem', fontWeight: 900, fontSize: '0.8rem' }}>{item.impact}</span>
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>{item.note}</p>
                <Link href={item.href} style={{ color: 'var(--accent-primary)', fontWeight: 900, fontSize: '0.9rem', textDecoration: 'underline' }}>
                  View {item.name} Pool Removal Guide →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ — SCHEMA MATCHED */}
      <section className={styles.section} style={{ background: 'var(--bg-dark)', color: '#fff' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <h2 className={styles.sectionTitle} style={{ color: '#fff', marginBottom: '0.5rem', textAlign: 'center' }}>
            Caliche & Pool Removal FAQ
          </h2>
          <p style={{ textAlign: 'center', color: 'var(--text-inverse-muted)', marginBottom: '3rem' }}>
            These answers match our structured FAQ schema — eligible for Google rich snippet display.
          </p>
          <div style={{ display: 'grid', gap: '2rem' }}>
            {[
              { q: 'What is caliche soil and why does it matter for pool removal in Mesa?', a: 'Caliche is a hardened layer of calcium carbonate that occurs naturally in desert soils across Arizona. In Mesa, it typically sits 2–6 feet below the surface. Standard excavator buckets cannot break through grade-3 caliche — hydraulic rock breakers are required, adding cost and time to pool removal projects.' },
              { q: 'How much does caliche add to pool removal cost in Mesa?', a: 'Caliche soil surcharges in Mesa typically range from $3,500 to $8,500 depending on the caliche grade and pool perimeter. Grade-1 caliche (soft) adds $1,500–$3,000. Grade-3 caliche (hardpan) adds $5,500–$8,500+. Areas like Las Sendas and Red Mountain Ranch consistently encounter grade-3 hardpan.' },
              { q: 'Which Mesa neighborhoods have the worst caliche?', a: 'The highest-grade caliche in Mesa is found in neighborhoods built on or near mountain foothills: Las Sendas (Usery Mountain), Red Mountain Ranch, and Alta Mesa. Central Mesa and Dobson Ranch typically encounter softer grade-1 or grade-2 caliche that requires less specialized equipment.' },
              { q: 'Does caliche affect the backfill compaction after pool removal?', a: 'Yes. Caliche is non-expansive, which actually helps with backfill stability. However, broken caliche chunks must be properly compacted in lifts — loose caliche backfill will settle unevenly. We use moisture-controlled compaction in 8-inch layers to ensure 95% Proctor density, regardless of what was excavated.' },
              { q: 'How do I know if my Mesa property has caliche?', a: 'The fastest indicator is your neighborhood. If you are in Las Sendas, Red Mountain Ranch, or any property abutting the Usery or Superstition mountain ranges, assume grade-2 to grade-3 caliche. For central and west Mesa, a site assessment with a hand probe will confirm caliche depth and grade before we finalize your quote.' },
            ].map(item => (
              <div key={item.q} style={{ borderBottom: '1px solid var(--border-dark)', paddingBottom: '1.5rem' }}>
                <h3 style={{ color: 'var(--accent-primary)', fontSize: '1.05rem', marginBottom: '0.75rem' }}>{item.q}</h3>
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
            Get a Caliche-Honest Pool Removal Quote
          </h2>
          <p style={{ color: 'var(--accent-secondary)', fontSize: '1.25rem', fontWeight: 700, margin: '1.5rem 0 3rem 0' }}>
            We assess your caliche grade on-site at no charge. Your quote will include the exact surcharge — no surprises.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact" className="btn btn-primary" style={{ padding: '1.5rem 4rem', fontSize: '1.25rem' }}>
              Get Your Quote
            </Link>
            <a href="#calculator" className="btn btn-dark" style={{ padding: '1.5rem 4rem', fontSize: '1.25rem' }}>
              Use Calculator ↑
            </a>
          </div>
        </div>
      </section>

    </main>
  );
}
