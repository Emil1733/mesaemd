import Script from 'next/script';

export default function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "name": "Mesa Pool Removal Specialists",
    "image": "https://images.unsplash.com/photo-1541888062831-29177a644265?auto=format&fit=crop&q=80&w=2000",
    "@id": "https://mesapoolremoval.com",
    "url": "https://mesapoolremoval.com",
    "telephone": "(480) 555-XXXX",
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
        "name": "Mesa"
      },
      {
        "@type": "City",
        "name": "Gilbert"
      },
      {
        "@type": "City",
        "name": "Chandler"
      }
    ],
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
