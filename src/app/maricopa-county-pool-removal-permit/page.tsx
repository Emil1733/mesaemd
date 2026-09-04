import { Metadata } from 'next';
import PermitClient from './PermitClient';

export const metadata: Metadata = {
  title: "Pool Removal Permit Guide | Maricopa County, AZ 2026",
  description: "Maricopa County pool removal permit guide covering applications, inspections, utility disconnects, fees, and requirements for Mesa and the East Valley.",
  alternates: {
    canonical: "https://mesapoolremoval.com/maricopa-county-pool-removal-permit",
  },
  openGraph: {
    title: "Pool Removal Permit Guide | Maricopa County, Arizona",
    description: "A practical guide to pool removal permits, inspections, utility disconnects, and filing requirements in Maricopa County.",
    url: "https://mesapoolremoval.com/maricopa-county-pool-removal-permit",
    type: "article",
  },
};

export default function PermitPage() {
  return <PermitClient />;
}
