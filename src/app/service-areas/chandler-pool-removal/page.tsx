import { Metadata } from 'next';
import ChandlerClient from './ChandlerClient';
import Script from 'next/script';

export const metadata: Metadata = {
  title: "Chandler Pool Removal & Demolition | Free Estimates 2026",
  description: "Comprehensive guide to pool removal in Chandler, AZ. We handle permits, flat clay with occasional caliche excavation, and 95% engineered compaction. Get a free quote today.",
  alternates: {
    canonical: '/service-areas/chandler-pool-removal',
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Do I need a permit to remove a pool in Chandler?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, Chandler requires a demolition permit for pool removal to ensure proper backfill and safety. We handle the entire permitting process for you, from application to final city inspection."
      }
    },
    {
      "@type": "Question",
      "name": "How much does pool removal cost in Chandler, AZ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The average cost for pool removal in Chandler ranges from $4,500 to $11,500. This depends on the size of the pool, access to the yard, and whether you choose a partial fill-in or a full structural demolition."
      }
    },
    {
      "@type": "Question",
      "name": "Does the flat clay with occasional caliche in Chandler affect the demolition process?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, Chandler is known for its flat clay with occasional caliche. This requires heavy-duty excavation equipment to break through hardpan layers and ensure the imported fill dirt is compacted correctly to prevent future sinking."
      }
    },
    {
      "@type": "Question",
      "name": "How long does the pool removal process take?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Most pool removals in Chandler take between 3 to 5 days of physical labor, depending on access and pool type. The permitting process can add 1-2 weeks before we break ground."
      }
    },
    {
      "@type": "Question",
      "name": "Will removing my pool lower my property value in Chandler?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "In many cases, removing an old, deteriorating pool increases the usable square footage of your yard and makes the home more attractive to families who do not want the liability or maintenance costs of an aging pool."
      }
    }
  ]
};

export default function ChandlerClientPage() {
  return (
    <>
      <Script
        id="chandler-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <ChandlerClient />
    </>
  );
}
