import { Metadata } from 'next';
import Link from 'next/link';
import CostClient from './CostClient';

export const metadata: Metadata = {
  title: "Pool Removal Cost Mesa | 2026 Pricing Guide",
  description: "How much does it cost to remove a pool in Mesa, AZ? Review the main price factors for concrete, fiberglass, and vinyl pool removal, including access and caliche excavation.",
  alternates: {
    canonical: 'https://mesapoolremoval.com/cost/mesa-pool-removal',
  },
};

export default function CostPage() {
  return (
    <>
      <div style={{ padding: '0.8rem 1.25rem', background: '#f5f5f5', fontSize: '0.9rem' }}>
        <div className="container">
          <Link href="/" style={{ fontWeight: 800, textDecoration: 'underline' }}>Mesa pool removal</Link>
          <span> / Pool removal cost guide</span>
        </div>
      </div>
      <CostClient />
    </>
  );
}
