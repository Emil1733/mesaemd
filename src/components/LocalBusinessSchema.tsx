export default function LocalBusinessSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://mesapoolremoval.com/#website',
    name: 'Mesa Pool Removal',
    url: 'https://mesapoolremoval.com/',
    description: 'Pool removal information and estimate requests for Mesa, Arizona.',
  };

  return (
    <script
      id="site-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }}
    />
  );
}
