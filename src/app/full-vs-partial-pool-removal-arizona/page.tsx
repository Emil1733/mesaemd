import { Metadata } from 'next';
import Link from 'next/link';
import FullVsPartialClient from './FullVsPartialClient';

export const metadata: Metadata = {
  title: "Full vs. Partial Pool Removal Arizona | Pros, Cons & Cost Comparison",
  description: "Compare full and partial pool removal in Arizona, including demolition scope, future property use, costs, and permit considerations.",
  alternates: {
    canonical: 'https://mesapoolremoval.com/full-vs-partial-pool-removal-arizona',
  },
  openGraph: {
    title: "Full vs. Partial Pool Removal in Arizona",
    description: "Compare full and partial pool removal methods before choosing the right approach for your property.",
    url: "https://mesapoolremoval.com/full-vs-partial-pool-removal-arizona",
    type: "article",
  },
};

export default function FullVsPartialPage() {
  return (
    <>
      <div style={{ padding: '0.8rem 1.25rem', background: '#f5f5f5', fontSize: '0.9rem' }}>
        <div className="container">
          <Link href="/" style={{ fontWeight: 800, textDecoration: 'underline' }}>Pool removal in Mesa</Link>
          <span> / Full vs. partial removal</span>
        </div>
      </div>
      <FullVsPartialClient />
    </>
  );
}
