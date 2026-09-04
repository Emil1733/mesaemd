"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';
import { supabase } from '../lib/supabase';

export default function HomeClient() {
  const [formState, setFormState] = useState({ poolType: 'Concrete', size: 'Medium', access: 'Easy' });
  const [estimate, setEstimate] = useState<{ min: number, max: number } | null>(null);
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    let min = 0;
    let max = 0;
    if (formState.poolType === 'Concrete') { min = 12000; max = 16000; }
    else if (formState.poolType === 'Fiberglass') { min = 8000; max = 12000; }
    else { min = 6000; max = 9500; }
    if (formState.size === 'Small') { max -= 2000; min -= 1500; }
    else if (formState.size === 'Large') { max += 4000; min += 3000; }
    if (formState.access === 'Limited') { min += 1500; max += 2000; }
    else if (formState.access === 'Tight alley') { min += 3500; max += 5000; }
    setEstimate({ min, max });
    setStep(2);
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || !name) return;
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from('emd_leads_atlanta').insert([{
        pool_type: formState.poolType,
        pool_size: formState.size,
        full_name: name,
        phone,
        estimated_price_range: estimate ? `$${estimate.min} - $${estimate.max} | Access: ${formState.access}` : 'N/A',
        source_page: 'Mesa EMD - Homepage Inline Calculator'
      }]);
      if (error) throw error;
      setSubmitSuccess(true);
    } catch (err) {
      console.error('Submission error:', err);
      alert('There was a problem submitting your estimate request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <Image src="/hero_pool_demolition.jpg" alt="Pool demolition and excavation in Mesa Arizona" fill priority className={styles.heroBg} sizes="100vw" style={{ objectFit: 'cover' }} />
        <div className={styles.heroOverlay}></div>
        <div className={`container ${styles.heroGrid}`}>
          <div className="fade-in">
            <h1 className={styles.heroTitle}>Pool Removal in Mesa, AZ</h1>
            <p className={styles.heroDesc}>
              Pool demolition and fill-in for concrete, fiberglass, and vinyl pools in Mesa. Compare full removal and partial fill-in options, then get a fast project estimate based on pool size and backyard access.
            </p>
            <ul className={styles.trustBullets}>
              <li>Full pool removal and partial fill-in options</li>
              <li><Link href="/maricopa-county-pool-removal-permit" style={{ color: 'inherit', textDecoration: 'underline' }}>Mesa and Maricopa permit guidance</Link></li>
              <li>Caliche excavation and compacted backfill</li>
              <li>Options for access-restricted properties</li>
            </ul>
          </div>

          <div id="calculator" className={`${styles.calculatorBox} fade-in`} style={{ animationDelay: '0.2s' }}>
            <div className={styles.calcTitle}>Mesa Pool Removal Estimate</div>
            {step === 1 && (
              <form onSubmit={handleCalculate}>
                <div className={styles.formGroup}><label className={styles.formLabel}>Pool Type</label><select className={styles.formSelect} value={formState.poolType} onChange={e => setFormState({ ...formState, poolType: e.target.value })}><option>Concrete</option><option>Fiberglass</option><option>Vinyl</option></select></div>
                <div className={styles.formGroup}><label className={styles.formLabel}>Pool Size</label><select className={styles.formSelect} value={formState.size} onChange={e => setFormState({ ...formState, size: e.target.value })}><option>Small</option><option>Medium</option><option>Large</option></select></div>
                <div className={styles.formGroup}><label className={styles.formLabel}>Backyard Access</label><select className={styles.formSelect} value={formState.access} onChange={e => setFormState({ ...formState, access: e.target.value })}><option>Easy</option><option>Limited</option><option>Tight alley</option></select></div>
                <button type="submit" className="btn btn-dark" style={{ width: '100%', marginTop: '0.5rem' }}>Calculate Now</button>
              </form>
            )}
            {step === 2 && estimate && (
              <div className={styles.calcResult}>
                <div style={{ fontWeight: 900, textTransform: 'uppercase', marginBottom: '0.5rem', color: '#9ca3af' }}>Estimated Range:</div>
                <div className={styles.calcRange}>${estimate.min.toLocaleString()} – ${estimate.max.toLocaleString()}</div>
                {submitSuccess ? <div style={{ background: '#059669', color: '#fff', padding: '1.5rem', marginTop: '1.5rem', textAlign: 'center' }}><strong>Request received.</strong><div>We will follow up to verify the project details.</div></div> : (
                  <form onSubmit={handleLeadSubmit} style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <input type="text" placeholder="Your Name" className={styles.formInput} value={name} onChange={e => setName(e.target.value)} required />
                    <input type="tel" placeholder="Phone Number" className={styles.formInput} value={phone} onChange={e => setPhone(e.target.value)} required />
                    <button type="submit" disabled={isSubmitting} className="btn btn-primary" style={{ width: '100%' }}>{isSubmitting ? 'Submitting...' : 'Request this estimate'}</button>
                    <button type="button" onClick={() => setStep(1)} style={{ border: 'none', background: 'transparent', textDecoration: 'underline', cursor: 'pointer' }}>← Recalculate</button>
                  </form>
                )}
                <div className={styles.calcMicrocopy}>Mesa excavation costs can change when <Link href="/caliche-soil-pool-removal-mesa" style={{ textDecoration: 'underline', color: 'inherit' }}>caliche soil</Link> or limited equipment access is involved.</div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionDark}`}>
        <div className={`container ${styles.splitLayout}`}>
          <div>
            <h2 className={styles.sectionTitle}>Mesa Pool Demolition and Caliche Excavation</h2>
            <p className={styles.sectionDesc}>Pool removal in Mesa can involve hard caliche soil, narrow backyard access, concrete shell demolition, debris hauling, and careful backfilling. These site conditions should be evaluated before choosing a removal method.</p>
            <ul className={styles.dangerList}><li>Concrete, fiberglass, and vinyl pool removal</li><li>Full demolition or partial pool fill-in</li><li>Backfill and compaction planning for the finished yard</li></ul>
          </div>
          <div className={styles.dangerBox}>
            <div style={{ color: '#9ca3af', fontWeight: 'bold', marginBottom: '1rem', textTransform: 'uppercase' }}>Mesa Site Conditions</div>
            <ul className={styles.dangerList}><li>Caliche can increase excavation difficulty.</li><li>Limited access can change equipment requirements.</li><li>Future construction plans can affect the appropriate removal method.</li><li>Permit and inspection requirements should be confirmed for the property.</li></ul>
          </div>
        </div>
      </section>

      <section className={styles.section} style={{ background: '#fff' }}>
        <div className="container" style={{ maxWidth: '900px' }}>
          <h2 className={styles.sectionTitle}>Swimming Pool Removal in Mesa</h2>
          <p className={styles.sectionDesc}>Homeowners searching for a pool removal contractor in Mesa usually need one of two outcomes: complete removal of the pool shell or a partial demolition and fill-in. The right approach depends on the pool construction, property access, soil conditions, budget, and what you plan to build or landscape afterward.</p>
          <p className={styles.sectionDesc} style={{ marginTop: '1rem' }}>Mesa properties can also encounter hard <Link href="/caliche-soil-pool-removal-mesa" style={{ color: 'var(--accent-primary)', fontWeight: 'bold' }}>caliche soil</Link>. Before work begins, review the applicable <Link href="/maricopa-county-pool-removal-permit" style={{ color: 'var(--accent-primary)', fontWeight: 'bold' }}>pool removal permit requirements</Link> and determine whether full or partial removal fits your property plans.</p>
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionLight}`}>
        <div className="container">
          <div className={styles.sectionHeader} style={{ textAlign: 'center', margin: '0 auto 4rem auto' }}><h2 className={styles.sectionTitle}>Full Pool Removal vs Partial Fill-In</h2><p className={styles.sectionDesc}>Both methods remove the pool from everyday use, but they involve different levels of demolition.</p><Link href="/full-vs-partial-pool-removal-arizona" style={{ color: 'var(--text-muted)', textDecoration: 'underline', fontWeight: 'bold' }}>Compare full and partial pool removal →</Link></div>
          <div className={styles.grid2}><div className={styles.serviceCol} style={{ borderTop: '6px solid var(--accent-primary)' }}><h3>Full Removal</h3><ul><li>Pool shell and associated debris are removed</li><li>More extensive excavation and hauling</li><li>Often preferred when future use of the area matters</li></ul></div><div className={styles.serviceCol} style={{ borderTop: '6px solid var(--bg-dark)' }}><h3>Partial Fill-In</h3><ul><li>Part of the pool structure remains below grade</li><li>Less demolition than a full removal</li><li>Property plans and local requirements should be reviewed first</li></ul></div></div>
        </div>
      </section>

      <section className={`${styles.section} bg-hazard`}><div className="container"><div className={styles.sectionHeader} style={{ textAlign: 'center', margin: '0 auto 4rem auto' }}><h2 className={styles.sectionTitle} style={{ color: '#fff' }}>How Pool Removal Works</h2></div><div className={styles.grid3}><div className={styles.processCard}><div className={styles.processNum}>1</div><div className={styles.processContent}><h3>Site Review</h3><p>Review the pool type, access, intended removal method, and permit requirements.</p></div></div><div className={styles.processCard}><div className={styles.processNum}>2</div><div className={styles.processContent}><h3>Demolition</h3><p>Break up or remove the pool structure and haul away material required by the chosen method.</p></div></div><div className={styles.processCard}><div className={styles.processNum}>3</div><div className={styles.processContent}><h3>Backfill</h3><p>Place and compact fill material based on the project requirements and future use of the yard.</p></div></div></div></div></section>

      <section className={`${styles.section} ${styles.sectionLight}`}><div className="container"><div className={styles.sectionHeader} style={{ textAlign: 'center', margin: '0 auto 3rem auto' }}><h2 className={styles.sectionTitle}>Pool Removal Across Mesa Neighborhoods</h2><p className={styles.sectionDesc}>Explore more specific information for Mesa neighborhoods and nearby East Valley service areas.</p></div><div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}><Link href="/mesa/eastmark-pool-removal"><span className={styles.neighborhoodTag}>Eastmark</span></Link><Link href="/mesa/las-sendas-pool-removal"><span className={styles.neighborhoodTag}>Las Sendas</span></Link><Link href="/mesa/dobson-ranch-pool-removal"><span className={styles.neighborhoodTag}>Dobson Ranch</span></Link><Link href="/mesa/red-mountain-ranch-pool-removal"><span className={styles.neighborhoodTag}>Red Mountain Ranch</span></Link></div></div></section>

      <section className={`${styles.section} ${styles.sectionLight}`} style={{ textAlign: 'center' }}><div className="container"><h2 className={styles.sectionTitle}>Mesa Pool Removal Cost</h2><p className={styles.sectionDesc}>Pool type, size, demolition method, caliche, equipment access, hauling, backfill, and permit requirements can all affect the final price.</p><div style={{ marginTop: '2rem' }}><Link href="/cost/mesa-pool-removal" className="btn btn-dark">See the Mesa pool removal cost guide</Link></div></div></section>

      <section className={`${styles.section} ${styles.sectionDark}`}><div className="container" style={{ textAlign: 'center', maxWidth: '800px' }}><h2 className={styles.sectionTitle}>Mesa Pool Removal Permits</h2><p className={styles.sectionDesc}>Permit and inspection requirements depend on the property and jurisdiction. Review the dedicated permit guide before planning demolition or backfill.</p><div style={{ marginTop: '2rem' }}><Link href="/maricopa-county-pool-removal-permit" className="btn btn-primary">Read the permit guide</Link></div></div></section>

      <section className={`${styles.section} bg-hazard`} style={{ textAlign: 'center', padding: '4rem 0' }}><div className="container"><h2 className={styles.sectionTitle} style={{ color: '#fff' }}>Get a Mesa Pool Removal Estimate</h2><p style={{ color: '#fff', fontSize: '1.2rem', margin: '1.5rem 0 3rem' }}>Tell us your pool type, size, and backyard access to start with an estimated project range.</p><a href="#calculator" className="btn btn-primary" style={{ padding: '1.5rem 4rem', fontSize: '1.25rem' }}>Calculate My Estimate</a></div></section>
    </main>
  );
}
