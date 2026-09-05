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
          src="/hero_pool_demolition.jpg"
          alt="Pool removal permit paperwork and construction plans in Arizona"
          fill
          priority
          className={styles.heroBg}
          style={{ opacity: 0.25, objectFit: 'cover' }}
        />
        <div className="container" style={{ position: 'relative', zIndex: 2, paddingTop: '2rem', paddingBottom: '4rem' }}>
          <div className={styles.heroGrid}>
            <div className="fade-in">
              <div style={{ display: 'inline-block', background: 'var(--accent-secondary)', color: '#000', padding: '0.4rem 1rem', fontWeight: 900, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.5rem' }}>
                Permit & Compliance Guide 2026
              </div>
              <h1 className={styles.heroTitle} style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', marginBottom: '1.5rem' }}>
                Pool Removal Permit Guide for Maricopa County, Arizona
              </h1>
              <p className={styles.heroDesc} style={{ fontSize: '1.2rem', maxWidth: '700px' }}>
                Learn the typical application, utility disconnect, inspection, and final sign-off steps that may apply when removing or filling a swimming pool in Mesa and surrounding Maricopa County jurisdictions.
              </p>
              <p style={{ marginTop: '1.25rem', color: '#fff', maxWidth: '700px' }}>
                Looking for the contractor service rather than permit information? Visit our <Link href="/" style={{ color: 'var(--accent-primary)', fontWeight: 800, textDecoration: 'underline' }}>Mesa pool removal service page</Link>.
              </p>
            </div>

            {/* CONVERSION BOX */}
            <div className={styles.calculatorBox} style={{ boxShadow: 'var(--shadow-heavy)' }}>
              <div className={styles.calcTitle}>Permit & Quote Consultation</div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                Ask about the permit requirements that may apply to your property and project.
              </p>
              
              {submitSuccess ? (
                <div style={{ background: '#059669', color: '#fff', padding: '2.5rem 1rem', textAlign: 'center' }}>
                  <h3 style={{ marginBottom: '0.5rem' }}>Request Logged ✓</h3>
                  <p style={{ fontSize: '0.9rem', opacity: 0.9 }}>We&apos;ll contact you about the next steps.</p>
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
                    {isSubmitting ? 'Processing...' : 'Ask About Permit Requirements'}
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
              <span className={styles.sectionLabel}>Permit Process</span>
              <h2 className={styles.sectionTitle}>Common Pool Removal Permit Steps</h2>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, marginTop: '1.5rem' }}>
                Permit requirements can vary by jurisdiction and project type. This page is intended to explain the permit process, inspections, utility disconnect documentation, and related filing steps. For contractor pricing, demolition methods, or a project estimate, use our <Link href="/" style={{ color: 'var(--accent-primary)', fontWeight: 'bold', textDecoration: 'underline' }}>Mesa pool removal page</Link>.
              </p>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, marginTop: '1rem' }}>
                Depending on the jurisdiction, the process may include:
              </p>
              <ul style={{ listStyle: 'none', padding: 0, marginTop: '1rem' }}>
                {[
                  'A demolition or pool removal permit application',
                  'Utility disconnect or severance documentation',
                  'An inspection before backfill is completed',
                  'Final inspection or permit closeout documentation'
                ].map(item => (
                  <li key={item} style={{ padding: '0.75rem 0', borderBottom: '1px solid var(--border-light)', fontWeight: 700, display: 'flex', gap: '0.75rem' }}>
                    <span style={{ color: 'var(--accent-primary)' }}>✓</span> {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* PROCESS MANAGEMENT BOX */}
            <div style={{ background: 'var(--bg-light)', padding: '3rem', borderTop: '8px solid var(--accent-primary)' }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>Typical Permit Workflow</h3>
              <div style={{ display: 'grid', gap: '2rem' }}>
                {[
                  { n: '01', t: 'Application', d: 'Prepare the site information, scope of work, and any plans required by the local jurisdiction.' },
                  { n: '02', t: 'Utility Disconnects', d: 'Document required utility disconnects or abandonments before demolition progresses.' },
                  { n: '03', t: 'Inspection', d: 'Schedule any required inspection before the pool cavity is fully backfilled.' },
                  { n: '04', t: 'Final Closeout', d: 'Complete any final inspection or paperwork required to close the permit.' },
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
          <h2 className={styles.sectionTitle} style={{ color: '#fff', textAlign: 'center', marginBottom: '3rem' }}>Jurisdictions Covered by This Guide</h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '700px' }}>
              <thead>
                <tr style={{ textAlign: 'left', borderBottom: '3px solid var(--accent-primary)' }}>
                  <th style={{ padding: '1.5rem' }}>Jurisdiction</th>
                  <th style={{ padding: '1.5rem' }}>What to Confirm</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { city: 'City of Mesa', req: 'Permit type, required inspections, utility documentation, and closeout steps' },
                  { city: 'Town of Gilbert', req: 'Permit type, inspection sequence, backfill requirements, and closeout steps' },
                  { city: 'City of Chandler', req: 'Permit type, utility disconnect documentation, inspections, and closeout steps' },
                  { city: 'Maricopa County', req: 'Applicable county requirements for unincorporated properties and project closeout' },
                ].map((row, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #1f2937' }}>
                    <td style={{ padding: '1.25rem', fontWeight: 700 }}>{row.city}</td>
                    <td style={{ padding: '1.25rem' }}>{row.req}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className={styles.section} style={{ background: '#fff' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <h2 className={styles.sectionTitle} style={{ textAlign: 'center', marginBottom: '3rem' }}>Pool Removal Permit FAQ</h2>
          <div style={{ display: 'grid', gap: '2rem' }}>
            {[
              { q: 'Do I need a permit to remove or fill in a pool?', a: 'Permit requirements depend on the property location, jurisdiction, and scope of work. Confirm the current requirements with the applicable city or county before demolition or backfill begins.' },
              { q: 'When should inspections be scheduled?', a: 'Some jurisdictions require an inspection before the pool cavity is completely backfilled. The exact inspection sequence should be confirmed when the permit is issued.' },
              { q: 'What if a pool was previously filled without a permit?', a: 'Contact the applicable city or county to determine what documentation, inspection, or corrective work may be required to resolve the property record.' },
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
          <h2 className={styles.sectionTitle} style={{ color: '#fff' }}>Ready to Plan the Actual Pool Removal?</h2>
          <p style={{ color: 'var(--accent-primary)', fontSize: '1.5rem', fontWeight: 900, marginBottom: '3rem' }}>
            See the main Mesa service page for removal options, project details, and estimates.
          </p>
          <Link href="/" className="btn btn-primary" style={{ padding: '1.5rem 4rem', fontSize: '1.25rem' }}>
            View Mesa Pool Removal Services
          </Link>
        </div>
      </section>

    </main>
  );
}
