import { Metadata } from 'next';
import LasSendasClient from './LasSendasClient';

export const metadata: Metadata = {
  title: "Las Sendas Pool Removal Mesa AZ | HOA-Approved & Mountain Terrain Specialists",
  description: "Removing a pool in Las Sendas? We handle mountain-side excavation, hard-rock breaking, and Las Sendas Community Association HOA compliance. Get a quote.",
};

export default function LasSendasPage() {
  return <LasSendasClient />;
}
