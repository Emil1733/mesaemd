import { Metadata } from 'next';
import TempeClient from './TempeClient';
import Script from 'next/script';

export const metadata: Metadata = {
  title: "Tempe Pool Removal & Demolition | Free Estimates 2026",
  description: "Comprehensive guide to pool removal in Tempe, AZ. We handle permits, mostly flat clay and loam excavation, and 95% engineered compaction. Get a free quote today.",
  alternates: {
    canonical: '/service-areas/tempe-pool-removal',
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Do I need a permit to remove a pool in Tempe?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, Tempe requires a demolition permit for pool removal to ensure proper backfill and safety. We handle the entire permitting process for you, from application to final city inspection."
      }
    },
    {
      "@type": "Question",
      "name": "How much does pool removal cost in Tempe, AZ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The average cost for pool removal in Tempe ranges from $4,000 to $11,000. This depends on the size of the pool, access to the yard, and whether you choose a partial fill-in or a full structural demolition."
      }
    },
    {
      "@type": "Question",
      "name": "Does the mostly flat clay and loam in Tempe affect the demolition process?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, Tempe is known for its mostly flat clay and loam. This requires heavy-duty excavation equipment to break through hardpan layers and ensure the imported fill dirt is compacted correctly to prevent future sinking."
      }
    },
    {
      "@type": "Question",
      "name": "How long does the pool removal process take?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Most pool removals in Tempe take between 3 to 5 days of physical labor, depending on access and pool type. The permitting process can add 1-2 weeks before we break ground."
      }
    },
    {
      "@type": "Question",
      "name": "Will removing my pool lower my property value in Tempe?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "In many cases, removing an old, deteriorating pool increases the usable square footage of your yard and makes the home more attractive to families who do not want the liability or maintenance costs of an aging pool."
      }
    }
  ]
};

export default function TempeClientPage() {
  return (
    <>
      <Script
        id="tempe-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <TempeClient />
    </>
  );
}
