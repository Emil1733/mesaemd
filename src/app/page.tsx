import { Metadata } from 'next';
import HomeClient from './HomeClient';

export const metadata: Metadata = {
  title: "Pool Removal Mesa AZ | Pool Demolition & Fill-In",
  description: "Pool removal and pool demolition in Mesa, AZ for concrete, fiberglass, and vinyl pools. Get a fast estimate for full removal or partial pool fill-in.",
  alternates: {
    canonical: 'https://mesapoolremoval.com/',
  },
  openGraph: {
    title: "Pool Removal Mesa AZ | Pool Demolition & Fill-In",
    description: "Mesa pool removal and demolition for concrete, fiberglass, and vinyl pools. Get a fast estimate for full removal or partial fill-in.",
    url: 'https://mesapoolremoval.com/',
    type: 'website',
  },
};

export default function Home() {
  return <HomeClient />;
}
