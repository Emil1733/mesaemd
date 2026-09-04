import { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
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
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is caliche soil and why can it matter during pool removal?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Caliche is a hardened soil layer common in desert environments. When it is present around a pool excavation, it can increase digging difficulty and may require heavier excavation equipment."
      }
    },
    {
      "@type": "Question",
      "name": "Can caliche increase pool removal cost?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Hard soil can increase equipment time, excavation effort, and hauling requirements. The actual cost impact depends on the property, pool, access, and soil conditions."
      }
    },
    {
      "@type": "Question",
      "name": "Does caliche affect backfill after pool removal?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Existing soil conditions should be considered when planning backfill and compaction. The appropriate method depends on the project requirements and intended future use of the area."
      }
    },
    {
      "@type": "Question",
      "name": "How do I know whether my Mesa property has hard caliche?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A site review is the most reliable way to evaluate excavation conditions. Soil hardness can vary significantly even within the same part of Mesa."
      }
    }
  ]
};

export default function CalichePage() {
  return (
    <>
      <Script id="caliche-faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
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
