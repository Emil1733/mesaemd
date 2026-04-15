import { Metadata } from 'next';
import ServiceAreaClient from './ServiceAreaClient';

export const metadata: Metadata = {
  title: "Service Areas | Mesa, San Tan Valley & East Valley Pool Removal",
  description: "Professional pool removal services across the East Valley. Specialized demolition and caliche excavation in Mesa, Gilbert, Chandler, San Tan Valley, and Queen Creek.",
};

export default function ServiceAreaPage() {
  return <ServiceAreaClient />;
}
