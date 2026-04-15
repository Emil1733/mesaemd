import { Metadata } from 'next';
import EastmarkClient from './EastmarkClient';

export const metadata: Metadata = {
  title: "Eastmark Pool Removal Mesa AZ | Remove Builder Pool for Custom Backyard",
  description: "Removing a builder-grade pool in Eastmark to reclaim your yard? We handle Eastmark HOA compliance, clay soil backfill, and complete compaction for future builds.",
};

export default function EastmarkPage() {
  return <EastmarkClient />;
}
