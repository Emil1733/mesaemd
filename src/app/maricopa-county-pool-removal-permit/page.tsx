import { Metadata } from 'next';
import PermitClient from './PermitClient';

export const metadata: Metadata = {
  title: "Maricopa County Pool Removal Permits | Rules, Laws & Costs 2026",
  description: "Navigating pool removal permits in Maricopa County, Mesa, and the East Valley. Learn the mandatory inspection steps, utility severance laws, and filing fees.",
  openGraph: {
    title: "Mesa & Maricopa County Pool Removal Permit Guide",
    description: "Don't get fined. Everything you need to know about permitting your swimming pool demolition in Arizona.",
    url: "https://mesapoolremoval.com/maricopa-county-pool-removal-permit",
    type: "article",
  },
};

export default function PermitPage() {
  return <PermitClient />;
}
