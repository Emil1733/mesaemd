"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../page.module.css';
import { supabase } from '../../lib/supabase';

export default function PermitClient() {
  const [formState, setFormState] = useState({
    city: 'City of Mesa',
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
        pool_type: `Permit Inquiry: ${formState.city}`,
        pool_size: 'N/A',
        full_name: formState.name,
        phone: formState.phone,
        source_page: `Mesa EMD - Permit Guide Page`,
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
      <section className={styles.hero} style={{ minHeight: '55vh', background: '#0a0a0a' }}>
        <Image
          src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=2000"
          alt="Official construction permits and blueprints for Arizona pool removal"
          fill
          priority
          className={styles.heroBg}
          style={{ opacity: 0.25, objectFit: 'cover' }}
        />
        <div className="container" style={{ position: 'relative', zIndex: 2, paddingTop: '4rem', paddingBottom: '4rem' }}>
          <div className={styles.heroGrid}>
            <div className="fade-in">
              <div style={{ display: 'inline-block', background: 'var(--accent-secondary)', color: '#000', padding: '0.4rem 1rem', fontWeight: 900, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.5rem' }}>
                Legal & Compliance Guide 2026
              </div>
              <h1 className={styles.heroTitle} style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', marginBottom: '1.5rem' }}>
                Maricopa County Pool Removal Permits{' '}
                <span style={{ color: 'var(--accent-primary)' }}>| Rules, Inspections, and Compliance</span>
              </h1>
              <p className={styles.heroDesc} style={{ fontSize: '1.2rem', maxWidth: '700px' }}>
                In Arizona, removing a pool without a permit is not just a fine risk—it is a title-transfer nightmare. We handle the entire filing process with the City of Mesa and Maricopa County on your behalf.
              </p>
            </div>

            {/* CONVERSION BOX */}
            <div className={styles.calculatorBox} style={{ boxShadow: 'var(--shadow-heavy)' }}>
              <div className={styles.calcTitle}>Permit & Quote Consultation</div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                Let our permit specialists verify your property&apos;s specific municipal requirements.
              </p>
              
              {submitSuccess ? (
                <div style={{ background: '#059669', color: '#fff', padding: '2.5rem 1rem', textAlign: 'center' }}>
                  <h3 style={{ marginBottom: '0.5rem' }}>Filing Request Logged ✓</h3>
                  <p style={{ fontSize: '0.9rem', opacity: 0.9 }}>We&apos;ll contact you with city-specific requirements.</p>
                </div>
              ) : (
                <form onSubmit={handleLeadSubmit} style={{ display: 'grid', gap: '1rem' }}>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Your Jurisdiction</label>
                    <select className={styles.formSelect} value={formState.city} onChange={e => setFormState({ ...formState, city: e.target.value })}>
                      <option>City of Mesa</option>
                      <option>Town of Gilbert</option>
                      <option>City of Chandler</option>
                      <option>Maricopa County (Unincorporated)</option>
                    </select>
                  </div>
                  <input type="text" placeholder="Your Name" className={styles.formInput} required value={formState.name} onChange={e => setFormState({ ...formState, name: e.target.value })} />
                  <input type="tel" placeholder="Phone Number" className={styles.formInput} required value={formState.phone} onChange={e => setFormState({ ...formState, phone: e.target.value })} />
                  <button type="submit" disabled={isSubmitting} className="btn btn-primary" style={{ width: '100%', padding: '1rem' }}>
                    {isSubmitting ? 'Processing...' : 'Get Permitted Quote'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CORE PERMIT RULES SECTION */}
      <section className={styles.section} style={{ background: '#fff' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem', alignItems: 'start' }}>
            <div>
              <span className={styles.sectionLabel}>Mandatory Compliance</span>
              <h2 className={styles.sectionTitle}>The Legal Requirements for Pool Demolition</h2>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, marginTop: '1.5rem' }}>
                Per current Arizona Building Codes and Maricopa County Environmental Health standards, <strong>swimming pool demolition is a regulated activity.</strong> It is not simply &ldquo;filling in a hole.&rdquo; 
              </p>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, marginTop: '1rem' }}>
                Failure to obtain the proper permits can result in:
              </p>
              <ul style={{ listStyle: 'none', padding: 0, marginTop: '1rem' }}>
                {[
                  'Municipal fines up to $2,500 per day',
                  'Inability to close escrow on a future home sale',
                  'Mandatory excavation of the yard for retroactive inspection',
                  'HOA legal action and lien placement'
                ].map(item => (
                  <li key={item} style={{ padding: '0.75rem 0', borderBottom: '1px solid var(--border-light)', fontWeight: 700, display: 'flex', gap: '0.75rem' }}>
                    <span style={{ color: 'var(--accent-primary)' }}>❌</span> {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* PROCESS MANAGEMENT BOX */}
            <div style={{ background: 'var(--bg-light)', padding: '3rem', borderTop: '8px solid var(--accent-primary)' }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>Our 4-Step Permit Management:</h3>
              <div style={{ display: 'grid', gap: '2rem' }}>
                {[
                  { n: '01', t: 'Application Filing', d: 'We submit the engineering plan and site map to the City of Mesa or Maricopa County Planning & Development.' },
                  { n: '02', t: 'Utility Severance', d: 'Mandatory proof of gas, water, and electrical disconnect by a licensed technician must be on file.' },
                  { n: '03', t: 'Pre-Backfill Inspection', d: 'The city inspector must verify the shell is properly holed (for drainage) or entirely removed before any dirt enters the site.' },
                  { n: '04', t: 'Final Sign-Off', d: 'After compaction is complete, we obtain the final inspector signature to clear your permit from the city database.' },
                ].map(step => (
                  <div key={step.n} style={{ display: 'flex', gap: '1.5rem' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--accent-primary)', opacity: 0.5 }}>{step.n}</div>
                    <div>
                      <div style={{ fontWeight: 900, marginBottom: '0.25rem' }}>{step.t}</div>
                      <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>{step.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* REGIONAL NUANCES TABLE */}
      <section className={styles.section} style={{ background: 'var(--bg-dark)', color: '#fff' }}>
        <div className="container">
          <h2 className={styles.sectionTitle} style={{ color: '#fff', textAlign: 'center', marginBottom: '3rem' }}>Local Permit Nuances by City</h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '700px' }}>
              <thead>
                <tr style={{ textAlign: 'left', borderBottom: '3px solid var(--accent-primary)' }}>
                  <th style={{ padding: '1.5rem' }}>Jurisdiction</th>
                  <th style={{ padding: '1.5rem' }}>Primary Requirement</th>
                  <th style={{ padding: '1.5rem' }}>Est. Fee</th>
                  <th style={{ padding: '1.5rem' }}>Timeline</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { city: 'City of Mesa', req: 'Mandatory holed-shell inspection', fee: '$250 - $450', time: '3-10 Days' },
                  { city: 'Gilbert Town', req: 'Engineered compaction report needed', fee: '$200 - $400', time: '5-7 Days' },
                  { city: 'Chandler City', req: 'Strict utility severance verification', fee: '$300 - $500', time: '7-14 Days' },
                  { city: 'Maricopa County', req: 'Vector control/Mosquito sign-off', fee: '$150 - $300', time: '2-5 Days' },
                ].map((row, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #1f2937' }}>
                    <td style={{ padding: '1.25rem', fontWeight: 700 }}>{row.city}</td>
                    <td style={{ padding: '1.25rem' }}>{row.req}</td>
                    <td style={{ padding: '1.25rem', color: 'var(--accent-secondary)', fontWeight: 700 }}>{row.fee}</td>
                    <td style={{ padding: '1.25rem' }}>{row.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ SECTION — SCHEMA ELIGIBLE */}
      <section className={styles.section} style={{ background: '#fff' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <h2 className={styles.sectionTitle} style={{ textAlign: 'center', marginBottom: '3rem' }}>Permitting FAQ</h2>
          <div style={{ display: 'grid', gap: '2rem' }}>
            {[
              { q: 'Can I remove the pool myself if I am the homeowner?', a: 'Yes, but you are still legally required to pull an owner-builder permit and coordinate all city inspections. Most homeowners find the utility severance and compaction reporting requirements difficult to manage without professional equipment.' },
              { q: 'Will the city increase my property taxes after pool removal?', a: 'Generally, no. In many cases, removing an unused "liability" pool can stabilize your property assessment by reducing the square footage of "improved" recreational space, though you should consult a tax professional for specific Mesa assessments.' },
              { q: 'What happens if I already filled my pool without a permit?', a: 'This is a "Title Cloud." To clear it, the city often requires you to excavate a portion of the yard to prove the pool shell was holed for drainage. We specialize in retroactive permit clearance for East Valley properties.' },
            ].map(item => (
              <div key={item.q} style={{ borderBottom: '1px solid var(--border-light)', paddingBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.75rem', fontWeight: 900 }}>{item.q}</h3>
                <p style={{ color: 'var(--text-muted)', lineHeight: 1.7 }}>{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className={`${styles.section} bg-hazard`} style={{ textAlign: 'center', padding: '6rem 0' }}>
        <div className="container">
          <h2 className={styles.sectionTitle} style={{ color: '#fff' }}>Don&apos;t Handle the Red Tape Alone.</h2>
          <p style={{ color: 'var(--accent-primary)', fontSize: '1.5rem', fontWeight: 900, marginBottom: '3rem' }}>
            We include full permit management in every quote.
          </p>
          <Link href="/contact" className="btn btn-primary" style={{ padding: '1.5rem 4rem', fontSize: '1.25rem' }}>
            Start Your Permitted Project
          </Link>
        </div>
      </section>

    </main>
  );
}
