"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../page.module.css';
import { supabase } from '../../lib/supabase';

export default function FullVsPartialClient() {
  const [activeView, setActiveView] = useState<'partial' | 'full'>('full');
  const [formState, setFormState] = useState({
    removalType: 'Full',
    name: '',
    phone: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.phone || !formState.name) return;
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from('emd_leads_atlanta').insert([{
        pool_type: `Comparison: ${activeView.toUpperCase()}`,
        pool_size: 'N/A',
        full_name: formState.name,
        phone: formState.phone,
        source_page: `Mesa EMD - Full vs Partial Comparison Page`,
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
      <section className={styles.hero} style={{ minHeight: '60vh', background: '#0a0a0a' }}>
        <Image
          src="https://images.unsplash.com/photo-1541888062831-29177a644265?auto=format&fit=crop&q=80&w=2000"
          alt="Full vs Partial Pool Removal demonstration in Arizona"
          fill
          priority
          className={styles.heroBg}
          style={{ opacity: 0.25, objectFit: 'cover' }}
        />
        <div className="container" style={{ position: 'relative', zIndex: 2, paddingTop: '4rem', paddingBottom: '4rem' }}>
          <div style={{ maxWidth: '850px' }}>
            <div style={{ display: 'inline-block', background: 'var(--accent-primary)', color: '#000', padding: '0.4rem 1rem', fontWeight: 900, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.5rem' }}>
              Decision Guide · Arizona
            </div>
            <h1 className={styles.heroTitle} style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '1.5rem' }}>
              Full vs. Partial Pool Removal{' '}
              <span style={{ color: 'var(--accent-primary)' }}>| The Homeowner&apos;s Dilemma</span>
            </h1>
            <p className={styles.heroDesc} style={{ fontSize: '1.25rem', maxWidth: '750px' }}>
              One costs less today; the other saves your property value tomorrow. In Arizona, the choice between Partial (Abandonment) and Full removal depends on your 5-year plan for the land.
            </p>
          </div>
        </div>
      </section>

      {/* INTERACTIVE COMPARISON SECTION */}
      <section className={styles.section} style={{ background: '#fff' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '4rem', flexWrap: 'wrap' }}>
            <button 
              onClick={() => setActiveView('partial')}
              style={{ 
                padding: '1.5rem 3rem', 
                fontSize: '1.2rem', 
                fontWeight: 900, 
                background: activeView === 'partial' ? '#fde68a' : 'var(--bg-light)', 
                color: '#000',
                border: activeView === 'partial' ? '2px solid #b45309' : '2px solid transparent',
                cursor: 'pointer',
                textAlign: 'left',
                width: '100%',
                maxWidth: '400px'
              }}
            >
              <div style={{ fontSize: '0.8rem', opacity: 0.7, marginBottom: '0.5rem' }}>OPTION 01:</div>
              PARTIAL REMOVAL
              <div style={{ fontSize: '0.9rem', fontWeight: 500, marginTop: '0.5rem' }}>Lower cost, strict limitations.</div>
            </button>
            <button 
              onClick={() => setActiveView('full')}
              style={{ 
                padding: '1.5rem 3rem', 
                fontSize: '1.2rem', 
                fontWeight: 900, 
                background: activeView === 'full' ? 'var(--accent-primary)' : 'var(--bg-light)', 
                color: activeView === 'full' ? '#fff' : 'var(--text-main)',
                border: activeView === 'full' ? '2px solid var(--bg-dark)' : '2px solid transparent',
                cursor: 'pointer',
                textAlign: 'left',
                width: '100%',
                maxWidth: '400px'
              }}
            >
              <div style={{ fontSize: '0.8rem', opacity: activeView === 'full' ? 0.7 : 0.5, marginBottom: '0.5rem' }}>OPTION 02:</div>
              FULL REMOVAL
              <div style={{ fontSize: '0.9rem', fontWeight: 500, marginTop: '0.5rem' }}>Buildable land, maximum value.</div>
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem', alignItems: 'start' }}>
            {/* DYNAMIC CONTENT */}
            <div className="fade-in" key={activeView}>
              <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>
                {activeView === 'partial' ? 'The "Abandonment" Method' : 'The "Ground-Up" Method'}
              </h2>
              <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '2rem' }}>
                {activeView === 'partial' 
                  ? 'Commonly known as "Fill-in," we punch holes in the bottom of the pool shell for drainage, remove the top 18-24 inches of the concrete, and fill the cavity with engineered dirt. This is the fastest, cheapest path to a flat yard.'
                  : 'We dismantle the entire pool shell—concrete, rebar, plumbing, and all. Every ounce of debris is hauled off-site. The resulting hole is then filled with clean, engineered soil and compacted in strict lifts to meet foundation standards.'
                }
              </p>
              
              <div style={{ display: 'grid', gap: '1rem' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 900 }}>Key Characteristics:</h3>
                {(activeView === 'partial' 
                  ? [
                      { label: 'Cost', value: '$7,500 – $14,000', icon: '💰' },
                      { label: 'Time', value: '2–3 Days', icon: '⏱️' },
                      { label: 'Future Use', value: 'Landscaping / Turf ONLY', icon: '🚫' },
                      { label: 'Resale', value: 'Must be disclosed to buyers', icon: '📝' }
                    ]
                  : [
                      { label: 'Cost', value: '$13,000 – $26,000', icon: '💰' },
                      { label: 'Time', value: '4–6 Days', icon: '⏱️' },
                      { label: 'Future Use', value: 'Fully Buildable (Structures/Patios)', icon: '🏗️' },
                      { label: 'Resale', value: 'No disclosure liability (restored land)', icon: '🏠' }
                    ]
                ).map(item => (
                  <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: 'var(--bg-light)', borderLeft: '4px solid var(--accent-primary)' }}>
                    <span style={{ fontWeight: 700 }}>{item.icon} {item.label}</span>
                    <span style={{ fontWeight: 900 }}>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* SELECTION ASSISTANCE FORM */}
            <div className={styles.calculatorBox}>
              <div className={styles.calcTitle}>Which Choice is Right for You?</div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                Tell us your plans for the yard, and our Arizona field team will provide a data-backed recommendation.
              </p>
              
              {submitSuccess ? (
                <div style={{ background: '#059669', color: '#fff', padding: '2rem', textAlign: 'center' }}>
                  <h3 style={{ marginBottom: '0.5rem' }}>Expert Advice Sent ✓</h3>
                  <p style={{ fontSize: '0.9rem', opacity: 0.9 }}>We will contact you to discuss your property layout.</p>
                </div>
              ) : (
                <form onSubmit={handleLeadSubmit} style={{ display: 'grid', gap: '1rem' }}>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Current Preference</label>
                    <select className={styles.formSelect} value={activeView.charAt(0).toUpperCase() + activeView.slice(1)} disabled>
                      <option>Partial / Abandonment</option>
                      <option>Full Removal</option>
                    </select>
                  </div>
                  <input type="text" placeholder="Your Name" className={styles.formInput} required value={formState.name} onChange={e => setFormState({ ...formState, name: e.target.value })} />
                  <input type="tel" placeholder="Phone Number" className={styles.formInput} required value={formState.phone} onChange={e => setFormState({ ...formState, phone: e.target.value })} />
                  <button type="submit" className="btn btn-dark" style={{ width: '100%', padding: '1rem' }}>
                    Request {activeView === 'partial' ? 'Partial' : 'Full'} Consultation
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* REALITY CHECK: THE DISCLOSURE TRAP */}
      <section className={styles.section} style={{ background: 'var(--bg-dark)', color: '#fff' }}>
        <div className="container" style={{ maxWidth: '900px' }}>
          <div style={{ border: '2px dashed var(--accent-primary)', padding: '3rem', textAlign: 'center' }}>
            <h2 style={{ color: 'var(--accent-primary)', fontSize: '2rem', marginBottom: '1.5rem' }}>The &ldquo;Disclosure Trap&rdquo; in Arizona Real Estate</h2>
            <p style={{ fontSize: '1.2rem', lineHeight: 1.8, marginBottom: '2rem' }}>
              Nearly every city in Arizona (Mesa, Gilbert, Chandler, etc.) requires you to flag a &ldquo;Partial Abandonment&rdquo; on your property deed. When you go to sell your home, the buyer sees that a pool shell is still buried in the backyard. 
              <br /><br />
              <strong>For many buyers, this is a deal-breaker.</strong> They cannot build a guest house, a heavy patio, or even a large pergola over that area safely. If you plan to sell your home in the next 10 years, the extra $5,000 for a <strong>Full Removal</strong> almost always pays for itself in higher resale value.
            </p>
            <Link href="/blog/mesa-pool-removal-guide-2026" style={{ color: 'var(--accent-primary)', fontWeight: 900, textDecoration: 'underline' }}>
              Read more on property value impact in our guide →
            </Link>
          </div>
        </div>
      </section>

      {/* HEAD-TO-HEAD TABLE */}
      <section className={styles.section} style={{ background: '#fff' }}>
        <div className="container">
          <h2 className={styles.sectionTitle} style={{ textAlign: 'center', marginBottom: '3rem' }}>Arizona Head-to-Head Comparison</h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '700px' }}>
              <thead>
                <tr style={{ textAlign: 'left', borderBottom: '3px solid var(--bg-dark)' }}>
                  <th style={{ padding: '1.5rem' }}>Metric</th>
                  <th style={{ padding: '1.5rem', background: '#fffbeb' }}>Partial (Abandonment)</th>
                  <th style={{ padding: '1.5rem', background: '#f0fdf4' }}>Full Removal</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { m: 'Typical Mesa Cost', p: '$7,500 – $12,000', f: '$14,000 – $24,000' },
                  { m: 'Time to Complete', p: '2 Days', f: '4–5 Days' },
                  { m: 'Buildable Area', p: '❌ 0% (Planting Only)', f: '✅ 100% (Any Structure)' },
                  { m: 'Compaction Required', p: '85% (Landscape standard)', f: '95% (Foundation standard)' },
                  { m: 'Future Resale Risk', p: '🔴 High (Buried liability)', f: '🟢 Zero (Restored land)' },
                  { m: 'Heavy Equipment Needed', p: 'Standard Excavator', f: 'Excavator + Hydraulic Breaker' },
                ].map((row, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid var(--border-light)' }}>
                    <td style={{ padding: '1.25rem', fontWeight: 700 }}>{row.m}</td>
                    <td style={{ padding: '1.25rem', background: '#fffbeb' }}>{row.p}</td>
                    <td style={{ padding: '1.25rem', background: '#f0fdf4', fontWeight: 700 }}>{row.f}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className={`${styles.section} bg-hazard`} style={{ textAlign: 'center', padding: '6rem 0' }}>
        <div className="container">
          <h2 className={styles.sectionTitle} style={{ color: '#fff', fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
            Make the Right Choice for Your Backyard.
          </h2>
          <p style={{ color: 'var(--accent-primary)', fontSize: '1.5rem', fontWeight: 900, marginBottom: '3rem' }}>
            Get an honest quote for both options today.
          </p>
          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact" className="btn btn-primary" style={{ padding: '1.5rem 4rem', fontSize: '1.5rem' }}>
              Request Your Free Comparison Quote
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
