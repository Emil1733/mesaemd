import { Metadata } from 'next';
import Script from 'next/script';
import CalicheClient from './CalicheClient';

export const metadata: Metadata = {
  title: "Caliche Soil Pool Removal Mesa AZ | Cost Impact & Equipment Guide 2026",
  description: "Caliche bedrock adds $3,500–$8,000 to Mesa pool removal costs. Learn exactly how caliche affects your removal timeline, equipment, and price — with real local data.",
  openGraph: {
    title: "Does Caliche Soil Increase Pool Removal Cost in Mesa?",
    description: "Yes — by $3,500–$8,000 depending on grade. Find out what grade your Mesa property has and what it means for your project.",
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
      "name": "What is caliche soil and why does it matter for pool removal in Mesa?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Caliche is a hardened layer of calcium carbonate that occurs naturally in desert soils across Arizona. In Mesa, it typically sits 2–6 feet below the surface. Standard excavator buckets cannot break through grade-3 caliche — hydraulic rock breakers are required, adding cost and time to pool removal projects."
      }
    },
    {
      "@type": "Question",
      "name": "How much does caliche add to pool removal cost in Mesa?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Caliche soil surcharges in Mesa typically range from $3,500 to $8,000 depending on the caliche grade and pool perimeter. Grade-1 caliche (soft) adds $1,500–$3,000. Grade-3 caliche (hardpan) adds $5,000–$8,000+. Areas like Las Sendas and Red Mountain Ranch consistently encounter grade-3 hardpan."
      }
    },
    {
      "@type": "Question",
      "name": "Which Mesa neighborhoods have the worst caliche?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The highest-grade caliche in Mesa is found in neighborhoods built on or near mountain foothills: Las Sendas (Usery Mountain), Red Mountain Ranch, and Alta Mesa. Central Mesa and Dobson Ranch typically encounter softer grade-1 or grade-2 caliche that requires less specialized equipment."
      }
    },
    {
      "@type": "Question",
      "name": "Does caliche affect the backfill compaction after pool removal?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Caliche is non-expansive, which actually helps with backfill stability. However, broken caliche chunks must be properly compacted in lifts — loose caliche backfill will settle unevenly. We use moisture-controlled compaction in 8-inch layers to ensure 95% Proctor density, regardless of what was excavated."
      }
    },
    {
      "@type": "Question",
      "name": "How do I know if my Mesa property has caliche?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The fastest indicator is your neighborhood. If you are in Las Sendas, Red Mountain Ranch, or any property abutting the Usery or Superstition mountain ranges, assume grade-2 to grade-3 caliche. For central and west Mesa, a site assessment with a hand probe will confirm caliche depth and grade before we finalize your quote."
      }
    }
  ]
};

export default function CalichePage() {
  return (
    <>
      <Script
        id="caliche-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <CalicheClient />
    </>
  );
}
