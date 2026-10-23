import { Metadata } from 'next';
import Link from 'next/link';
import { calicheFaqs } from '../../lib/caliche-faqs';
import CalicheClient from './CalicheClient';

export const metadata: Metadata = {
  title: "Caliche Soil and Pool Removal in Mesa AZ | Excavation Guide",
  description: "Learn how caliche soil can affect pool removal in Mesa, including excavation difficulty, equipment access, backfill, and project pricing factors.",
  alternates: {
    canonical: 'https://mesapoolremoval.com/caliche-soil-pool-removal-mesa',
  },
  openGraph: {
    title: "Caliche Soil and Pool Removal in Mesa",
    description: "Learn how hard desert soil can affect excavation, access, and backfill during a Mesa pool removal project.",
    url: "https://mesapoolremoval.com/caliche-soil-pool-removal-mesa",
    type: "article",
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: calicheFaqs.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
};

export default function CalichePage() {
  return (
    <>
      <script id="caliche-faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, '\\u003c') }} />
      <div style={{ padding: '0.8rem 1.25rem', background: '#f5f5f5', fontSize: '0.9rem' }}>
        <div className="container">
          <Link href="/" style={{ fontWeight: 800, textDecoration: 'underline' }}>Mesa swimming pool removal</Link>
          <span> / Caliche soil guide</span>
        </div>
      </div>
      <CalicheClient />
    </>
  );
}
