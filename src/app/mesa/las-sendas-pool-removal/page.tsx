import { Metadata } from 'next';
import Link from 'next/link';
import LasSendasClient from './LasSendasClient';

export const metadata: Metadata = {
  title: "Las Sendas Pool Removal Mesa AZ | Neighborhood Guide",
  description: "Pool removal information for Las Sendas in Mesa, including sloped access, hard desert soil, demolition, and HOA considerations.",
  alternates: { canonical: 'https://mesapoolremoval.com/mesa/las-sendas-pool-removal' },
};

export default function LasSendasPage() {
  return (
    <>
      <div style={{ padding: '0.8rem 1.25rem', background: '#f5f5f5', fontSize: '0.9rem' }}><div className="container"><Link href="/" style={{ fontWeight: 800, textDecoration: 'underline' }}>Mesa pool demolition</Link><span> / Las Sendas</span></div></div>
      <LasSendasClient />
    </>
  );
}
