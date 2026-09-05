import { Metadata } from 'next';
import Link from 'next/link';
import DobsonRanchClient from './DobsonRanchClient';

export const metadata: Metadata = {
  title: "Dobson Ranch Pool Removal Mesa AZ | Neighborhood Guide",
  description: "Pool removal information for Dobson Ranch in Mesa, including older pool construction, access, demolition, and backfill considerations.",
  alternates: { canonical: 'https://mesapoolremoval.com/mesa/dobson-ranch-pool-removal' },
};

export default function DobsonRanchPage() {
  return (
    <>
      <div style={{ padding: '0.8rem 1.25rem', background: '#f5f5f5', fontSize: '0.9rem' }}><div className="container"><Link href="/" style={{ fontWeight: 800, textDecoration: 'underline' }}>Mesa pool removal</Link><span> / Dobson Ranch</span></div></div>
      <DobsonRanchClient />
    </>
  );
}
