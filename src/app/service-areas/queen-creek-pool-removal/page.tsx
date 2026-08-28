import { Metadata } from 'next';
import QueenCreekClient from './QueenCreekClient';
import Script from 'next/script';

export const metadata: Metadata = {
  title: "Queen Creek Pool Removal & Demolition | Free Estimates 2026",
  description: "Comprehensive guide to pool removal in Queen Creek, AZ. We handle permits, expansive clay and caliche excavation, and 95% engineered compaction. Get a free quote today.",
  alternates: {
    canonical: '/service-areas/queen-creek-pool-removal',
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Do I need a permit to remove a pool in Queen Creek?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, Queen Creek requires a demolition permit for pool removal to ensure proper backfill and safety. We handle the entire permitting process for you, from application to final city inspection."
      }
    },
    {
      "@type": "Question",
      "name": "How much does pool removal cost in Queen Creek, AZ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The average cost for pool removal in Queen Creek ranges from $4,500 to $11,500. This depends on the size of the pool, access to the yard, and whether you choose a partial fill-in or a full structural demolition."
      }
    },
    {
      "@type": "Question",
      "name": "Does the expansive clay and caliche in Queen Creek affect the demolition process?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, Queen Creek is known for its expansive clay and caliche. This requires heavy-duty excavation equipment to break through hardpan layers and ensure the imported fill dirt is compacted correctly to prevent future sinking."
      }
    },
    {
      "@type": "Question",
      "name": "How long does the pool removal process take?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Most pool removals in Queen Creek take between 3 to 5 days of physical labor, depending on access and pool type. The permitting process can add 1-2 weeks before we break ground."
      }
    },
    {
      "@type": "Question",
      "name": "Will removing my pool lower my property value in Queen Creek?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "In many cases, removing an old, deteriorating pool increases the usable square footage of your yard and makes the home more attractive to families who do not want the liability or maintenance costs of an aging pool."
      }
    }
  ]
};

export default function QueenCreekClientPage() {
  return (
    <>
      <Script
        id="queen-creek-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <QueenCreekClient />
    </>
  );
}
