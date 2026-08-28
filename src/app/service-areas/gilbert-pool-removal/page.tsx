import { Metadata } from 'next';
import GilbertClient from './GilbertClient';
import Script from 'next/script';

export const metadata: Metadata = {
  title: "Gilbert Pool Removal & Demolition | Free Estimates 2026",
  description: "Comprehensive guide to pool removal in Gilbert, AZ. We handle permits, caliche layers and clay excavation, and 95% engineered compaction. Get a free quote today.",
  alternates: {
    canonical: '/service-areas/gilbert-pool-removal',
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Do I need a permit to remove a pool in Gilbert?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, Gilbert requires a demolition permit for pool removal to ensure proper backfill and safety. We handle the entire permitting process for you, from application to final city inspection."
      }
    },
    {
      "@type": "Question",
      "name": "How much does pool removal cost in Gilbert, AZ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The average cost for pool removal in Gilbert ranges from $4,200 to $11,000. This depends on the size of the pool, access to the yard, and whether you choose a partial fill-in or a full structural demolition."
      }
    },
    {
      "@type": "Question",
      "name": "Does the caliche layers and clay in Gilbert affect the demolition process?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, Gilbert is known for its caliche layers and clay. This requires heavy-duty excavation equipment to break through hardpan layers and ensure the imported fill dirt is compacted correctly to prevent future sinking."
      }
    },
    {
      "@type": "Question",
      "name": "How long does the pool removal process take?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Most pool removals in Gilbert take between 3 to 5 days of physical labor, depending on access and pool type. The permitting process can add 1-2 weeks before we break ground."
      }
    },
    {
      "@type": "Question",
      "name": "Will removing my pool lower my property value in Gilbert?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "In many cases, removing an old, deteriorating pool increases the usable square footage of your yard and makes the home more attractive to families who do not want the liability or maintenance costs of an aging pool."
      }
    }
  ]
};

export default function GilbertClientPage() {
  return (
    <>
      <Script
        id="gilbert-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <GilbertClient />
    </>
  );
}
