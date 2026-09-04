import { Metadata } from 'next';
import Link from 'next/link';
import FiberglassVsConcreteClient from './FiberglassVsConcreteClient';

export const metadata: Metadata = {
  title: "Fiberglass vs. Concrete Pool Removal Mesa AZ | Method Comparison",
  description: "Compare fiberglass and concrete pool removal in Mesa, including demolition methods, access considerations, excavation, and backyard restoration.",
  alternates: {
    canonical: 'https://mesapoolremoval.com/fiberglass-vs-concrete-pool-removal',
  },
  openGraph: {
    title: "Fiberglass vs. Concrete Pool Removal in Mesa",
    description: "Compare removal methods and project considerations for fiberglass and concrete pools in Mesa, Arizona.",
    url: "https://mesapoolremoval.com/fiberglass-vs-concrete-pool-removal",
    type: "article",
  },
};

export default function FiberglassVsConcretePage() {
  return (
    <>
      <div style={{ padding: '0.8rem 1.25rem', background: '#f5f5f5', fontSize: '0.9rem' }}>
        <div className="container">
          <Link href="/" style={{ fontWeight: 800, textDecoration: 'underline' }}>Mesa pool demolition</Link>
          <span> / Fiberglass vs. concrete pools</span>
        </div>
      </div>
      <FiberglassVsConcreteClient />
    </>
  );
}
