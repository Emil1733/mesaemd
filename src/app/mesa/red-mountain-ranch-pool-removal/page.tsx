import { Metadata } from 'next';
import Link from 'next/link';
import RedMountainClient from './RedMountainClient';

export const metadata: Metadata = {
  title: "Red Mountain Ranch Pool Removal Mesa AZ | Neighborhood Guide",
  description: "Pool removal information for Red Mountain Ranch in Mesa, including sloped access, caliche, demolition, and HOA considerations.",
  alternates: { canonical: 'https://mesapoolremoval.com/mesa/red-mountain-ranch-pool-removal' },
};

export default function RedMountainPage() {
  return (
    <>
      <div style={{ padding: '0.8rem 1.25rem', background: '#f5f5f5', fontSize: '0.9rem' }}><div className="container"><Link href="/" style={{ fontWeight: 800, textDecoration: 'underline' }}>Swimming pool removal in Mesa</Link><span> / Red Mountain Ranch</span></div></div>
      <RedMountainClient />
    </>
  );
}
