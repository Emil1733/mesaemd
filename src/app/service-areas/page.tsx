import { Metadata } from 'next';
import ServiceAreaClient from './ServiceAreaClient';

export const metadata: Metadata = {
  title: "Service Areas | Mesa, San Tan Valley & East Valley Pool Removal",
  description: "Pool removal service area information for Mesa, Gilbert, Chandler, San Tan Valley, Queen Creek, Phoenix, Scottsdale, and Tempe.",
  alternates: {
    canonical: '/service-areas',
  },
};

export default function ServiceAreaPage() {
  return <ServiceAreaClient />;
}
