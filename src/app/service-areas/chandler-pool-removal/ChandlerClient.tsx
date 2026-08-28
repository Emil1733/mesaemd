"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../../page.module.css';
import { supabase } from '../../../lib/supabase';

export default function ChandlerClient() {
  const [formState, setFormState] = useState({ name: '', phone: '', poolType: 'Concrete' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.phone || !formState.name) return;
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from('emd_leads_atlanta').insert([{
        pool_type: formState.poolType,
        full_name: formState.name,
        phone: formState.phone,
        source_page: 'Chandler City Page',
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
      <section className={styles.hero} style={{ minHeight: '80vh', background: '#0a0a0a' }}>
        <Image
          src="/hero_pool_demolition.jpg"
          alt="Concrete pool demolition in Chandler Arizona"
          fill
          priority
          className={styles.heroBg}
          style={{ opacity: 0.25, objectFit: 'cover' }}
        />
        <div className="container" style={{ position: 'relative', zIndex: 2, paddingTop: '2rem', paddingBottom: '4rem' }}>
          <div className={styles.heroGrid}>
            <div className="fade-in">
              <div style={{ display: 'inline-block', background: 'var(--accent-primary)', color: '#000', padding: '0.4rem 1rem', fontWeight: 900, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.5rem' }}>
                Chandler, AZ Service Area
              </div>
              <h1 className={styles.heroTitle} style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '1.5rem' }}>
                Professional Pool Removal in Chandler
              </h1>
              <p className={styles.heroDesc} style={{ fontSize: '1.15rem', maxWidth: '600px', lineHeight: 1.8 }}>
                Are you tired of paying thousands of dollars every year to maintain an aging, leaking, or unused swimming pool in Chandler? Our licensed and insured demolition teams specialize in full structural removal, partial fill-ins, and engineered backfill compaction specifically designed for the flat clay with occasional caliche found throughout the Chandler area.
              </p>
              <ul className={styles.trustBullets} style={{ marginTop: '2rem' }}>
                <li>Engineered 95% compaction backfill</li>
                <li>Chandler city permits managed for you</li>
                <li>Protecting your landscaping and hardscaping</li>
                <li>Fast 3-5 day completion times</li>
              </ul>
            </div>
            <div className="fade-in" style={{ animationDelay: '0.2s', background: 'var(--bg-dark)', padding: '2rem', border: '1px solid var(--border-light)' }}>
              <div style={{ fontSize: '1.25rem', fontWeight: 900, marginBottom: '1rem', color: '#fff' }}>Get a Free Chandler Estimate</div>
              {submitSuccess ? (
                <div style={{ background: '#059669', color: '#fff', padding: '1.5rem', textAlign: 'center', borderRadius: '4px' }}>
                  <div style={{ fontSize: '1.1rem', fontWeight: 900, marginBottom: '0.5rem' }}>Request Received ✓</div>
                  <div style={{ opacity: 0.9, fontSize: '0.9rem' }}>We will contact you shortly to schedule your free site assessment.</div>
                </div>
              ) : (
                <form onSubmit={handleLeadSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <input type="text" placeholder="Your Name" className={styles.formInput} value={formState.name} onChange={e => setFormState({ ...formState, name: e.target.value })} required />
                  <input type="tel" placeholder="Phone Number" className={styles.formInput} value={formState.phone} onChange={e => setFormState({ ...formState, phone: e.target.value })} required />
                  <select className={styles.formSelect} value={formState.poolType} onChange={e => setFormState({ ...formState, poolType: e.target.value })}>
                    <option>Concrete Pool</option>
                    <option>Fiberglass Pool</option>
                    <option>Vinyl Liner</option>
                  </select>
                  <button type="submit" disabled={isSubmitting} className="btn btn-primary" style={{ width: '100%', opacity: isSubmitting ? 0.7 : 1 }}>
                    {isSubmitting ? 'Sending...' : 'Get My Quote'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* WHY REMOVE INSTEAD OF REPAIR */}
      <section className={styles.section} style={{ background: '#fff' }}>
        <div className="container">
          <span className={styles.sectionLabel}>Repair vs Remove</span>
          <h2 className={styles.sectionTitle}>Why Homeowners in Chandler Are Removing Their Pools</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginTop: '3rem' }}>
            <div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--accent-secondary)' }}>1. Escalating Maintenance Costs</h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.7 }}>
                The harsh Arizona sun combined with our hard water takes a massive toll on pool pumps, filters, and plaster. Average annual maintenance costs in Chandler now exceed $2,500. Over ten years, that is $25,000 completely wasted on a pool you barely use.
              </p>
            </div>
            <div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--accent-secondary)' }}>2. Catastrophic Shell Failure</h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.7 }}>
                Pools built in the 1970s and 1980s are reaching the end of their structural lifespan. When cracks form due to ground shifting, resurfacing is merely a band-aid. True structural repairs can cost upwards of $15,000, making removal the far more logical financial decision.
              </p>
            </div>
            <div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--accent-secondary)' }}>3. Reclaiming Usable Yard Space</h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.7 }}>
                Yards in Chandler are valuable real estate. By removing an oversized, outdated pool, you instantly unlock hundreds of square feet of usable outdoor space for a modern patio, an outdoor kitchen, a lush garden, or a safe play area for children and pets.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* OUR PROCESS */}
      <section className={styles.section} style={{ background: 'var(--bg-dark)', color: '#fff' }}>
        <div className="container">
          <span className={styles.sectionLabel}>Our Process</span>
          <h2 className={styles.sectionTitle} style={{ color: '#fff' }}>The Chandler Pool Demolition Process</h2>
          <p style={{ fontSize: '1.1rem', maxWidth: '700px', margin: '0 auto 3rem auto', textAlign: 'center', color: 'var(--text-inverse-muted)' }}>
            We do not cut corners. Our comprehensive 6-step process ensures your yard is structurally sound, properly permitted, and ready for future landscaping.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>
            {[
              { title: 'Step 1: City Permits & Utility Marking', text: 'Before any heavy machinery arrives, we file all necessary demolition permits directly with the city of Chandler. We also schedule Blue Stake utility marking to ensure all underground gas, water, and electrical lines are identified and protected.' },
              { title: 'Step 2: Safe Drainage & Neutralization', text: 'We safely drain thousands of gallons of pool water in compliance with Chandler environmental regulations. We never flood your neighbors yard or cause street damage.' },
              { title: 'Step 3: Heavy Equipment Excavation', text: 'Using our specialized mini-excavators and skid steers, we break apart the concrete shell. For the flat clay with occasional caliche common in Chandler, we deploy hydraulic breakers to shatter the hardpan and pool floor, preventing future water pooling.' },
              { title: 'Step 4: Debris Haul-Off', text: 'We do not bury debris unless performing a specific partial fill-in. For full removals, we load all rebar, concrete, plaster, and plumbing into dump trucks and haul it to authorized Chandler recycling facilities.' },
              { title: 'Step 5: Engineered Backfill & Compaction', text: 'This is the most critical step. We import clean, screened fill dirt and compact it in 8 to 12-inch lifts. Using heavy compaction rollers, we achieve 95% Proctor density, ensuring the ground will never sink or settle.' },
              { title: 'Step 6: Final Grade & Clean-Up', text: 'We perform a final grade of the site, ensuring proper water runoff and drainage away from your homes foundation. We clean the street, sweep the access paths, and leave your yard as a clean, blank canvas.' }
            ].map((step, i) => (
              <div key={i} style={{ background: '#1f2937', padding: '2rem', borderRadius: '8px', borderLeft: '4px solid var(--accent-primary)' }}>
                <h3 style={{ fontSize: '1.3rem', marginBottom: '0.75rem', color: '#fff' }}>{step.title}</h3>
                <p style={{ color: 'var(--text-inverse-muted)', lineHeight: 1.7 }}>{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COST GUIDE */}
      <section className={styles.section} style={{ background: '#f9fafb' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '3rem', alignItems: 'center' }}>
            <div>
              <span className={styles.sectionLabel}>Cost Guide</span>
              <h2 className={styles.sectionTitle}>How Much Does Pool Removal Cost in Chandler?</h2>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, marginTop: '1.5rem' }}>
                Every backyard in Chandler is unique. The final price of your demolition project will depend heavily on the accessibility of your yard, the total square footage of the pool, and whether you opt for a partial fill-in or a complete structural removal.
              </p>
              <ul style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', color: 'var(--text-muted)' }}>
                <li><strong>Access:</strong> Tight side yards require smaller, slower equipment, which increases labor time.</li>
                <li><strong>Soil Type:</strong> The flat clay with occasional caliche in Chandler requires aggressive breaking and specialized fill dirt.</li>
                <li><strong>Pool Construction:</strong> Heavily reinforced gunite/concrete takes longer to break than fiberglass.</li>
              </ul>
            </div>
            <div style={{ background: '#fff', padding: '2.5rem', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', borderTop: '6px solid var(--accent-secondary)' }}>
              <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <div style={{ color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 800, fontSize: '0.9rem', letterSpacing: '0.05em' }}>Average Chandler Price Range</div>
                <div style={{ fontSize: '3rem', fontWeight: 900, color: '#111', margin: '0.5rem 0' }}>$4,500 – $11,500</div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Includes permits, demolition, haul-off, and compaction.</p>
              </div>
              <Link href="/contact" className="btn btn-dark" style={{ width: '100%', display: 'block', textAlign: 'center' }}>
                Request an Exact Quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* PERMITS & REGULATIONS */}
      <section className={styles.section} style={{ background: '#fff' }}>
        <div className="container">
          <h2 className={styles.sectionTitle} style={{ textAlign: 'center', marginBottom: '2rem' }}>Chandler Regulations & Permits</h2>
          <div style={{ maxWidth: '800px', margin: '0 auto', color: 'var(--text-muted)', lineHeight: 1.8 }}>
            <p style={{ marginBottom: '1.5rem' }}>
              Attempting to remove a pool without the proper permits in Chandler can result in massive fines, stop-work orders, and severe legal issues when you attempt to sell your home. 
            </p>
            <p style={{ marginBottom: '1.5rem' }}>
              We are fully licensed demolition contractors. We pull all necessary permits through the city of Chandler, schedule the mandatory open-hole inspections, and ensure that the compaction reports meet all local municipal codes.
            </p>
            <p>
              If you live in a community with a Homeowners Association (HOA), we will also provide the detailed project scopes, timelines, and insurance certificates required to gain architectural committee approval quickly.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ TEXT SECTION */}
      <section className={styles.section} style={{ background: 'var(--bg-dark)', color: '#fff' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <h2 className={styles.sectionTitle} style={{ color: '#fff', marginBottom: '3rem', textAlign: 'center' }}>
            Frequently Asked Questions
          </h2>
          <div style={{ display: 'grid', gap: '2rem' }}>
            <div style={{ borderBottom: '1px solid var(--border-dark)', paddingBottom: '1.5rem' }}>
              <h3 style={{ color: 'var(--accent-primary)', fontSize: '1.1rem', marginBottom: '0.75rem' }}>Do I need a permit to remove a pool in Chandler?</h3>
              <p style={{ color: 'var(--text-inverse-muted)', lineHeight: 1.7 }}>Yes, Chandler requires a demolition permit for pool removal to ensure proper backfill and safety. We handle the entire permitting process for you, from application to final city inspection.</p>
            </div>
            <div style={{ borderBottom: '1px solid var(--border-dark)', paddingBottom: '1.5rem' }}>
              <h3 style={{ color: 'var(--accent-primary)', fontSize: '1.1rem', marginBottom: '0.75rem' }}>Does the flat clay with occasional caliche in Chandler affect the demolition process?</h3>
              <p style={{ color: 'var(--text-inverse-muted)', lineHeight: 1.7 }}>Yes, Chandler is known for its flat clay with occasional caliche. This requires heavy-duty excavation equipment to break through hardpan layers and ensure the imported fill dirt is compacted correctly to prevent future sinking.</p>
            </div>
            <div style={{ borderBottom: '1px solid var(--border-dark)', paddingBottom: '1.5rem' }}>
              <h3 style={{ color: 'var(--accent-primary)', fontSize: '1.1rem', marginBottom: '0.75rem' }}>How long does the pool removal process take?</h3>
              <p style={{ color: 'var(--text-inverse-muted)', lineHeight: 1.7 }}>Most pool removals in Chandler take between 3 to 5 days of physical labor, depending on access and pool type. The permitting process can add 1-2 weeks before we break ground.</p>
            </div>
            <div style={{ borderBottom: '1px solid var(--border-dark)', paddingBottom: '1.5rem' }}>
              <h3 style={{ color: 'var(--accent-primary)', fontSize: '1.1rem', marginBottom: '0.75rem' }}>Will removing my pool lower my property value in Chandler?</h3>
              <p style={{ color: 'var(--text-inverse-muted)', lineHeight: 1.7 }}>In many cases, removing an old, deteriorating pool increases the usable square footage of your yard and makes the home more attractive to families who do not want the liability or maintenance costs of an aging pool.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className={styles.section} style={{ textAlign: 'center', padding: '6rem 0', background: 'var(--bg-light)' }}>
        <div className="container">
          <h2 className={styles.sectionTitle} style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
            Ready to reclaim your backyard in Chandler?
          </h2>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '2rem' }}>
            <Link href="/contact" className="btn btn-primary" style={{ padding: '1.5rem 4rem', fontSize: '1.25rem' }}>
              Contact Us Today
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}

