import { Metadata } from 'next';
import CostClient from './CostClient';

export const metadata: Metadata = {
  title: "Pool Removal Cost Mesa | 2026 Pricing Guide",
  description: "How much does it cost to remove a pool in Mesa, AZ? View real pricing for concrete, fiberglass, and vinyl demolition including caliche excavation fees.",
};

export default function CostPage() {
  return <CostClient />;
}
