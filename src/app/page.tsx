import { Metadata } from 'next';
import HomeClient from './HomeClient';

export const metadata: Metadata = {
  title: "Mesa Pool Removal & Demolition | Fast Estimates & Permits",
  description: "Licensed & insured pool removal in Mesa, AZ. Specialized caliche excavation, engineered backfill, and 95% compaction. Most projects completed in 3–5 days.",
};

export default function Home() {
  return <HomeClient />;
}
