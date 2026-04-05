import { Metadata } from 'next';
import PoolRemovalClient from './PoolRemovalClient';

export const metadata: Metadata = {
  title: "Professional Pool Removal in Mesa | Full & Partial Demolition",
  description: "Specialized pool demolition in Mesa, AZ. We handle technical caliche soil excavation, compaction-ready backfill, and Maricopa County permits.",
};

export default function PoolRemovalService() {
  return <PoolRemovalClient />;
}
