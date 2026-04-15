"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../page.module.css';
import { supabase } from '../../lib/supabase';

export default function FiberglassVsConcreteClient() {
  const [activeTab, setActiveTab] = useState<'fiberglass' | 'concrete'>('concrete');
  const [formState, setFormState] = useState({
    poolType: 'Concrete',
    size: 'Medium',
    name: '',
    phone: '',
  });
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

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
        source_page: `Mesa EMD - Fiberglass vs Concrete Page`,
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
          src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=2000"
          alt="Concrete and Fiberglass pool materials comparison in Mesa Arizona"
          fill
          priority
          className={styles.heroBg}
          style={{ opacity: 0.25, objectFit: 'cover' }}
        />
        <div className="container" style={{ position: 'relative', zIndex: 2, paddingTop: '4rem', paddingBottom: '4rem' }}>
          <div style={{ maxWidth: '850px' }}>
            <div style={{ display: 'inline-block', background: 'var(--accent-primary)', color: '#000', padding: '0.4rem 1rem', fontWeight: 900, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.5rem' }}>
              Material Comparison · Mesa, AZ
            </div>
            <h1 className={styles.heroTitle} style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '1.5rem' }}>
              Fiberglass vs. Concrete Pool Removal{' '}
              <span style={{ color: 'var(--accent-primary)' }}>| Cost, Speed, and Process Compared</span>
            </h1>
            <p className={styles.heroDesc} style={{ fontSize: '1.25rem', maxWidth: '700px' }}>
              Removing an Arizona pool is not one-size-fits-all. Concrete requires heavy hydraulic breaking, while fiberglass is a specialized "cut and lift" operation. Learn which one you have and what it costs to remove.
            </p>
          </div>
        </div>
      </section>

      {/* COMPARISON TABS SECTION */}
      <section className={styles.section} style={{ background: '#fff' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 className={styles.sectionTitle}>Select Your Pool Type</h2>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '2rem' }}>
              <button 
                onClick={() => setActiveTab('concrete')}
                style={{ 
                  padding: '1rem 2rem', 
                  fontSize: '1.1rem', 
                  fontWeight: 900, 
                  background: activeTab === 'concrete' ? 'var(--bg-dark)' : 'var(--bg-light)', 
                  color: activeTab === 'concrete' ? '#fff' : 'var(--text-main)',
                  border: 'none',
                  cursor: 'pointer',
                  textTransform: 'uppercase'
                }}
              >
                Concrete / Gunite
              </button>
              <button 
                onClick={() => setActiveTab('fiberglass')}
                style={{ 
                  padding: '1rem 2rem', 
                  fontSize: '1.1rem', 
                  fontWeight: 900, 
                  background: activeTab === 'fiberglass' ? 'var(--accent-primary)' : 'var(--bg-light)', 
                  color: activeTab === 'fiberglass' ? '#000' : 'var(--text-main)',
                  border: 'none',
                  cursor: 'pointer',
                  textTransform: 'uppercase'
                }}
              >
                Fiberglass Shell
              </button>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem', alignItems: 'start' }}>
            {/* CONTENT COLUMN */}
            <div>
              {activeTab === 'concrete' ? (
                <div className="fade-in">
                  <h3 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>The Concrete Challenge</h3>
                  <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '1.5rem' }}>
                    Standard in Mesa since the 1970s, concrete (Gunite) pools are permanent structural fixtures. Removal involves high-decibel hydraulic breaking to shatter a 6–10 inch thick reinforced shell.
                  </p>
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    {[
                      'Requires hydraulic hammers/breakers',
                      'Generates significant concrete debris (hauling-heavy)',
                      '40-year shells often brittle and hard to break',
                      'Best for homeowners planning new structures over the footprint'
                    ].map(item => (
                      <li key={item} style={{ padding: '0.75rem 0', borderBottom: '1px solid var(--border-light)', fontWeight: 700, display: 'flex', gap: '0.75rem' }}>
                        <span style={{ color: 'var(--accent-primary)' }}>→</span> {item}
                      </li>
                    ))}
                  </ul>
                  <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'var(--bg-light)', borderLeft: '4px solid var(--bg-dark)' }}>
                    <strong>Average Cost (Mesa):</strong> $12,000 – $22,000
                  </div>
                </div>
              ) : (
                <div className="fade-in">
                  <h3 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>The Fiberglass Process</h3>
                  <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '1.5rem' }}>
                    Fiberglass pools are drop-in shells. Removal is much "cleaner" than concrete but requires specialized cutting. We slice the shell into sections that can be craned or winched out of the yard.
                  </p>
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    {[
                      'No heavy hydraulic vibration (quieter)',
                      'Less debris weight = lower hauling costs',
                      'Shell MUST be cut to prevent backyard damage',
                      'Fastest turnaround — often 2–3 days max'
                    ].map(item => (
                      <li key={item} style={{ padding: '0.75rem 0', borderBottom: '1px solid var(--border-light)', fontWeight: 700, display: 'flex', gap: '0.75rem' }}>
                        <span style={{ color: 'var(--accent-primary)' }}>→</span> {item}
                      </li>
                    ))}
                  </ul>
                  <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'var(--bg-light)', borderLeft: '4px solid var(--accent-primary)' }}>
                    <strong>Average Cost (Mesa):</strong> $8,500 – $14,000
                  </div>
                </div>
              )}
            </div>

            {/* QUICK LEAD FORM */}
            <div className={styles.calculatorBox} style={{ boxShadow: 'var(--shadow-heavy)' }}>
              <div className={styles.calcTitle}>Get a Precise {activeTab === 'concrete' ? 'Concrete' : 'Fiberglass'} Quote</div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                We provide site-specific pricing for both materials across the East Valley.
              </p>
              
              {submitSuccess ? (
                <div style={{ background: '#059669', color: '#fff', padding: '2rem', textAlign: 'center' }}>
                  <h3 style={{ marginBottom: '0.5rem' }}>Request Received ✓</h3>
                  <p style={{ fontSize: '0.9rem', opacity: 0.9 }}>A material specialist will contact you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleLeadSubmit} style={{ display: 'grid', gap: '1rem' }}>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Pool Size</label>
                    <select className={styles.formSelect} value={formState.size} onChange={e => setFormState({ ...formState, size: e.target.value })}>
                      <option>Small</option>
                      <option>Medium</option>
                      <option>Large</option>
                    </select>
                  </div>
                  <input 
                    type="text" 
                    placeholder="Your Name" 
                    className={styles.formInput} 
                    required 
                    value={formState.name}
                    onChange={e => setFormState({ ...formState, name: e.target.value })}
                  />
                  <input 
                    type="tel" 
                    placeholder="Phone Number" 
                    className={styles.formInput} 
                    required 
                    value={formState.phone}
                    onChange={e => setFormState({ ...formState, phone: e.target.value })}
                  />
                  <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '1rem' }}>
                    Request {activeTab === 'concrete' ? 'Concrete' : 'Fiberglass'} Pricing
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* DETAILED COMPARISON TABLE */}
      <section className={styles.section} style={{ background: 'var(--bg-dark)', color: '#fff' }}>
        <div className="container">
          <h2 className={styles.sectionTitle} style={{ color: '#fff', textAlign: 'center', marginBottom: '3rem' }}>The Head-to-Head Breakdown</h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
              <thead>
                <tr style={{ textAlign: 'left', borderBottom: '2px solid var(--accent-primary)' }}>
                  <th style={{ padding: '1rem' }}>Feature</th>
                  <th style={{ padding: '1rem' }}>Concrete (Gunite)</th>
                  <th style={{ padding: '1rem' }}>Fiberglass</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: 'Primary Cost Factor', concrete: 'Excavation & Hauling Weight', fiber: 'Hauling Volume & Cutting' },
                  { feature: 'Time to Complete', concrete: '4–6 Days', fiber: '2–3 Days' },
                  { feature: 'Debris Weight', concrete: 'High (30–60 Tons)', fiber: 'Low (2–5 Tons)' },
                  { feature: 'Equipment Noise', concrete: 'High (Hydraulic Breakers)', fiber: 'Moderate (Saws/Winches)' },
                  { feature: 'Backfill Requirement', concrete: 'High-Compaction Engineered Fill', fiber: 'Standard Engineered Backfill' },
                ].map((row, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #1f2937' }}>
                    <td style={{ padding: '1.25rem', fontWeight: 700, color: 'var(--accent-primary)' }}>{row.feature}</td>
                    <td style={{ padding: '1.25rem' }}>{row.concrete}</td>
                    <td style={{ padding: '1.25rem', color: 'var(--accent-secondary)' }}>{row.fiber}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CALICHE NOTE — ENTITY INTERLOCKING */}
      <section className={styles.section} style={{ background: '#fff' }}>
        <div className="container" style={{ maxWidth: '900px' }}>
          <div style={{ background: 'var(--bg-light)', padding: '3rem', borderLeft: '8px solid var(--accent-secondary)' }}>
            <h2 style={{ marginBottom: '1.5rem' }}>Wait: Caliche Still Matters for Both</h2>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>
              Whether your pool is concrete or fiberglass, the soil beneath it in Mesa is likely caliche. Even for fiberglass pools, which are easier to lift out, we often have to break through caliche side-walls to properly grade the yard for drainage. 
              <br /><br />
              <Link href="/caliche-soil-pool-removal-mesa" style={{ color: 'var(--accent-primary)', fontWeight: 'bold' }}>Read how caliche affects your removal budget →</Link>
            </p>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className={`${styles.section} bg-hazard`} style={{ textAlign: 'center', padding: '5rem 0' }}>
        <div className="container">
          <h2 className={styles.sectionTitle} style={{ color: '#fff' }}>Unsure Which Material You Have?</h2>
          <p style={{ color: 'var(--accent-primary)', fontSize: '1.5rem', fontWeight: 900, marginBottom: '2.5rem' }}>
            We provide free on-site material identification and cost assessments.
          </p>
          <Link href="/contact" className="btn btn-primary" style={{ padding: '1.5rem 4rem', fontSize: '1.5rem' }}>
            Get Your Free Assessment
          </Link>
        </div>
      </section>
    </main>
  );
}
