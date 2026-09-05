import { Metadata } from 'next';
import Link from 'next/link';
import EastmarkClient from './EastmarkClient';

export const metadata: Metadata = {
  title: "Eastmark Pool Removal Mesa AZ | Neighborhood Guide",
  description: "Pool removal information for Eastmark in Mesa, including access, soil, HOA, demolition, and backfill considerations.",
  alternates: { canonical: 'https://mesapoolremoval.com/mesa/eastmark-pool-removal' },
};

export default function EastmarkPage() {
  return (
    <>
      <div style={{ padding: '0.8rem 1.25rem', background: '#f5f5f5', fontSize: '0.9rem' }}><div className="container"><Link href="/" style={{ fontWeight: 800, textDecoration: 'underline' }}>Pool removal in Mesa</Link><span> / Eastmark</span></div></div>
      <EastmarkClient />
    </>
  );
}
