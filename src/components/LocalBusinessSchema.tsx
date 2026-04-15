import Script from 'next/script';

export default function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "name": "Mesa Pool Removal Specialists",
    "image": "https://images.unsplash.com/photo-1541888062831-29177a644265?auto=format&fit=crop&q=80&w=2000",
    "@id": "https://mesapoolremoval.com/#business",
    "url": "https://mesapoolremoval.com",

    "priceRange": "$$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Serving Mesa Subdivisions",
      "addressLocality": "Mesa",
      "addressRegion": "AZ",
      "postalCode": "85201",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 33.4151,
      "longitude": -111.8315
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "07:00",
      "closes": "18:00"
    },
    "areaServed": [
      {
        "@type": "City",
        "name": "Mesa",
        "sameAs": "https://www.wikidata.org/wiki/Q156743"
      },
      {
        "@type": "City",
        "name": "Gilbert",
        "sameAs": "https://www.wikidata.org/wiki/Q927361"
      },
      {
        "@type": "City",
        "name": "Chandler",
        "sameAs": "https://www.wikidata.org/wiki/Q492577"
      },
      {
        "@type": "Place",
        "name": "San Tan Valley",
        "sameAs": "https://www.wikidata.org/wiki/Q2571216"
      },
      {
        "@type": "City",
        "name": "Queen Creek",
        "sameAs": "https://www.wikidata.org/wiki/Q38644"
      }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Pool Removal Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Full Pool Removal",
            "description": "Complete removal of pool shell, debris haul-off, and engineered compaction backfill.",
            "sameAs": "https://www.wikidata.org/wiki/Q1151322"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Caliche Soil Excavation",
            "description": "Specialized heavy equipment excavation through Arizona caliche layers.",
            "sameAs": "https://www.wikidata.org/wiki/Q1026666"
          }
        }
      ]
    },
    "description": "Professional pool demolition, caliche excavation, and engineered backfilling in Mesa, Arizona."
  };

  return (
    <Script
      id="local-business-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
